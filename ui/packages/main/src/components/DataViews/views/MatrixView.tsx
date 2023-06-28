import QrynChart from "../components/Charts";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsUnstyled } from "@mui/base";
import { TabsList, Tab, TabPanel, ViewStyled } from "./styled";

import ReactJson from "@microlink/react-json-view";
import { useSelector } from "react-redux";
import { useMemo, useState, SyntheticEvent, useEffect } from "react";
import { localTabsState } from "../helpers";

export const MatrixView = (props: any) => {
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
        tableData,
        viewWidth,
        limit,
        streamData,
    } = props;
    const { loading } = actualQuery;
    const theme = useSelector((store: any) => store.theme);

    const [actStreamData, setActStreamData] = useState([]);
    const jsonTheme = useMemo(() => {
        if (theme === "light") {
            return "rjv-default";
        }
        return "tomorrow";
    }, [theme]);

    const [tabsState, setTabsState] = useState<number>(
        localTabsState(actualQuery)[actualQuery.id] || 0
    );

    const rawData = useMemo(() => {
        return JSON.parse(JSON.stringify(props?.dataView?.raw)) || [];
    }, [props?.dataView?.raw]);

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
        if (!loading && streamData?.[0]?.metric) {
            setActStreamData(streamData);
        }
    }, [streamData]);

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
            <TabsUnstyled
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
                defaultValue={localTabsState(actualQuery)[actualQuery.id] || 0}
                value={tabsState}
                onChange={onTabChange}
            >
                <TabsList panelsize={props.panelSize}>
                    <Tab>Chart</Tab>
                    <Tab>Table</Tab>
                    <Tab>Raw</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <div className="view-content" style={{ height: "100%" }}>
                        {!loading && actStreamData?.[0]?.metric && (
                            <QrynChart
                                {...props}
                                tWidth={viewWidth}
                                chartLimit={limit}
                                matrixData={actStreamData}
                                actualQuery={actualQuery}
                            />
                        )}
                    </div>
                </TabPanel>
                <TabPanel value={1}>
                    <div className={"view-content"}>
                        {!loading && (
                            <VectorTable
                                {...props}
                                height={theight}
                                data={tableData}
                                actualQuery={actualQuery}
                            />
                        )}
                    </div>
                </TabPanel>
                <TabPanel value={2}>
                    <div className="view-content">
                        <div style={{ padding: "20px" }}>
                            {!loading && (
                                <ReactJson theme={jsonTheme} src={rawData} />
                            )}
                        </div>
                    </div>
                </TabPanel>
            </TabsUnstyled>
        </ViewStyled>
    );
};
