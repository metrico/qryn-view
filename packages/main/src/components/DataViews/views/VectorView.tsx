import { Tabs } from "@mui/base";
import { useMemo, useRef, useState, SyntheticEvent } from "react";
import QrynChart from "../components/Charts/QrynChart";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsListq, Tabq, TabPanelq, ViewStyled } from "./styled";
import ReactJson from "@microlink/react-json-view";
import { useSelector } from "react-redux";
import { localTabsState } from "../helpers";
import DOMPurify from "isomorphic-dompurify";
export const VectorView = (props: any) => {
    const {
        viewRef,
        panelSize,
        viewHeight,
        setStreamClose,
        setMinimize,
        setMaxHeight,
        actualQuery,
        total,
        type,
        theight,
        streamData,
        viewWidth,
        limit,
    } = props;
    const { loading } = actualQuery;
    const theme = useSelector((store: any) => store.theme);
    const jsonTheme = useMemo(() => {
        if (theme === "light") {
            return "rjv-default";
        }
        return "tomorrow";
    }, [theme]);

    const parentRef: any = useRef(null);

    const rawData = useMemo(() => {
        return JSON.parse(JSON.stringify(props?.dataView?.raw)) || [];
    }, [props?.dataView?.raw]);

    const [tabsState, setTabsState] = useState<number>(
        localTabsState(actualQuery)[actualQuery.id] || 0
    );

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
            <Tabs
                defaultValue={localTabsState(actualQuery)[actualQuery.id] || 0}
                value={tabsState}
                onChange={onTabChange}
            >
                <TabsListq panelsize={props.panelSize}>
                    <Tabq>Table</Tabq>

                    <Tabq>Raw</Tabq>
                    {streamData?.chartData && <Tabq>Chart</Tabq>}
                </TabsListq>
                <TabPanelq value={0}>
                    <div
                        className="view-content"
                        ref={parentRef}
                        id={DOMPurify.sanitize(`${actualQuery?.id}-view`)}
                    >
                        {!loading && (
                            <VectorTable
                                {...props}
                                height={theight}
                                data={streamData.tableData}
                                actualQuery={actualQuery}
                            />
                        )}
                    </div>
                </TabPanelq>
                <TabPanelq value={1}>
                    <div className="view-content">
                        <div style={{ padding: "20px" }}>
                            {!loading && (
                                <ReactJson theme={jsonTheme} src={rawData} />
                            )}
                        </div>
                    </div>
                </TabPanelq>
                {streamData?.chartData && (
                    <TabPanelq value={2}>
                        <div className="view-content">
                            {!loading && (
                                <QrynChart
                                    {...props}
                                    tWidth={viewWidth}
                                    chartLimit={limit}
                                    matrixData={streamData.chartData}
                                    actualQuery={actualQuery}
                                />
                            )}
                        </div>
                    </TabPanelq>
                )}
            </Tabs>
        </ViewStyled>
    );
};
