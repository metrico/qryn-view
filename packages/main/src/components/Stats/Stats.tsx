import { css, cx } from "@emotion/css";
import { useMemo } from "react";
import useTheme from "@ui/theme/useTheme";

const StatsCont = (theme: any) => css`
    color: ${theme.contrast};
    display: flex;
    flex: 1;
    flex-direction: column;
    border: 1px solid ${theme.accentNeutral};
    margin-top: 5px;
    border-radius: 5px;
`;

const StatsHeader = (theme: any) => css`
    font-size: 14px;
    background: ${theme.shadow};
    padding: 5px;
    border-bottom: 1px solid ${theme.accentNeutral};
`;

const StatsTable = (theme: any) => css`
    display: table;
`;
const StatsRow = css`
    display: table-row;
    font-size: 13px;
`;

const StatsCell = (theme: any, type: "key" | "value") => css`
    display: table-cell;
    padding: 5px;
    border-top: 1px solid ${theme.accentNeutral};
    ${type === "key" ? `color:${theme.hardContrast};` : ""}
`;

const StatsKey = css`
    font-weight: lighter;
`;
const StatsValue = css`
    font-family: monospace;
`;

export function Stats(props: any) {
    const {
        data: { hasStats, statsData },
    } = props;
    const theme = useTheme();
    const statsDisplay: [string, string][] = useMemo(() => {
        if (
            typeof statsData !== "object" &&
            statsData !== undefined &&
            Object.keys(statsData)?.length < 1
        ) {
            return [["key", "val"]];
        }

        return Object.entries(statsData);
    }, [statsData]);

    if (statsDisplay?.length > 0 && hasStats) {
        return (
            <div className={cx(StatsCont(theme))}>
                <div className={cx(StatsHeader(theme))}>Stats</div>
                <div className={cx(StatsTable(theme))}>
                    {statsDisplay?.map(([key, value], index) => (
                        <div key={index} className={cx(StatsRow)}>
                            <div
                                className={cx(
                                    StatsCell(theme, "key"),
                                    StatsKey
                                )}
                            >
                                {key}
                            </div>
                            <div
                                className={cx(
                                    StatsCell(theme, "value"),
                                    StatsValue
                                )}
                            >
                                {value || ""}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
