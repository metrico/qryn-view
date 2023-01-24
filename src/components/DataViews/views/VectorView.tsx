import { TabsUnstyled } from "@mui/base";
import { useMemo, useRef, useState, SyntheticEvent } from "react";
import QrynChart from "../components/Charts";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsList, Tab, TabPanel, ViewStyled } from "./styled";
import ReactJSON from "react-json-view";
import { useSelector } from "react-redux";
import { localTabsState } from "../helpers";

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
        localTabsState(actualQuery)[actualQuery.id]
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
            setTabsState((_: any) => value);
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
            <TabsUnstyled
                defaultValue={localTabsState(actualQuery)[actualQuery.id] || 0}
                value={tabsState}
                onChange={onTabChange}
            >
                <TabsList panelsize={props.panelSize}>
                    <Tab>Table</Tab>

                    <Tab>Raw</Tab>
                    {streamData?.chartData && <Tab>Chart</Tab>}
                </TabsList>
                <TabPanel value={0}>
                    <div
                        className="view-content"
                        ref={parentRef}
                        id={actualQuery?.id + "-view"}
                    >
                        <VectorTable
                            {...props}
                            height={theight}
                            data={streamData.tableData}
                            actualQuery={actualQuery}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={1}>
                    <div className="view-content">
                        <div style={{ padding: "20px" }}>
                            <ReactJSON theme={jsonTheme} src={rawData} />
                        </div>
                    </div>
                </TabPanel>
                {streamData?.chartData && (
                    <TabPanel value={2}>
                        <div className="view-content">
                            <QrynChart
                                {...props}
                                tWidth={viewWidth}
                                chartLimit={limit}
                                matrixData={streamData.chartData}
                                actualQuery={actualQuery}
                            />
                        </div>
                    </TabPanel>
                )}
            </TabsUnstyled>
        </ViewStyled>
    );
};
