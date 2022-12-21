
import QrynChart from "../components/Charts";
import { VectorTable } from "../components/Table/VectorTable/VectorTable";
import { ViewHeader } from "../components/ViewHeader";
import { TabsUnstyled } from "@mui/base";
import { TabsList, Tab, TabPanel, ViewStyled } from "./styled";
export const MatrixView = (props) => {
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
            <TabsUnstyled style={{display:'flex',flex:1, flexDirection:'column'}} defaultValue={0}>
                <TabsList panelsize={props.panelSize}>
                    <Tab>Chart</Tab>
                    <Tab>Table</Tab>
                </TabsList>
                <TabPanel  value={0}>
                    
                    <QrynChart
                        {...props}
                        tWidth={viewWidth}
                        chartLimit={limit}
                        matrixData={streamData}
                        actualQuery={actualQuery}
                    />
                  
                </TabPanel>
                <TabPanel value={1}>
                   
                    <VectorTable
                        {...props}
                        height={theight}
                        data={tableData}
                        actualQuery={actualQuery}
                    />
                  
                </TabPanel>
            </TabsUnstyled>



            {/* <div className="view-content">
                {actualQuery?.tableView ? (
                    <VectorTable
                        {...props}
                        height={theight}
                        data={tableData}
                        actualQuery={actualQuery}
                    />
                ) : (
                    <QrynChart
                        {...props}
                        tWidth={viewWidth}
                        chartLimit={limit}
                        matrixData={streamData}
                        actualQuery={actualQuery}
                    />
                )}
            </div> */}
        </ViewStyled>
    );
};