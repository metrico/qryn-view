import { cx } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState, useEffect } from "react";
import useTheme from "@ui/theme/useTheme"
import { opTypeSwitch } from "./Components/renderers";
import { OperationSelectorFromType } from "./OperationSelector";
import { CloseIconStyle, OperationContainerStyles } from "./OperationStyles";
import { OperationContainerProps } from "./types";

export default function OperationContainer(props: OperationContainerProps) {
    const { id, opType, header, removeItem, index, setOperations } = props;

    const theme = useTheme();

    const [opHeader, setOpHeader] = useState(header);
    useEffect(() => {
        setOpHeader(header);
    }, [header, setOpHeader]);
    const onOpChange = useCallback(
        (e: any, header: string) => {
            setOpHeader(header);
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m) => {
                    if (m.id === id) {
                        m = {
                            ...m,
                            header,
                            name: header.toLowerCase().split(" ").join("_"),
                        };
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [opHeader]
    );

    const typeFormat = (str: string) =>
        str?.toLowerCase()?.split(" ")?.join("_") || "";
    if (header && typeof header === "string") {
        return (
            <div className={cx(OperationContainerStyles(theme))}>
                <div className="operation-header">
                    <span>{opHeader}</span>
                    <div className="operation-tools">
                        <OperationSelectorFromType
                            opType={opType}
                            onOperationSelect={onOpChange}
                        />
                        <CloseIcon
                            className={cx(CloseIconStyle)}
                            onClick={(e) => removeItem(index)}
                        />
                    </div>
                </div>
                <div className="operation-body">
                    {opTypeSwitch(typeFormat(opType), typeFormat(header), {
                        ...props,
                    })}
                </div>
            </div>
        );
    }
    return null;
}
