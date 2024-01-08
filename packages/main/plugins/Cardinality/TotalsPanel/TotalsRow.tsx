import React from "react";
import { useCardinalityRequest } from "../api/CardinalityRequest";
import { type Total } from "../api/types";
import { CellFormatter, getCellData } from "./helper";
import { type MaintainanceActions } from "./types";
import { UndoCardinalityDialog } from "../CardinalityDialog";
import { Tooltip } from "@mui/material";

export function TotalsRow({
    headers,
    total,
    isLoading,
}: Total & MaintainanceActions) {
    const { handleUndoFingerprints } = useCardinalityRequest();

    const cellDataFormatted = getCellData(total, headers);

    return (
        <div className="table-row">
            {cellDataFormatted.map((col, key) => (
                <div key={key} className="cell">
                    <CellFormatter col={col} />
                </div>
            ))}

            <div className="cell">
                <Tooltip title="undo action">
                    <UndoCardinalityDialog
                        id={total.id}
                        query={total.query}
                        isLoading={isLoading}
                        undoAction={() => handleUndoFingerprints(total.id)}
                    />
                </Tooltip>
            </div>
        </div>
    );
}
