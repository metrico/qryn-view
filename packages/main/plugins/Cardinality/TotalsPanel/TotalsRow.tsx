import React from "react";

import { type Total } from "../api/types";
import { CellFormatter, getCellData } from "./helper";
import { type MaintainanceActions } from "./types";
import { UndoCardinalityDialog } from "../CardinalityDialog";
import { useMaintenance } from "./useMaintenance";

export function TotalsRow({
    headers,
    total,
    isLoading,
}: Total & MaintainanceActions) {
    //const { handleUndoFingerprints } = useCardinalityRequest();

    const cellDataFormatted = getCellData(total, headers);

    const { undoActionCB } = useMaintenance();

    return (
        <div className="table-row">
            {cellDataFormatted.map((col, key) => (
                <div key={key} className="cell">
                    <CellFormatter col={col} />
                </div>
            ))}

            <div className="cell">
                {(total["status"] === "success" ||
                    total["status"] === "failed") && (
                    <UndoCardinalityDialog
                        id={total.id}
                        query={total.query}
                        isLoading={isLoading}
                        undoAction={() => undoActionCB(total.id)}
                    />
                )}
            </div>
        </div>
    );
}
