import React, { useRef } from "react";
import { SeriesRowProps } from "./SeriesRow";
import CardinalityChart from "./Chart";
import { css, cx } from "@emotion/css";
import { QrynTheme } from "@ui/theme/types";
import styled from "@emotion/styled";

export const CardinalityChartsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: 4px;
`;

export const CardinalityChartContainerStyles = (theme: QrynTheme) => css`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 33%;
    border: 1px solid ${theme.neutral};
    .label {
        display: flex;
        padding: 6px 8px;
        text-align: center;
    }
`;

export type ChartContainerProps = {
    rows: SeriesRowProps[];
    theme: QrynTheme;
    hasDiff?: boolean;
    chart?: any;
    chartData?: any;
};

const ChartContainer: React.FC<ChartContainerProps> = ({
    chart = "",
    rows,
    theme,
    hasDiff = true,
    chartData,
}) => {
    const containerRef = useRef<any>(null);

    return (
        <div
            className={cx(CardinalityChartContainerStyles(theme))}
            ref={containerRef}
        >
            {chart !== "" && <div className="label">{chart}</div>}
            <CardinalityChart
                chartData={chartData}
                isChartGroup={chart !== ""}
                chart={chart}
                rows={rows}
                hasDiff={hasDiff}
                ref={containerRef}
            />
        </div>
    );
};

export default ChartContainer;
