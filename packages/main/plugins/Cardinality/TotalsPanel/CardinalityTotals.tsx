/**
 * Cardinality totals
 * A view for the delete actions on the cardinality main view
 */
import { useCallback, useEffect, useState } from "react";
import { totalsMock } from "../api/mock";
import { cx } from "@emotion/css";
import { headers, NUMBER_COLS } from "./consts";
import { TotalRowStyle } from "./style";
import useTheme from "@ui/theme/useTheme";
import { getMaintenance, useMaintenance } from "./useMaintenance";
import "./array_helper.mjs";
import TotalsTable from "./TotalsTable";

export default function CardinalityTotals({ isLoading }) {
    const { maintenance } = useMaintenance();

    const theme = useTheme();
    const [totals, setTotals] = useState(maintenance ?? totalsMock);
    const [sort, setSort] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    function paginateTotals(data: Array<any>) {
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
        setTotals(paginateTotals(maintenance));
    }, [page]);

    const searchHandler = useCallback(
        (text: string) => {
            setSearchValue(text);

            const filteredData = maintenance.filter((item) => {
                return item.query.toLowerCase().includes(text.toLowerCase());
            });

            if (filteredData?.length > 0) {
                setTotals(paginateTotals(filteredData));
            }

            if (text === "") {
                setTotals(paginateTotals(maintenance));
            }
        },
        [totals]
    );

    const sortByProperty = useCallback(
        (column: string) => {
            if (column !== "undo") {
                setTotals(() => {
                    let items = [...maintenance];

                    if (NUMBER_COLS.includes(column)) {
                        items.sortColByNumber(column, sort);
                        return paginateTotals(items);
                    }

                    items.sortColByString(column, sort);
                    return paginateTotals(items);
                });

                setSort((prev) => (prev === "asc" ? "desc" : "asc"));
            }
        },
        [totals]
    );

    return (
        <div className={cx(TotalRowStyle(theme))}>
            <TotalRowsHeader
                searchValue={searchValue}
                searchHandler={searchHandler}
                totalsLength={totals?.length ?? 0}
            />

            {totals?.length > 0 && (
                <TotalsTable
                    headers={headers}
                    sortByProperty={sortByProperty}
                    isLoading={isLoading}
                    totals={totals}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    Maintainance={maintenance}
                />
            )}
        </div>
    );
}

export const TotalRowsHeader = ({
    totalsLength,
    searchHandler,
    searchValue,
}) => {
    return (
        <div className="total-rows-header">
            <div className="search-container">
                <label>Search By Query</label>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => searchHandler(e.target.value)}
                    placeholder=""
                />
            </div>
            {totalsLength > 0
                ? "Fingerprints in Maintainance mode"
                : "No Fingerprints in Maintainance mode"}
        </div>
    );
};
