/**
 * Cardinality totals
 * A view for the delete actions on the cardinality main view
 */
import { useState } from "react";
import { totalsMock } from "../api/mock";
import { cx } from "@emotion/css";
import { PROCESS_HEADERS } from "./consts";
import { TotalRowStyle } from "./style";
import useTheme from "@ui/theme/useTheme";
import { TotalsRow } from "./TotalsRow";

export default function CardinalityTotals({ isLoading }) {
    const theme = useTheme();
    const [totals] = useState(totalsMock);

    return (
        <div className={cx(TotalRowStyle(theme))}>
            <div className="table">
                <div className="table-header">
                    {PROCESS_HEADERS?.map((header) => (
                        <div key={header} className="cell">
                            {header}
                        </div>
                    ))}
                </div>
                <>
                    {totals?.length ? (
                        totals?.map((total, key) => (
                            <TotalsRow
                                isLoading={isLoading}
                                key={key}
                                headers={PROCESS_HEADERS}
                                total={total}
                            />
                        ))
                    ) : (
                        <> no totals </>
                    )}
                </>
            </div>
        </div>
    );
}
