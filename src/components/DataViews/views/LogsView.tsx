import { TabsUnstyled } from "@mui/base";
import { LogRows } from "../components/Logs/LogRows";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsList, Tab, TabPanel, ViewStyled } from "./styled";
import ReactJSON from "react-json-view";
import { useSelector } from "react-redux";
import { useMemo, useState, SyntheticEvent } from "react";

import { localTabsState } from "../helpers";

export default function LogsView(props: any) {
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
        streamData,
    } = props;

    const [tabsState, setTabsState] = useState<number>(
        localTabsState(actualQuery)[actualQuery.id]
    );

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
                    <Tab>Logs</Tab>
                    {tableData && <Tab>Table</Tab>}

                    <Tab>Raw</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <div className="view-content">
                        <LogRows
                            {...props}
                            onClose={setStreamClose}
                            messages={streamData}
                            actualQuery={actualQuery}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={1}>
                    <div className="view-content">
                        <VectorTable
                            {...props}
                            height={theight}
                            data={tableData}
                            actualQuery={actualQuery}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={2}>
                    <div className="view-content">
                        <div style={{ padding: "20px" }}>
                            <ReactJSON theme={jsonTheme} src={rawData} />
                        </div>
                    </div>
                </TabPanel>
            </TabsUnstyled>
        </ViewStyled>
    );
}
