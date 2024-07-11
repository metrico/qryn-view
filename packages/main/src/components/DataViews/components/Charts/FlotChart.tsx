import { ThemeProvider } from "@emotion/react";
import ChartLabelsList from "./ChartLabelList";
import ChartTools from "./ChartTools";
import { ChartCont } from "./styled";

export function FlotChart(props: any) {
    const {
        theme,
        matrixData,
        chartType,
        handleLimitData,
        handleNoLimitData,
        isSpliced,
        onSetChartType,
        chartRef,
        onLabelClick,
        labels,
        isLogsVolume,
    } = props;

    return (
        <ThemeProvider theme={theme}>
            <ChartCont>
                {isLogsVolume ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "12px",
                            color: theme.contrast,
                            paddingTop:"8px"
                        }}
                    >
                        Logs Volume
                    </div>
                ) : (
                    <ChartTools
                        matrixData={matrixData}
                        chartType={chartType}
                        handleNoLimitData={handleNoLimitData}
                        handleLimitData={handleLimitData}
                        isSpliced={isSpliced}
                        onSetChartType={onSetChartType}
                    />
                )}
                <div className="chart-cont">
                    <div
                        ref={chartRef}
                        id={"chart-container"}
                        style={{
                            flex: "1",
                            minHeight: "97px",
                            height: "100%",
                            display: "block",
                            position: "relative",
                            paddingTop: "10px",
                        }}
                    ></div>
                </div>
                <ChartLabelsList onLabelClick={onLabelClick} labels={labels} />
            </ChartCont>
        </ThemeProvider>
    );
}
