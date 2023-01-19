import { useMemo } from "react";
import Table from "../../../../../qryn-ui/Table/Table";
import { TableStyles } from "./styles";
export const VectorTable = (props: any) => {
    const {
        data: { columnsData, dataRows },
        actualQuery,
        height,
        size,
        width,
    } = props;

    const cols = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => dataRows, [dataRows]);
    return (
        <TableStyles>
            {columnsData && dataRows && (
                <Table 
                    actQuery={actualQuery}
                    columns={cols}
                    width={width}
                    data={data}
                    height={height}
                    size={size}
                />
            )}
        </TableStyles>
    );
};
