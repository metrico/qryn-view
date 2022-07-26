import { useMemo, memo } from "react";

import { TableStyles } from "./styles";
import { Table } from "./Table";

export const VectorTable = memo(({ data: { columnsData, dataRows },actualQuery }) => {
    const cols = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => dataRows, [dataRows]);


    return (
        <TableStyles>
            {columnsData && dataRows && <Table actQuery={actualQuery} columns={cols} data={data} />}
        </TableStyles>
    );
});
