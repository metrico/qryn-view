import { TabsUnstyled } from "@mui/base";
import { useEffect, useMemo, useRef, useState } from "react";
import QrynChart from "../components/Charts";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsList, Tab, TabPanel, ViewStyled } from "./styled";
import ReactJSON from "react-json-view";
import { useSelector } from "react-redux";

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
    const [size, setSize] = useState(0);

    const parentRef: any = useRef(null);

    useEffect(() => {
        setSize(parentRef.current.offsetHeight);
    }, [parentRef]);
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
            <TabsUnstyled defaultValue={0}>
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
                            size={size}
                            height={theight}
                            data={streamData.tableData}
                            actualQuery={actualQuery}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={1}>
                    <div className="view-content">
                        <div style={{ padding: "20px" }}>
                            <ReactJSON
                            theme={jsonTheme}
                                src={JSON.parse(
                                    JSON.stringify(props?.dataView?.raw)
                                )}
                            />
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
