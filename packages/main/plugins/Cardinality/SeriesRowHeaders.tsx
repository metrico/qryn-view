import React from "react";
import { cx } from "@emotion/css";
import { SeriesRowStyle } from "./SeriesRowStyles";

export type SeriesRowHeadersProps = {
    theme: any;
    name: string;
    headerName: string;
    handleSort: (e: any) => void;
};
// This component is used to display the headers in the cardinality rows
const SeriesRowHeaders: React.FC<SeriesRowHeadersProps> = ({
    theme,
    name,
    headerName,
    handleSort,
}) => {
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
            {headerName !== "labelValueCountByLabelName" && (
                <div className="cell-header cell">Share in Total</div>
            )}

            <div className="cell-header cell start">Quota</div>

            <div
                className="cell-header cell end"
                style={{ textAlign: "right" }}
            >
                Drop
            </div>
        </div>
    );
};

export default SeriesRowHeaders;
