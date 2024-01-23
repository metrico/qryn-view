import { TotalsRow } from "./TotalsRow";
import TotalsPagination from "./Pagination";

const TotalsTable = ({
    headers,
    sortByProperty,
    isLoading,
    totals,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    Maintainance,
}) => {
    return (
        <>
            <div className="table">
                <div className="table-header">
                    {headers?.map((header) => (
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
                    {totals?.map((total, key) => (
                        <TotalsRow
                            key={key}
                            isLoading={isLoading}
                            headers={headers}
                            total={total}
                        />
                    ))}
                </div>
            </div>

            <TotalsPagination
                page={page}
                totalPages={Maintainance.length / rowsPerPage}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </>
    );
};

export default TotalsTable;
