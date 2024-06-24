import { useMemo, useState, SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "@mui/base";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsListq, Tabq, TabPanelq, ViewStyled } from "./styled";
import { localTabsState } from "../helpers";
import QrynChart from "../components/Charts";
import { LogRows } from "../components/Logs/LogRows";
import ReactJson from "@microlink/react-json-view";
import React from "react";

const LogsView: React.FunctionComponent<any> = (props: any) => {
    const {
        viewRef,
        panelSize,
        viewHeight,
        setStreamClose,
        setMaxHeight,
        setMinimize,
        actualQuery,
        total,
        type,
        theight,
        viewWidth,
        tableData,

        logsVolumeData,
    } = props;
    const { isLogsVolume, loading } = actualQuery;
    const { limit } = actualQuery;

    const [tabsState, setTabsState] = useState<number>(
        localTabsState(actualQuery)[actualQuery.id] || 0
    );

    const [actStreamData, setActStreamData] = useState(props.streamData);

    const rawData = useMemo(() => {
        return JSON.parse(JSON.stringify(props?.dataView?.raw)) || [];
    }, [props?.dataView?.raw]);

    const theme = useSelector((store: any) => store.theme);

    const jsonTheme = useMemo(() => {
        if (theme === "light") {
            return "rjv-default";
        }
        return "tomorrow";
    }, [theme]);

    const onTabChange = (
        e: SyntheticEvent<Element, Event>,
        value: number | string | boolean
    ) => {
        const newState = {
            ...localTabsState(actualQuery),
            [actualQuery.id]: value,
        };

        localStorage.setItem("tabsState", JSON.stringify(newState));
        if (typeof value === "number") {
            setTabsState(() => value);
        }
    };

    useEffect(() => {
        if (!loading) {
            setActStreamData(props.streamData);
        }
    }, [props.streamData]);

    return (
        <ViewStyled ref={viewRef} size={panelSize} vheight={viewHeight}>
            <ViewHeader
                onClose={setStreamClose}
                setMinimize={setMinimize}
                setMaxHeight={setMaxHeight}
                actualQuery={actualQuery}
                total={total}
                type={type}
                {...props}
            />

            {isLogsVolume && logsVolumeData?.length > 0 && viewWidth > 0 && (
                <div>
                    {!loading && (
                        <QrynChart
                            {...props}
                            tWidth={viewWidth}
                            chartLimit={limit}
                            matrixData={logsVolumeData}
                            actualQuery={actualQuery}
                        />
                    )}
                </div>
            )}

            <Tabs
                defaultValue={localTabsState(actualQuery)[actualQuery.id] || 0}
                value={tabsState}
                onChange={onTabChange}
            >
                <TabsListq panelsize={props.panelSize}>
                    <Tabq>Logs</Tabq>
                    {tableData && <Tabq>Table</Tabq>}

                    <Tabq>Raw</Tabq>
                </TabsListq>
                <TabPanelq value={0}>
                    <div className="view-content">
                        {!loading && (
                            <LogRows
                                {...props}
                                onClose={setStreamClose}
                                messages={actStreamData}
                                actualQuery={actualQuery}
                            />
                        )}
                    </div>
                </TabPanelq>
                <TabPanelq value={1}>
                    <div className="view-content">
                        {!loading && (
                            <VectorTable
                                {...props}
                                height={theight}
                                data={tableData}
                                actualQuery={actualQuery}
                            />
                        )}
                    </div>
                </TabPanelq>
                <TabPanelq value={2}>
                    <div className="view-content">
                        <div style={{ padding: "20px" }}>
                            {!loading && (
                                <ReactJson theme={jsonTheme} src={rawData} />
                            )}
                        </div>
                    </div>
                </TabPanelq>
            </Tabs>
        </ViewStyled>
    );
};

export default LogsView;
