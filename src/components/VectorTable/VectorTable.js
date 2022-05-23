import { useMemo, memo } from "react";

import { prepareCols, prepareVectorRows, setColumnsData } from "./helpers";
import { TableStyles } from "./styles";
import { Table } from "./Table";

export const VectorTable = memo((props) => {
    const colsData = useMemo(() => prepareCols(props.data), [props.data]);

    const columnsData = useMemo(() => setColumnsData(colsData), [colsData]);

    const dataRows = useMemo(() => prepareVectorRows(props.data), [props.data]);

    return (
        <TableStyles>
            <Table columns={columnsData} data={dataRows} />
        </TableStyles>
    );
});
