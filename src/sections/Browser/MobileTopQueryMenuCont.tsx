import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HistoryButton from "../../qryn-ui/Buttons/HistoryButton";
import ShowLabelsButton from "../../qryn-ui/Buttons/ShowLabelsButton";
import ShowLogsButton from "../../qryn-ui/Buttons/ShowLogsButton";
import ShowLogsRateButton from "../../qryn-ui/Buttons/ShowLogsRateButton";
import ShowQuerySettingsButton from "../../qryn-ui/Buttons/ShowQuerySettingsButton";
import { panelAction } from "./helpers";
import { MobileTopQueryMenu, SettingLabel } from "./styles";

// mobile top query view (mobile view or splitted view)
export const MobileTopQueryMenuCont = (props: any) => {
    const dispatch = useDispatch();
    const {
        isSplit,
        showQuerySettings,
        queryHistory,
        handleHistoryClick,
        queryValid,
        onSubmit,
        onSubmitRate,
        data,
        name,
        loading,
        hasStats,
        showStatsOpen,
        handleStatsOpen,
    } = props;
    const { id, dataSourceType } = data;
    const [isChartViewSet, setIsChartViewSet] = useState(props.data.chartView);

    useEffect(() => {
        setIsChartViewSet(props.data.chartView);
    }, [setIsChartViewSet, props.data.chartView]);

    const panelQuery = useSelector((store: any) => store[name]);

    const withLabels = (type: any) => {
        if (type !== "flux" && type !== "metrics" && type !== "traces") {
            return (
                <>
                    <ShowLabelsButton {...props} isMobile={true} />
                    <ShowQuerySettingsButton
                        {...props}
                        isSplit={isSplit}
                        isMobile={true}
                        onClick={showQuerySettings}
                    />
                </>
            );
        }
        return null;
    };
    const getPanelQueryByID = (panel: any, queryId: any) => {
        return panel.find((query: any) => {
            return query.id === queryId;
        });
    };
    const handleChartViewSwitch = () => {
        // modify table view switch value
        const panel = [...panelQuery];

        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.chartView = !isChartViewSet;

            dispatch(panelAction(name, panel));
        }
    };
    return (
        <MobileTopQueryMenu isSplit={isSplit} dataSourceType={dataSourceType}>
            {withLabels(dataSourceType)}

            <HistoryButton
                queryLength={queryHistory?.length}
                handleHistoryClick={handleHistoryClick}
                isMobile={true}
            />
            {dataSourceType === "logs" && (
                <ShowLogsRateButton
                    disabled={!queryValid}
                    onClick={onSubmitRate}
                    isMobile={false}
                />
            )}

            {dataSourceType === "logs" && hasStats && (
                <div className="options-input">
                    <SettingLabel>Show Stats</SettingLabel>
                    <Switch
                        checked={showStatsOpen}
                        size={"small"}
                        onChange={handleStatsOpen}
                        inputProps={{ "aria-label": "controlled-switch" }}
                    />
                </div>
            )}

            <ShowLogsButton
                disabled={!queryValid}
                onClick={onSubmit}
                isMobile={true}
                loading={loading || false}
            />

            {dataSourceType === "flux" && (
                <div className="options-input">
                    <SettingLabel>Chart View</SettingLabel>
                    <Switch
                        checked={isChartViewSet}
                        size={"small"}
                        onChange={handleChartViewSwitch}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </div>
            )}
        </MobileTopQueryMenu>
    );
};
