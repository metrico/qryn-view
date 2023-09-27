import React, { useMemo, forwardRef, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

import { SeriesRowProps } from "./SeriesRow";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
type ChartProps = {
    rows: SeriesRowProps[];
    hasDiff?: boolean;
    chart?: any;
    isChartGroup?: boolean;
    chartData?: any;
};

const CardinalityChart = forwardRef(
    ({ chart = "", isChartGroup = false, chartData }: ChartProps, ref: any) => {
        const [width, setWidth] = React.useState(
            ref?.current?.offsetWidth || 0
        );

        const theme = useSelector((store: any) => store.theme);
        const chartTheme = useMemo(() => {
            return createTheme({ palette: { mode: theme } });
        }, [theme]);

        useEffect(() => {
            if (ref?.current?.offsetWidth) {
                setWidth(ref?.current?.offsetWidth - 8);
            }
        }, [ref?.current]);
        const chartRenderer = (isChartGroup, chartData) => {
            if (chartData && isChartGroup && chart !== "") {
                return (
                    <BarChart
                        colors={["#babc00", "#ff5555"]}
                        xAxis={[
                            {
                                id: "barCategories",
                                dataKey: "xAxisData",
                                data: [
                                    ...chartData?.valueTypesMapped[chart]
                                        ?.names,
                                ],

                                scaleType: "band",
                            },
                        ]}
                        series={[
                            {
                                data: [
                                    ...chartData?.valueTypesMapped[chart]
                                        ?.values,
                                ],
                                label: "current",
                            },

                            {
                                data: [
                                    ...chartData?.valueTypesMapped[chart]?.diff,
                                ],
                                label: "previous",
                            },
                        ]}
                        margin={{ bottom: 60, left: 60 }}
                        width={width}
                        height={300}
                    />
                );
            } else if (chartData && !isChartGroup) {
                return ( 
                    <BarChart
                        colors={["#babc00", "#ff5555"]}
                        xAxis={[
                            {
                                id: "barCategories",
                                dataKey: "xAxisData",
                                data: [...chartData?.xAxisData],
                                scaleType: "band",
                            },
                        ]}
                        series={[
                            {
                                data: [...chartData?.valueData],
                                label: "current",
                            },
                            {
                                data: [...chartData?.diffData],
                                label: "previous",
                            },
                        ]}
                        margin={{ bottom: 60, left: 60 }}
                        width={width}
                        height={300}
                    />
                );
            }
        };

        // console.log(chartData, "chartData");
        return (
            <ThemeProvider theme={chartTheme}>
                {width > 0 &&
                    chartData &&
                    chartRenderer(isChartGroup, chartData)}
            </ThemeProvider>
        );
    }
);

export default CardinalityChart;
