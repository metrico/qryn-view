import { ThemeProvider } from "@emotion/react";
import ChartLabelsList from "./ChartLabelList";
import ChartTools from "./ChartTools";
import { ChartCont } from "./styled";


export function FlotChart({
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
}: any) {
    return (
        <ThemeProvider theme={theme}>
            <ChartCont>
                <ChartTools
                    matrixData={matrixData}
                    chartType={chartType}
                    handleNoLimitData={handleNoLimitData}
                    handleLimitData={handleLimitData}
                    isSpliced={isSpliced}
                    onSetChartType={onSetChartType}
                />
                <div className="chart-cont">
                <div
                    ref={chartRef}
                    id={"chart-container"}
                    style={{
                        flex: "1",
                        minHeight:'180px',
                        height:'100%',
                        display: "block",
                        position: "relative",
                    }}
                ></div>
                </div>
                <ChartLabelsList onLabelClick={onLabelClick} labels={labels} />
            </ChartCont>
        </ThemeProvider>
    );
}
