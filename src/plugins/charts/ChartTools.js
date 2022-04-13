import { useMediaQuery } from "react-responsive";
import HandleLimitButton from "./HandleLimitButton";
import { ChartToolsCont, ChartButton } from "./styled";

export default function ChartTools({
    matrixData,
    chartType,
    handleNoLimitData,
    handleLimitData,
    isSpliced,
    onSetChartType,
}) {
    const isMobile = useMediaQuery({ query: "(max-width: 565px)" });
    function setBarChart() {
        onSetChartType("bar");
    }
    function setLineChart() {
        onSetChartType("line");
    }
    function setPointsChart() {
        onSetChartType("points");
    }
    return (
        <ChartToolsCont isMobile={isMobile}>
            <div className="limit-cont">
                <HandleLimitButton
                    isSpliced={isSpliced}
                    handleNoLimitData={handleNoLimitData}
                    handleLimitData={handleLimitData}
                    matrixData={matrixData}
                />
            </div>
            <div className="chart-buttons-cont">
                <ChartButton
                    isActive={chartType === "bar"}
                    onClick={setBarChart}
                    leftBtn={true}
                >
                    {"bar chart"}
                </ChartButton>
                <ChartButton
                    onClick={setLineChart}
                    isActive={chartType === "line"}
                >
                    {"line chart"}
                </ChartButton>
                <ChartButton
                    onClick={setPointsChart}
                    isActive={chartType === "points"}
                    rightBtn={true}
                >
                    {"points chart"}
                </ChartButton>
            </div>
        </ChartToolsCont>
    );
}
