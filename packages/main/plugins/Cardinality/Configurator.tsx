import { css, cx } from "@emotion/css";
import React from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Totals } from "./Totals";
import useCardinalityStore from "./store/CardinalityStore";
export const CardContainer = (theme: any) => css`
    background: ${theme.shadow};
    padding: 8px;
    border-radius: 3px;
    margin: 4px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    .form-row {
        display: flex;
        flex: 1;
    }
    .form-group {
        display: flex;
        align-items: center;
        label {
            color: ${theme.contrast};
            font-size: 12px;
            padding: 7px;
            background: ${theme.background};
            border: 1px solid ${theme.lightNeutral};
            border-radius: 3px;
        }
        input {
            background: ${theme.deep};
            border-radius: 3px;
            padding: 5px 8px;
            border: 1px solid ${theme.lightNeutral};
            color: ${theme.contrast};
            transition: 0.35s all;
            font-family: monospace;

            &:focus {
                outline: none;
                border: 1px solid ${theme.primary};
            }
            &.l {
                flex: 1;
            }
            &.s {
                max-width: 50px;
            }
        }

        &.l {
            flex: 1;
        }
    }
    .config-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0px;
        .c-totals {
            display: flex;
            align-items: center;
        }
        .query-button {
            transition: 0.35s all;
            background: ${theme.primaryAccent};
            color: ${theme.contrast};
            padding: 4px 6px;
            border-radius: 3px;
            border: 1px solid ${theme.primary};
            cursor: pointer;
            display: flex;
            align-items: center;
            &:hover {
                background: ${theme.primary};
            }
        }
    }
`;

type ConfiguratorProps = {
    total: number;
    percent?: number;
    theme: any;
};



const Configurator: React.FC<ConfiguratorProps> = ({
    total,
    percent = 35,
    theme,
}) => {
    const {
        timeSeriesSelector,
        setTimeSeriesSelector,
        focusLabel,
        setFocusLabel,
        limitEntries,
        setLimitEntries,
    } = useCardinalityStore();


    const { total: totalSeries } = useCardinalityStore();
   
    const onTimeSeriesChange = (e: any) => {
        setTimeSeriesSelector(e.target.value);
    };

    const onFocusLabeChange = (e: any) => {
        setFocusLabel(e.target.value);
    };

    const onLimitEntriesChange = (e: any) => {
        setLimitEntries(e.target.value);
    };

    return (
        <div className={cx(CardContainer(theme))}>
            <div className="form-row">
                <div className="form-group l">
                    <label>Time Series Selector</label>

                    <input
                        className="l"
                        type="text"
                        value={timeSeriesSelector}
                        onChange={onTimeSeriesChange}
                    />
                </div>

                <div className="form-group m">
                    <label>Focus Label</label>
                    <input
                        value={focusLabel}
                        type="text"
                        onChange={onFocusLabeChange}
                    />
                </div>

                <div className="form-group s">
                    <label>Limit entries</label>
                    <input
                        className="s"
                        type="number"
                        value={limitEntries}
                        onChange={onLimitEntriesChange}
                    />
                </div>
            </div>
            <div className="config-actions">
                <div className="c-totals">
                    <Totals theme={theme} value={totalSeries.amount} text={"total"} />
                    <Totals theme={theme} type={'prev'} value={totalSeries.prev} text={"previous"} />
                    <Totals theme={theme} type={'prev'} value={totalSeries.diff} text={"diff"} />

          
                </div>

                <div className="">
                    <button className="query-button">
                        <ChevronRightOutlinedIcon fontSize="small" />
                        Execute Query
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Configurator;
