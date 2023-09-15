import { cx } from "@emotion/css";
import { useCardinalityRequest } from "./api/CardinalityRequest";
import { SeriesRowStyle } from "./SeriesRowStyles";
import CardinalityDialog from "./CardinalityDialog";
import { DiffNumber } from "./DiffNumber";
import ShareCell from "./ShareCell";
import React from "react";

export type SeriesRowProps = {
    name: string;
    diff: number;
    value: number;
    hasShare: boolean;
    share: number;
    theme: any;
    valuePrev?: number;
    source: any;
    onFilter: (e: any, val: any) => void;
};

// this component is used to display a row in the cardinality table

const SeriesRow: React.FC<SeriesRowProps> = ({
    name,
    value,
    diff,
    hasShare,
    share,
    theme,
    onFilter,
    source,
}) => {
    
    const { handleDelete, isLoading } = useCardinalityRequest();
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
                <CardinalityDialog
                    clearFingerPrints={(query) => handleDelete(query, value)}
                    isLoading={isLoading}
                    label={name}
                    value={value}
                    source={source}
                />
            </div>
        </div>
    );
};

export default SeriesRow;
