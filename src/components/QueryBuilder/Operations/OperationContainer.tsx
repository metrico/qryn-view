import { cx, css } from "@emotion/css";
/// add select in here
import CloseIcon from "@mui/icons-material/Close";
export const OperationContainerStyles = css`
    display: flex;
    flex-direction: column;
    .operation-header {
        background: #eee;
        color: gray;
        padding: 8px;
        border-bottom: 1px solid gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-weight: bold;
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
    removeCard: any;
    index:number;
};

export default function OperationContainer(props: Props) {
    const { id, header, body, removeCard, index } = props;

    // add selector with name
    // add close button

    return (
        <div className={cx(OperationContainerStyles)}>
            <div className="operation-header">
                <span>{header}</span>
                <div className="operation-tools">
                    <CloseIcon
                        style={{
                            height: "13px",
                            width: "13px",
                            cursor: "pointer",
                        }}
                        onClick={(e) => removeCard(index)}
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
