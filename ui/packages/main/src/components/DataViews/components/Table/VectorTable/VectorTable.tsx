import { useEffect, useMemo, useState } from "react";
import Table from "@ui/qrynui/Table/Table";
import { TableStyles } from "./styles";
export const VectorTable = (props: any) => {
    const {
        data: { columnsData, dataRows },
        actualQuery,
        height,
        size,
        width,
    } = props;

    const [cols, setCols] =  useState(columnsData)
    const [data, setData] = useState(dataRows);

    useEffect(() => {
        setCols(columnsData);
    }, [columnsData]);

    useEffect(() => {
        setData(dataRows);
    }, [dataRows]);

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
