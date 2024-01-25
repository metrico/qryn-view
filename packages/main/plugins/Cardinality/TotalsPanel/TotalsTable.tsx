import { TotalsRow } from "./TotalsRow";
import TotalsPagination from "./Pagination";

type totalHeader = {
    value: string;
    text: string;
};

type TotalsTableProps = {
    headers: totalHeader[];
    sortByProperty: any;
    isLoading: boolean;
    totals: any;
    page: number;
    setPage: any;
    rowsPerPage: number;
    setRowsPerPage: any;
    Maintainance: any;
};

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
}: TotalsTableProps) => {
    return (
        <>
            <div className="table">
                <div className="table-header">
                    {headers?.map((header) => (
                        <div
                            key={header.value}
                            onClick={() => sortByProperty(header.value)}
                            className="cell"
                        >
                            {header.text}
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
