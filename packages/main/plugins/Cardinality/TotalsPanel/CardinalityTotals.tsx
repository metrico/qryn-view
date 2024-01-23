/**
 * Cardinality totals
 * A view for the delete actions on the cardinality main view
 */
import { useCallback, useEffect, useState } from "react";
import { totalsMock } from "../api/mock";
import { cx } from "@emotion/css";
import { PROCESS_HEADERS, NUMBER_COLS } from "./consts";
import { TotalRowStyle } from "./style";
import useTheme from "@ui/theme/useTheme";
import { getMaintenance, useMaintenance } from "./useMaintenance";
import "./array_helper.mjs";
import TotalsTable from "./TotalsTable";
export default function CardinalityTotals({ isLoading }) {
    const Maintainance = useMaintenance();

    const theme = useTheme();
    const [totals, setTotals] = useState(Maintainance ?? totalsMock);
    const [sort, setSort] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    function paginateTotals(data) {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return data.slice(startIndex, endIndex);
    }

    useEffect(() => {
        getMaintenance()
            .then((res) => res.json())
            .then((data) => {
                setTotals(paginateTotals(data));
            });
    }, []);

    useEffect(() => {
        setTotals(paginateTotals(Maintainance));
    }, [page]);

    const sortByProperty = useCallback(
        (column: string) => {
            const columnName = column.split(" ").join("_").toLocaleLowerCase();

            setTotals(() => {
                let items = [...Maintainance];

                if (NUMBER_COLS.includes(columnName)) {
                    items.sortColByNumber(columnName, sort);
                    return paginateTotals(items);
                }

                items.sortColByString(columnName, sort);
                return paginateTotals(items);
            });

            setSort((prev) => (prev === "asc" ? "desc" : "asc"));
        },
        [totals]
    );

    return (
        <div className={cx(TotalRowStyle(theme))}>
            <div className="total-rows-header">
                {totals?.length > 0
                    ? "Fingerprints in Maintainance mode"
                    : "No Fingerprints in Maintainance mode"}
            </div>

            {totals?.length > 0 && (
                <TotalsTable
                    headers={PROCESS_HEADERS}
                    sortByProperty={sortByProperty}
                    isLoading={isLoading}
                    totals={totals}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    Maintainance={Maintainance}
                />
            )}
        </div>
    );
}
