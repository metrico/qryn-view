import { format } from "date-fns";
import React from "react";
import { type Total } from "../api/types";
import { Tooltip } from "@mui/material";

type cellHeader = {
    value: string;
    text: string;
};

export const getCellData = (total: Total["total"], headers: cellHeader[]) => {
    const cell_names = headers
        ?.filter((h) => h.text !== "Undo")
        ?.map((header) => header.value);

    return cell_names?.map((key) => ({ [key]: total[key] }));
};

export function CellFormatter({ col }): React.ReactNode | string | number {
    const item = Object.keys(col)[0];

    const data = col[item];

    switch (item) {
        case "series_dropped":
        case "series_created":
            return data;
        case "created_sec":
        case "from_sec":
        case "to_sec":
            return format(data * 1000, "dd-MM-yyyy hh:mm:ss");
        case "logs":
            return (
                <Tooltip title={data.join("\n")}>
                    <p>{data[0]}</p>
                </Tooltip>
            );
        case "query":
            return <code style={{ fontFamily: "monospace" }}>{data}</code>;
        case "type":
        case "status":
            return <TypeRenderer type={data}>{data}</TypeRenderer>;
        default:
            return data;
    }
}

const TYPES = (type: string) => {
    switch (type) {
        case "delete":
            return "#dc143c";
        case "undo":
            return "#b8860b";
        case "running":
            return "#6495ed";
        default:
            return "";
    }
};

export function TypeRenderer({ type, children }) {
    return <span style={{ color: TYPES(type) }}>{children}</span>;
}
