import * as echarts from "echarts";

import React, { useRef, useEffect } from "react";

import dayjs from "dayjs";

type EChartsOption = echarts.EChartsOption;
export type MetricsChartProps = {
    metricsData: any;
    title: string;
};

export const MetricsChart: React.FC<MetricsChartProps> = ({
    metricsData,
    title,
}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (metricsData?.length > 0 && chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const formatMetricsData = (metricsData: any[]) => {
                const series = [];

                for (let metric of metricsData) {
                    const entry = metric?.values?.reduce(
                        (acc, [date, data]) => {
                            acc.date.push(
                                dayjs(date * 1000).format("MM/DD HH:mm:ss")
                            );
                            acc.data.push(data);
                            return acc;
                        },
                        { date: [], data: [] }
                    );
                    series.push(entry);
                }
                return series;
            };

            const series = formatMetricsData(metricsData);
            const option: EChartsOption = {
                width: chartRef.current.clientWidth - 85,
                grid: {
                    left: 50,
                },
                tooltip: {
                    trigger: "axis",
                    position: function (pt) {
                        return [pt[0], "10%"];
                    },
                },
                title: {
                    left: "center",
                    text: title,
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none",
                        },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: series[0].date,
                },
                yAxis: {
                    type: "value",
                    boundaryGap: [0, "100%"],
                },
                dataZoom: [
                    {
                        type: "inside",
                        start: 0,
                        end: 100,
                    },
                    {
                        start: 0,
                        end: 100,
                    },
                ],
                series: metricsData.map((metrics, index) => ({
                    name: JSON.stringify(metrics.metric),
                    type: "line",
                    symbol: "none",
                    sampling: "none",
                    data: series[index].data,
                })),
            };

            myChart.setOption(option);
        }
    }, [metricsData]);

    return (
        <div style={{ width: "100%", height: "250px" }} ref={chartRef}></div>
    );
};
