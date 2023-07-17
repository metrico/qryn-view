import { cx, css } from "@emotion/css";
import React from "react";
import { Plugin } from "../types";
import { nanoid } from "nanoid";

export const TotalSeriesStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.shadow};
    border-radius: 3px;
    margin: 0px 4px;
    padding: 4px 6px;
    .title {
        color: ${theme.contrast};
        font-size: 10px;
        margin-bottom: 1px;
    }
    .total-num {
        color: ${theme.primary};
        font-size: 16px;
        letter-spacing: 1px;
        font-weight:bold;
        //background: ${theme.alphaNeutral};
        padding:3px 0px;
    }
`;

type TotalsProps = {
    theme: any;
    value: number | string; // total | percent
    text: "total" | "percent";
};
const TOTALS_VALUES = {
    total: { text: "Total Series", value: (val: string | number) => val },
    percent: {
        text: "Percentage from total",
        value: (val: string | number) => `${String(val)}%`,
    },
};
export const Totals: React.FC<TotalsProps> = ({ theme, value, text }) => {
    
    return (
        <div className={cx(TotalSeriesStyles(theme))}>
            <div className="title">{TOTALS_VALUES[text]["text"]}</div>
            <div className="total-num">
                {TOTALS_VALUES[text]["value"](value)}
            </div>
        </div>
    );
};


export const TotalSeriesPlugin: Plugin = {
    name: "Total Series",
    section: "Query Options",
    id: nanoid(),
    Component: Totals,
    description: "Total series summary",
    active: false,
    roles: ["admin", "superAdmin"],
};
