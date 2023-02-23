//Flot
import "./jquery-loader";
// import ReactFlot from "react-flot";
import "react-flot/flot/jquery.flot.min";
import "react-flot/flot/jquery.flot.time.min";
import "react-flot/flot/jquery.flot.selection.min";
import "react-flot/flot/jquery.flot.crosshair.min";
import "react-flot/flot-override/jquery.flot.resize";
import "react-flot/flot/jquery.flot.stack.min.js";
//React
import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
//Packages
import * as moment from "moment";
import { format } from "date-fns";
//import   ReactFlot from "react-flot/temp";

//Global
import {
    setStartTime,
    setStopTime,
    setTimeRangeLabel,
} from "../../../../actions";
import getData from "../../../../actions/getData";

import {
    getTypeFromLocal,
    getSeriesFromChartType,
    setChartTypeSeries,
    setTypeToLocal,
    formatDateRange,
    getNewData,
    getBarWidth,
    getTimeSpan,
} from "./helpers";
import UseTooltip from "./UseTooltip";
import { useChartOptions, useMatrixData, useTheme } from "./hooks";
import { FlotChart } from "./FlotChart";

export default function QrynChart(props: any): any {
    const { matrixData, actualQuery, type } = props;
    const { tWidth } = props;

    const { expr, dataSourceType, queryType, limit, panel, id, isLogsVolume } =
        actualQuery;

    const chartRef = useRef(null);
    const storeTheme = useSelector(({ theme }: any) => theme);

    const theme = useTheme(storeTheme);

    const $q = (window as any).jQuery;

    $q.fn.UseTooltip = UseTooltip;

    const matrix = useMatrixData(
        true,
        matrixData,
        isLogsVolume && type === "stream"
    );
    const dispatch = useDispatch();

    const [isSpliced, setIsSpliced] = useState(true);
    const [chartData, setChartData] = useState(matrix);

    const [allData] = useState(
        useMatrixData(false, matrixData, isLogsVolume && type === "stream")
    );
    const [labels, setLabels] = useState([]);
    const [element, setElement] = useState(chartRef.current);

    const chartOpts = useChartOptions(
        { tWidth },
        (isLogsVolume && type === "stream") || false
    );

    const [chartOptions, setChartOptions] = useState(chartOpts);

    const getInitialChartType = useMemo(() => {
        let localType = getTypeFromLocal();
        if (isLogsVolume && type === "stream") {
            return "bar";
        } else {
            if (localType !== "") {
                return localType;
            } else {
                return "line";
            }
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogsVolume]);

    const [chartType, setChartType] = useState(getInitialChartType);

    function plotChartData(data: any, type: any, element: any) {
        let barWidth = 0;
        if (isLogsVolume && type === "stream") {
            barWidth = getBarWidth(getTimeSpan(data), tWidth);
        }

        const chartSeries = setChartTypeSeries(type, barWidth);
        const { timeformat, min, max } = formatDateRange(data);
        return $q.plot(
            element,
            data,
            $q.extend(true, {}, chartOptions, {
                ...chartSeries,
                xaxis: { timeformat, min, max },
            })
        );
    }

    function onSetChartType(type: any) {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        const newData = getNewData(data, type);

        try {
            let plot = plotChartData(newData, type, element);
            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(chartRef.current).UseTooltip(plot);
            setChartType(type);
            setTypeToLocal(type);
        } catch (e) {
            console.log(data, e);
        }
    }

    function setRanges(event: any, ranges: any) {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        event.preventDefault();

        let newData = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected") || "null") || [];
        if (lSelected?.length > 0) {
            let barWidth = 0;
            if (isLogsVolume && type === "stream") {
                barWidth = getBarWidth(getTimeSpan(data), tWidth);
            }

            const { lines, bars, points } = getSeriesFromChartType(
                chartType,
                barWidth,
                isLogsVolume && type === "stream"
            );
            const ids = lSelected?.map((m: any) => m.id);
            const dataMapped = data?.map((series: any) => {
                if (!ids.includes(series.id)) {
                    return {
                        ...series,
                        lines: { ...series.lines, show: false },
                        bars: { ...series.bars, show: false },
                        points: { ...series.points, show: false },
                        isVisible: false,
                        shadowSize: 0,
                    };
                } else {
                    return {
                        ...series,
                        stack: isLogsVolume && type === "stream",
                        bars,
                        lines,
                        points,
                        isVisible: true,
                        shadowSize: 0,
                    };
                }
            });
            newData = dataMapped;
        } else {
            newData = data;
        }

        try {
            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    xaxis: {
                        min: ranges.xaxis.from - 100000,
                        max: ranges.xaxis.to + 100000,
                        timeformat: formatDateRange(newData).timeformat,
                    },
                })
            );

            $q(chartRef.current).UseTooltip(plot);
            setTimeout(() => {
                const fromTime = ranges.xaxis.from;
                const toTime = ranges.xaxis.to;

                const fromTs = new Date(
                    (moment as any)(parseInt(fromTime)).format(
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    )
                );
                const toTs = new Date(
                    (moment as any)(parseInt(toTime)).format(
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    )
                );
                const fromLabel = format(fromTs, "yyyy/MM/dd HH:mm:ss");
                const toLabel = format(toTs, "yyyy/MM/dd HH:mm:ss");

                const timeRangeLabel = `${fromLabel}-${toLabel}`;

                dispatch(setStopTime(toTs));
                dispatch(setStartTime(fromTs));

                dispatch(setTimeRangeLabel(timeRangeLabel));

                dispatch(
                    getData(dataSourceType, expr, queryType, limit, panel, id)
                );
            }, 400);
        } catch (e) {
            console.log("error on chart redraw", e);
        }
    }

    function onLabelClick(e: any, v: any) {
        let newList = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected") || "null") || [];

        if (lSelected.some(({ id }: any) => id === v.id)) {
            const filtered = lSelected.filter((f: any) => f.id !== v.id);
            localStorage.setItem("labelsSelected", JSON.stringify(filtered));
            newList = filtered;
        } else {
            newList = lSelected.concat(v);
            localStorage.setItem("labelsSelected", JSON.stringify(newList));
        }

        if (newList.length > 0) {
            const ids = newList?.map((m: any) => m.id);

            const { lines, bars, points } = getSeriesFromChartType(
                chartType,
                0
            );
            let dataSelected = e?.map((series: any) => {
                if (!ids.includes(series.id)) {
                    return {
                        ...series,
                        lines: { ...series.lines, show: false },
                        bars: { ...series.bars, show: false },
                        points: { ...series.points, show: false },
                    };
                } else {
                    return {
                        ...series,
                        stack: isLogsVolume && type === "stream",
                        bars,
                        lines,
                        points,
                    };
                }
            });

            const { timeformat, min, max } = formatDateRange(dataSelected);
            let barWidth = 0;
            if (isLogsVolume && type === "stream") {
                barWidth = getBarWidth(getTimeSpan(dataSelected), tWidth);
            }

            let plot = $q.plot(
                element,
                dataSelected,

                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType, barWidth),
                    xaxis: { timeformat, min, max },
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(chartRef.current).UseTooltip(plot);
        } else {
            const data = isSpliced ? chartData : allData;
            let barWidth = 0;
            if (isLogsVolume && type === "stream") {
                barWidth = getBarWidth(getTimeSpan(data), tWidth);
            }

            const { lines, bars, points } = getSeriesFromChartType(
                chartType,
                barWidth
            );

            const newData = data?.map((series: any) => {
                return {
                    ...series,
                    bars,
                    lines,
                    points,
                    isVisible: true,
                    shadowSize: 0,
                };
            });
            const { timeformat, min, max } = formatDateRange(newData);

            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(
                        chartType,
                        barWidth || 0,
                        isLogsVolume && type === "stream"
                    ),
                    xaxis: { timeformat, min, max },
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(chartRef.current).UseTooltip(plot);
        }
    }

    useEffect(() => {
        setElement(chartRef.current);
        setLabels(chartData?.map(({ label }: any) => label) as any);
        $q(chartRef.current).bind("plotselected", setRanges);
        //setChartData(getDataParsed(isSpliced));
        setChartData(matrix);
        localStorage.setItem("labelsSelected", JSON.stringify([]));
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setChartOptions(chartOptions);
        setElement(chartRef.current);
        drawChartFromData();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matrixData, isSpliced]);

    function drawChartFromData() {
        const data = isSpliced ? chartData : allData;
        const element = $q(chartRef.current);
        let newData = getNewData(data, null);

        try {
            let barWidth = 0;
            if (isLogsVolume && type === "stream") {
                barWidth = getBarWidth(getTimeSpan(newData), tWidth);
            }

            const { timeformat, min, max } = formatDateRange(newData);

            let { bars, lines, points, stack } = getSeriesFromChartType(
                chartType,
                barWidth,
                isLogsVolume && type === "stream"
            );

            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    series: { stack, bars, lines, points },
                    xaxis: { timeformat, min, max },
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(chartRef.current).UseTooltip(plot);
        } catch (e) {
            console.log(e);
        }
    }

    const handleNoLimitData = (e: any) => {
        setIsSpliced(false);
    };

    const handleLimitData = (e: any) => {
        setIsSpliced(true);
    };

    if (matrixData) {
        const flotChartProps: any = {
            height: props.vHeight,
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
            isLogsVolume: isLogsVolume && type === "stream",
        };
        const pointSet = new Set();
        matrixData.forEach((dataPoint: any) => {
            dataPoint?.values?.forEach((dataPointValue: any) =>
                pointSet.add(dataPointValue?.[0])
            );
        });
        if (pointSet.size === 1 && chartType !== "bar") {
            onSetChartType("bar");
        }

        return <FlotChart {...flotChartProps} />;
    }

    return null;
}
