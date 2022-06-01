import { useMemo, memo } from "react";

import { TableStyles } from "./styles";
import { Table } from "./Table";

export const VectorTable = memo(({ data: { columnsData, dataRows } }) => {
    const cols = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => dataRows, [dataRows]);
    return (
        <TableStyles>
            {columnsData && dataRows && <Table columns={cols} data={data} />}
        </TableStyles>
    );
});
