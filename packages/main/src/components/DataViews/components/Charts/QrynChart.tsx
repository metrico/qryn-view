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
import { useDispatch } from "react-redux";
//Packages
import moment from "moment";
import { format } from "date-fns";
//import   ReactFlot from "react-flot/temp";

//Global
import {
    setStartTime,
    setStopTime,
    setTimeRangeLabel,
} from "@ui/store/actions";
import getData from "@ui/store/actions/getData";

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
import { useChartOptions, useMatrixData } from "./hooks";
import { FlotChart } from "./FlotChart";
import useTheme from "@ui/theme/useTheme";
import { type QueryType } from "@ui/store/actions/types";

export type ActualQuery = {
    id: string;
    expr: string;
    dataSourceType: string;
    queryType: QueryType;
    limit: number;
    panel: any;
    isLogsVolume: boolean;
    start: any;
    stop: any;
};

export type QrynChartProps = {
    matrixData?: any;
    actualQuery?: ActualQuery;
    type?: string;
    tWidth?: any;
    vHeight?: any;
};

export default function QrynChart(props: QrynChartProps) {
    const { matrixData, actualQuery, type } = props;
    const { tWidth } = props;

    const {
        expr,
        dataSourceType,
        queryType,
        limit,
        panel,
        id,
        isLogsVolume,
        start,
        stop,
    } = actualQuery;

    const chartRef = useRef(null);

    const theme = useTheme();

    const $q = (window as any).jQuery;

    $q.fn.UseTooltip = UseTooltip;

    const matrix = useMatrixData(
        true,
        matrixData,
        isLogsVolume && type === "stream"
    );

    const dispatch: any = useDispatch();

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
        if (isLogsVolume && type === "stream") return "bar";
        let localType = getTypeFromLocal();
        return localType ?? "line"
    }, [isLogsVolume]);

    const [chartType, setChartType] = useState(getInitialChartType);

    function plotChartData(data: any, type: any, element: any) {
        let barWidth = 0;
        if (isLogsVolume && type === "stream") {
            barWidth = getBarWidth(getTimeSpan(data), tWidth);
        }

        const chartSeries = setChartTypeSeries(type, barWidth);

        const startDate = new Date(start).getTime() * 1000;

        const stopDate = new Date(stop).getTime() * 1000;

        const { timeformat, min, max } = formatDateRange(
            data,
            startDate,
            stopDate
        );

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
        const labels_selected =
            JSON.parse(localStorage.getItem("labelsSelected") || "null") || [];
        // if there are labels already selected
        if (labels_selected?.length > 0) {
            let barWidth = 0;
            if (isLogsVolume && type === "stream") {
                barWidth = getBarWidth(getTimeSpan(data), tWidth);
            }

            const { lines, bars, points } = getSeriesFromChartType(
                chartType,
                barWidth,
                isLogsVolume && type === "stream"
            );
            const ids = labels_selected?.map((m: any) => m.id);
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
            setChartData(() => dataMapped);
        } else {
          
            setChartData(() => data);
            newData = data;
        }

        try {
            //
            // const startDate = (new Date(start).getTime()) * 1000

            // const stopDate = ( new Date(stop).getTime() ) * 1000

            const { first, last } = getTimeSpan(newData);

            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    xaxis: {
                        min: Math.round(ranges.xaxis.from) - 100000,
                        max: Math.round(ranges.xaxis.to) + 100000,
                        timeformat: formatDateRange(newData, first, last)
                            .timeformat,
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

    function onLabelClick(event: any, value: any) {
        // actions on label click
        let newList = [];
        //  1- check for labels selected
        const labels_selected =
            JSON.parse(localStorage.getItem("labelsSelected") || "null") || [];

        // check if same label value whas selected

        if (labels_selected.some(({ id }: any) => id === value.id)) {
            const filtered = labels_selected.filter(
                (filtered: any) => filtered.id !== value.id
            );
            // if selected, store on localstorage
            localStorage.setItem("labelsSelected", JSON.stringify(filtered));
            // set the newList of labels as the filtered
            newList = filtered;

        } else {
            // if no labels selected, just concat new value and save in localstorage

            newList = labels_selected.concat(value);
            localStorage.setItem("labelsSelected", JSON.stringify(newList));
        }



        if (newList.length > 0) {
            const ids = newList?.map((m: any) => m.id);

            const { lines, bars, points } = getSeriesFromChartType(
                chartType,
                0
            );

            let dataSelected = event?.map((series: any) => {
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

            const startDate = new Date(start).getTime() * 1000;

            const stopDate = new Date(stop).getTime() * 1000;

            const { timeformat, min, max } = formatDateRange(
                dataSelected,
                startDate,
                stopDate
            );
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
            const startDate = new Date(start).getTime() * 1000;

            const stopDate = new Date(stop).getTime() * 1000;

            const { timeformat, min, max } = formatDateRange(
                newData,
                startDate,
                stopDate
            );

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
    }, []);

    useEffect(() => {
        setChartOptions(chartOptions);
        setElement(chartRef.current);
        drawChartFromData();
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

            const startDate = new Date(start).getTime() * 1000;

            const stopDate = new Date(stop).getTime() * 1000;

            const { timeformat, min, max } = formatDateRange(
                newData,
                startDate,
                stopDate
            );

            let { bars, lines, points, stack } = getSeriesFromChartType(
                chartType,
                barWidth,
                isLogsVolume && type === "stream"
            );
            if(min && max && timeformat) {
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
        }

          
        } catch (e) {
            console.log(e);
        }
    }

    const handleNoLimitData = () => {
        setIsSpliced(false);
    };

    const handleLimitData = () => {
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
