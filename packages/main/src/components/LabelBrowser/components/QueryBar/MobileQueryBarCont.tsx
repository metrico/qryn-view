// mobile top query view (mobile view or splitted view)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowLabelsButton from "../Buttons/ShowLabelsButton";
import ShowLogsButton from "../Buttons/ShowLogsButton";
import ShowQuerySettingsButton from "../Buttons/ShowQuerySettingsButton";
import { MobileTopQueryMenu, SettingLabel } from "../styled";
import HistoryButton from "../Buttons/HistoryButton";
import ShowLogsRateButton from "../Buttons/ShowLogsRateButton";
import { Switch } from "@mui/material";
import { panelAction } from "./QueryBar";

type MobileQueryMenuContProps = {
    // booleans
    isSplit: boolean;
    queryValid: boolean;
    loading: boolean;
    hasStats: boolean;
    showStatsOpen: boolean;
    isTabletOrMobile: boolean;

    //data
    data: any;
    queryHistory: any;
    name: string;
    dataSourceType: string;
    labels: any;

    //events
    onSubmit: (e: any) => void;
    onSubmitRate: (e: any) => void;
    onShowQuerySettings: () => void;

    //handlers
    handleHistoryClick: (e: any) => void;
    handleStatsOpen: (e: any) => void;
};

const MobileQueryMenuCont: React.FC<MobileQueryMenuContProps> = (props) => {
    const dispatch: any = useDispatch();
    const {
        isSplit,
        onShowQuerySettings,
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
        ...rest
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
                        {...rest}
                        isSplit={isSplit}
                        isMobile={true}
                        onClick={onShowQuerySettings}
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
        <MobileTopQueryMenu>
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

            {dataSourceType === "logs" && hasStats && isSplit && (
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

export default MobileQueryMenuCont;
