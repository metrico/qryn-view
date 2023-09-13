import { cx, css } from "@emotion/css";
import { useCardinalityRequest } from "./api/CardinalityRequest";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { Button } from "@ui/views/DataSources/ui";
import CardinalityDialog from "./CardinalityDialog";
export type SeriesRowProps = {
    name: string;
    diff: number;
    value: number;
    share: number;
    theme: any;
    source: any;
    onFilter: (e: any, val: any) => void;
};

export const SeriesRowStyle = (theme: any) => css`
    display: table-row;
    // width:100%;
    align-items: center;
    padding: 12px 8px;

    border-bottom: 1px solid ${theme.neutral};

    .cell {
        display: table-cell;
        padding: 12px 0px;
        width: auto;
        border-bottom: 1px solid ${theme.neutral};
    }
    .cell-name {
        width: 60%;
        cursor: pointer;
        transition: 0.25s all;
        &:hover {
            background: ${theme.neutral};
            .c-name {
                color: ${theme.primaryLight};
            }
        }
    }
    .cell-header {
        font-size: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 12px;
        &.center {
            text-align: center;
        }
    }
    .interactive {
        transition: 0.25s all;
        &:hover {
            background: ${theme.neutral};
            cursor: pointer;
        }
    }

    .c-name {
        font-size: 12px;
        color: ${theme.primaryLight};

        cursor: pointer;
        margin: 0px 12px;
    }
    .c-value {
        color: ${theme.contrast};
        font-size: 14px;
        margin: 0px 12px;

        width: auto;
    }
    .c-share-cont {
        //  grid-gap: 8px;
        align-items: center;
        display: flex;
        gap: 1px;
        //    grid-template-columns: minmax(50px, 1fr) 70px;
        justify-content: flex-start;
    }
    .c-share {
        display: flex;
        font-size: 12px;
        font-family: monospace;
        margin: 0px 12px;

        // flex:1;
    }
    .c-progress {
        grid-gap: 8px;
        align-items: center;
        display: grid;
        grid-template-columns: 1fr auto;
        justify-content: center;
    }
    progress {
        background: ${theme.deep};
        border-radius: 3px;

        height: 12px;
        border: 1px solid ${theme.accentNeutral};
        display: flex;
        flex: 1;
    }
    progress::-webkit-progress-bar {
        background-color: ${theme.deep};
        border-radius: 3px;
    }
    progress::-webkit-progress-value {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
    progress::-moz-progress-bar {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
`;

export const SeriesRow = ({
    name,
    value,
    diff,
    share,
    theme,
    onFilter,
    source,
}: SeriesRowProps) => {
    const { handleDelete } = useCardinalityRequest();
    return (
        <div className={cx(SeriesRowStyle(theme))}>
            <div
                className="cell cell-name"
                onClick={(e) => onFilter(e, { name, value, source })}
            >
                <div className="c-name">{name}</div>
            </div>
            <div className=" cell">
                <div className="c-value">
                    <span>{value}</span>

                    <span
                        className="c-diff"
                        title={`diff from previous day: ${diff}`}
                        style={{
                            fontSize: "10px",
                            padding: "5px",
                            paddingBottom:"8px",
                            color: diff > 0 ? theme.accent : theme.primary,
                        }}
                    >
                        {diff === 0 ? "" : diff > 0 ? "↑" : "↓"}
                        {diff === 0 ? "" : diff}{" "}
                    </span>
                </div>
            </div>
            <div className="cell">
                <div className="c-share-cont">
                    <div className="c-progress">
                        <progress value={share} max={100} />
                        <span className="c-share">{share.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
            <div className="cell">
                <CardinalityDialog
                    clearFingerPrints={(query) => handleDelete(query)}
                    label={name}
                    value={value}
                    source={source}
                />
            </div>
        </div>
    );
};

export const SeriesRowHeaders = ({ theme, name, handleSort }) => {
    return (
        <div className={cx(SeriesRowStyle(theme))}>
            <div
                onClick={() => handleSort("name")}
                className="cell-header interactive cell"
            >
                {name}
            </div>
            <div
                onClick={() => handleSort("value")}
                className="cell-header interactive cell"
            >
                Number of Series
            </div>
            <div className="cell-header cell">Share in Total</div>
            <div className="cell-header cell center">Delete</div>
        </div>
    );
};
