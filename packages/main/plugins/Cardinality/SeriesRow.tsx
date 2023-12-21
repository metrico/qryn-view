import { cx, css } from "@emotion/css";
import { useCardinalityRequest } from "./api/CardinalityRequest";
import { SeriesRowStyle } from "./SeriesRowStyles";
import CardinalityDialog from "./CardinalityDialog";
import { DiffNumber } from "./DiffNumber";
import ShareCell from "./ShareCell";
import React, { useMemo } from "react";
import useCardinalityStore from "./store/CardinalityStore";
import { calcQuotaOverCardinality, isQuotaWarning } from "./helpers";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

export type SeriesRowProps = {
    name: string;
    diff: number;
    value: number;
    hasShare: boolean;
    share: number;
    theme: any;
    valuePrev?: number;
    source: any;
    quota?: number;
    onFilter: (e: any, val: any) => void;
};

// this component is used to display a row in the cardinality table

export type QuotaCellProps = {
    quota: number;
    isQuotaWarning: boolean;
};

export const QuotaSquare = (isWarning: boolean) => css`
    display: flex;
    align-items: center;
    gap: 8px;

    //width:80px;
    .square {
        content: "";
        width: 0.75em;
        height: 0.75em;
        background: ${isWarning ? "orange" : "green"};
        border-radius: 2px;
        color: white;
    }
    .info-icon {
        font-size: 12px;
    }
    .quota-num {
        font-size: 12px;
    }
`;

export const QuotaCell = ({ quota, isQuotaWarning }: QuotaCellProps) => {
    return (
        <div className={cx(QuotaSquare(isQuotaWarning))}>
            <div className={"square"}></div>
            <div className={"info-icon"}>
                <Tooltip
                    title={`cardinality quota ${
                        isQuotaWarning ? "warning" : "(no warning)"
                    }`}
                >
                    <InfoIcon
                        fontSize={"inherit"}
                        style={{
                            cursor: "pointer",
                            opacity: `${isQuotaWarning ? 1 : 0.5}`,
                        }}
                    />
                </Tooltip>
            </div>
            <p className="quota-num">{quota}</p>
        </div>
    );
};

const SeriesRow: React.FC<SeriesRowProps> = ({
    name,
    value,
    diff,
    hasShare,
    share,
    theme,
    onFilter,
    source,
    quota,
}) => {
    const { handleDelete } = useCardinalityRequest();
    const { isLoading } = useCardinalityStore();

    const quotaWarning = useMemo(() => {
        const quotaOverCardinality = calcQuotaOverCardinality(value, quota);
        return isQuotaWarning(quotaOverCardinality);
    }, [quota]);

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
                    <DiffNumber theme={theme} diff={diff} />
                </div>
            </div>

            {hasShare && <ShareCell share={share} />}
            <div className="cell">
                <QuotaCell quota={quota} isQuotaWarning={quotaWarning} />
            </div>
            <div className="cell">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        marginRight: "20px",
                        flex: "1",
                        height: "100%",
                    }}
                >
                    <CardinalityDialog
                        clearFingerPrints={(query) =>
                            handleDelete(query, value)
                        }
                        isLoading={isLoading}
                        label={name}
                        value={value}
                        source={source}
                    />
                </div>
            </div>
        </div>
    );
};

export default SeriesRow;
