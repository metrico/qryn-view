import { cx, css } from "@emotion/css";
import React from "react";
import { Plugin } from "../types";
import { nanoid } from "nanoid";

type TotalsProps = {
    theme: any;
    value: number | string;
    trend?: "up" | "down" | "none";
    text: "total" | "percent" | "previous" | "diff";
    type?: "amount" | "prev" | "diff";
};

export const TotalSeriesStyles = (
    theme: any,
    type: TotalsProps["type"],
    trend: TotalsProps["trend"]
) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.shadow};
    border-radius: 3px;
    margin: 0px 4px;
    padding: 4px 6px;
    .title {
        color: theme.contrast;

        font-size: 10px;
        margin-bottom: 1px;
    }
    .total-num {
        color: ${(() => ({
            prev: theme.contrast,
            amount: theme.primary,
            diff: theme.contrast,
        }))()[type]};
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: bold;
        //background: ${theme.alphaNeutral};
        padding: 3px 0px;
        :before {
            content: ${(() =>
                type === "diff" && {
                    up: "'↑'",
                    down: "'↓'",
                    none: "",
                })()[trend]};
            font-size: 14px;
            position: relative;
            font-weight: bold;
            color: ${(() =>
                type === "diff" && {
                    up: theme.accent,
                    down: theme.primary,
                    none: theme.primary,
                })()[trend]};
            top: -3px;
            margin-left: 3px;
        }
    }
`;

const TOTALS_VALUES = {
    total: { text: "Total Series", value: (val: string | number) => val },
    percent: {
        text: "Percentage from total",
        value: (val: string | number) => `${String(val)}%`,
    },
    previous: {
        text: "Previous total",
        value: (val: string | number) => val,
    },
    diff: {
        text: "Diff from previous",
        value: (val: string | number | null) => `${val ?? ""  }`,
    },
};
export const Totals: React.FC<TotalsProps> = ({
    theme,
    value,
    text,
    type = "amount",
    trend = "none",
}) => {
    return (
        <div className={cx(TotalSeriesStyles(theme, type, trend))}>
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
