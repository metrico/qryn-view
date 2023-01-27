import { cx, css } from "@emotion/css";
/// add select in here
import CloseIcon from "@mui/icons-material/Close";
import { useCallback,useState } from "react";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import { OperationSelectorFromType } from "./OperationSelector";
export const OperationContainerStyles =(theme:any) => css`
    display: flex;
    flex-direction: column;
    .operation-header {
        background:${theme.viewBg};
        color: ${theme.textColor};
        padding: 0px 8px;
        border-bottom: 1px solid ${theme.buttonBorder};
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:28px;
        span {
          //  font-weight: bold;
          font-size:12px;
        }
        .operation-tools {
            display: none;
            align-items: center;
        }
        &:hover .operation-tools {
            display: flex;
        }
    }
    .operation-body {
        padding: 8px;
    }
`;

type Props = {
    id: number;
    header: any;
    body: any;
    removeItem: any;
    index:number;
    opType:string;
};

export default function OperationContainer(props: Props) {
    const { id, opType, header, body, removeItem, index } = props;
    console.log(opType)
    // add selector with name
    // add close button
    const theme = useTheme()

    const [opHeader, setOpHeader] = useState(header)

    const onOpChange = useCallback((e:any, header:string)=>{
        setOpHeader(header)
    },[opHeader])

    return (
        <div className={cx(OperationContainerStyles(theme))}>
            <div className="operation-header">
                <span>{opHeader}</span>
                <div className="operation-tools">
                    <OperationSelectorFromType  opType={opType} onOperationSelect={onOpChange} />
                    <CloseIcon
                        style={{
                            margin:'0px',
                            padding:'0px',
                            height: "12px",
                            width: "12px",
                            cursor: "pointer",
                        }}
                        onClick={(e) => removeItem(index)}
                    />
                </div>
            </div>
            <div className="operation-body">{body}</div>
        </div>
    );
}

// this should have
// -- a header
// a body
