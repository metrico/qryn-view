import { cx, css } from "@emotion/css";
import React, {useEffect} from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Totals } from "./Totals";
import DayPicker from "./DayPicker";
import { useTheme } from "@emotion/react";
import useConfigurator from "./useConfigurator";
import CardinalityInput from "./CardinalityInput";
import { ConfigContainerStyles } from "./ConfigContainerStyles";
import { useCardinalityRequest } from "./api/CardinalityRequest";
import useCardinalityStore from "./store/CardinalityStore";
import CardinalityDialog from "./CardinalityDialog";
import {
    StyledTabs,
    StyledTab,
} from "@ui/main/components/QueryItem/StyledTabs";

type ConfiguratorProps = {
    theme: any;
    percent?: number;
    total: any;
    focusLabelItems: any;
    timeSeriesSelectorItems: any;
    limitEntriesItems: any;
    setHistoryItem: any;
    activeTab;
    onTabChange : (event:any, tab:any) => void
};

// we should simply add a switch to choose btween day and timeseconds

export const StyledTabsCont = (theme: any) => css`
    background: ${theme.WidgetBg};
    .MuiTabs-root {
        height: 20px !important;
        min-height: 20px;
    }
    .MuiButtonBase-root {
        min-height: 0;
    }
`;



const Configurator: React.FC<ConfiguratorProps> = ({
    theme = useTheme(),
    focusLabelItems,
    timeSeriesSelectorItems,
    limitEntriesItems,
    setHistoryItem,
    activeTab = 0,
    onTabChange
}) => {
    // in this way we could set history as first values

    const {
        onTimeSeriesChange,
        onKeyDownTimeSeries,
        onFocusLabeChange,
        onKeyDownFocusLabel,
        onLimitEntriesChange,
        onKeyDownLimitEntries,
        onQueryHistoryChange,
        onFocusHistoryChange,
        onLimitHistoryChange,
        query,
        focus,
        limit,
        totalSeries,
        reset,
        date,
    } = useConfigurator({ setHistoryItem });

    //a handler for making a get request to the api

    const { handleCardinalityRequest, handleDelete, handleGetDeletedFingerprints } =
        useCardinalityRequest(true);
    const { setTimeSeriesSelector, setFocusLabel, setLimitEntries, isLoading } =
        useCardinalityStore();

        //this feature is not implemented yet
    useEffect(() => {
        handleGetDeletedFingerprints();
    }, []);



   // console.log(handleGetDeletedFingerprints())

    const handleReset = () => {
        reset();
        localStorage.setItem("labelValuePairs", "");
        handleCardinalityRequest({
            match: "",
            focusLabel: "",
            topN: limit,
            date,
        });
    };

    //this feature is not implemented yet


    return (
        <div className={cx(ConfigContainerStyles(theme))}>
            <div className="form-row">
                <CardinalityInput
                    name="timeSeriesSelector"
                    value={query}
                    label="Time Series Selector"
                    size="l"
                    inputSize="l"
                    type="text"
                    onChange={onTimeSeriesChange}
                    onKeyDown={onKeyDownTimeSeries}
                    onHistoryChange={onQueryHistoryChange}
                    history={timeSeriesSelectorItems}
                    hasHistory={timeSeriesSelectorItems.length > 0}
                />

                <CardinalityInput
                    name="focusLabel"
                    value={focus}
                    label="Focus Label"
                    size="m"
                    inputSize=""
                    type="text"
                    onChange={onFocusLabeChange}
                    onKeyDown={onKeyDownFocusLabel}
                    onHistoryChange={onFocusHistoryChange}
                    history={focusLabelItems}
                    hasHistory={focusLabelItems.length > 0}
                />

                <CardinalityInput
                    name="limitEntries"
                    value={limit}
                    label="Limit Entries"
                    size="s"
                    inputSize="s"
                    type="number"
                    onChange={onLimitEntriesChange}
                    onKeyDown={onKeyDownLimitEntries}
                    onHistoryChange={onLimitHistoryChange}
                    history={limitEntriesItems}
                    hasHistory={limitEntriesItems.length > 0}
                />
            </div>
            <div className="config-actions">
                <div className="c-totals">
                    <Totals
                        theme={theme}
                        value={totalSeries.amount}
                        text={"total"}
                    />

                    <Totals
                        theme={theme}
                        type={"prev"}
                        value={totalSeries.prev}
                        text={"previous"}
                    />

                    <Totals
                        theme={theme}
                        type={"diff"}
                        value={totalSeries.diff}
                        trend={
                            totalSeries.diff === 0
                                ? "none"
                                : totalSeries.diff > 0
                                  ? "up"
                                  : "down"
                        }
                        text={"diff"}
                    />
                    <Totals
                        theme={theme}
                        type={"prev"}
                        value={totalSeries.quota}
                        text={"quota"}
                    />
                </div>
                <div className="buttons-group">

                <div className={cx(StyledTabsCont(theme))}>
                <StyledTabs value={activeTab} onChange={onTabChange}>
                    <StyledTab label="List" />
                    <StyledTab label="Processed" />
                </StyledTabs>
            </div>

                </div>

                <div className="buttons-group">
                    {query !== "" && (
                        <button className="query-button">
                            <CardinalityDialog
                                clearFingerPrints={(query) =>
                                    handleDelete(query, totalSeries.amount)
                                }
                                isLoading={isLoading}
                                label={""}
                                value={totalSeries.amount}
                                source={""}
                                isCustom={true}
                                query={query}
                            />
                        </button>
                    )}

                    <DayPicker />
                    <button onClick={handleReset} className="query-button">
                        Reset
                    </button>
                    <button
                        onClick={() => {
                            setTimeSeriesSelector(query);
                            setFocusLabel(focus);
                            setLimitEntries(Number(limit));

                            handleCardinalityRequest({
                                match: query,
                                focusLabel: focus,
                                topN: limit,
                            });
                        }}
                        className="query-button"
                    >
                        <ChevronRightOutlinedIcon fontSize="small" />
                        Execute Query
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Configurator;
