/**
 * Cardinality totals
 * A view for the delete actions on the cardinality main view
 */
import { useCallback, useEffect, useState } from "react";
import { totalsMock } from "../api/mock";
import { cx } from "@emotion/css";
import { PROCESS_HEADERS } from "./consts";
import { TotalRowStyle } from "./style";
import useTheme from "@ui/theme/useTheme";
import { TotalsRow } from "./TotalsRow";
import { getMaintenance, useMaintenance } from "./useMaintenance";
import "./array_helper.mjs";

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
            const numberCols = [
                "series_created",
                "series_dropped",
                "to_sec",
                "from_sec",
                "created_sec",
            ];

            const columnName = column.split(" ").join("_").toLocaleLowerCase();

            setTotals(() => {
                let items = [...Maintainance];

                if (numberCols.includes(columnName)) {
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
                Fingerprints in Maintainance mode
            </div>

            <div className="table">
                <div className="table-header">
                    {PROCESS_HEADERS?.map((header) => (
                        <div
                            key={header}
                            onClick={() => sortByProperty(header)}
                            className="cell"
                        >
                            {header}
                        </div>
                    ))}
                </div>

                <div className="table-body">
                    {totals?.length ? (
                        totals?.map((total, key) => (
                            <TotalsRow
                                key={key}
                                isLoading={isLoading}
                                headers={PROCESS_HEADERS}
                                total={total}
                            />
                        ))
                    ) : (
                        <> no totals </>
                    )}
                </div>
            </div>
            <TotalsPagination
                page={page}
                totalPages={Maintainance.length / rowsPerPage}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    );
}

export const TotalsPagination = ({
    page,
    totalPages,
    setPage,
    rowsPerPage,
    setRowsPerPage,
}) => {
    return (
        <div className="table-footer">
            <button onClick={() => setPage(() => 0)}>First</button>
            <button onClick={() => setPage(() => Math.max(0, page - 1))}>
                Prev
            </button>
            <button
                onClick={() =>
                    setPage(() => Math.min(totalPages - 1, page + 1))
                }
            >
                Next
            </button>
            <button onClick={() => setPage(totalPages - 1)}>Last</button>

            <p>
                Page {page + 1} of {totalPages}
            </p>
        </div>
    );
};
