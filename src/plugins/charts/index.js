import "./jquery-loader";
import ReactFlot from "react-flot";
import "react-flot/flot/jquery.flot.time.min";
import "react-flot/flot/jquery.flot.selection.min";
import "react-flot/flot/jquery.flot.crosshair.min";
import loadLogs from "../../actions/loadLogs";
import { useDispatch } from "react-redux";
import { setStartTime, setStopTime, setTimeRangeLabel } from "../../actions";
import * as moment from "moment";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import ChartTools from "./ChartTools";
import ChartLabelsList from "./ChartLabelList";
import {
    getTypeFromLocal,
    formatTs,
    getSeriesFromChartType,
    setChartTypeSeries,
    setTypeToLocal,
    formatDateRange,
    formatLabel,
    getNewData,
} from "./helpers";
import UseTooltip from "./UseTooltip";
import { CHART_OPTIONS } from "./consts";

export default function ClokiChart(props) {


    const {matrixData, actualQuery} = props

    const {expr, queryType, limit, panel, id} = actualQuery

    const chartRef = useRef(null);

    const $q = window.jQuery;
    $q.fn.UseTooltip = UseTooltip;

    const dispatch = useDispatch();
    const [isSpliced, setIsSpliced] = useState(true);
    const [chartData, setChartData] = useState(getDataParsed(isSpliced));
    const [allData] = useState(getDataParsed(false));
    const [labels, setLabels] = useState([]);
    const [element, setElement] = useState(chartRef.current);

    const [chartOptions, setChartOptions] = useState(CHART_OPTIONS);

    const [chartType, setChartType] = useState(getTypeFromLocal() || "line");

    function getDataParsed(spliced) {
        const parsed = [...matrixData].map((m) => ({
            data: formatTs(m.values),
            label: formatLabel(m.metric),
            isVisible: true,
            id: m.id,
        }));

        if (spliced) {
            const splicedData = parsed.splice(0, 20);
            return splicedData;
        } else {
            return parsed;
        }
    }

    function plotChartData(data, type, element) {
        const chartSeries = setChartTypeSeries(type);
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

    function onSetChartType(type) {
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

    function setRanges(event, ranges) {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        event.preventDefault();

        let newData = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected")) || [];
        if (lSelected.length > 0) {
            const { lines, bars, points } = getSeriesFromChartType(chartType);
            const ids = lSelected.map((m) => m.id);
            const dataMapped = data.map((series) => {
                if (!ids.includes(series.id)) {
                    return {
                        ...series,
                        lines: { ...series.lines, show: false },
                        bars: { ...series.bars, show: false },
                        points: { ...series.points, show: false },
                        isVisible: false,
                    };
                } else {
                    return {
                        ...series,
                        bars,
                        lines,
                        points,
                        isVisible: true,
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
                        timeformat: formatDateRange(newData).timerange,
                    },
                })
            );

            $q(chartRef.current).UseTooltip(plot);
            setTimeout(() => {
                const fromTime = ranges.xaxis.from;
                const toTime = ranges.xaxis.to;

                const fromTs = new Date(
                    moment(parseInt(fromTime)).format(
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    )
                );
                const toTs = new Date(
                    moment(parseInt(toTime)).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                );
                const fromLabel = format(fromTs, "yyyy/MM/dd HH:mm:ss");
                const toLabel = format(toTs, "yyyy/MM/dd HH:mm:ss");

                const timeRangeLabel = `${fromLabel}-${toLabel}`;

                dispatch(setStopTime(toTs));
                dispatch(setStartTime(fromTs));

                dispatch(setTimeRangeLabel(timeRangeLabel));

                dispatch(loadLogs(expr, queryType, limit, panel, id));
            }, 400);
        } catch (e) {
            console.log("error on chart redraw", e);
        }
    }

    function onLabelClick(e, v) {
        let newList = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected")) || [];

        if (lSelected.some(({ id }) => id === v.id)) {
            const filtered = lSelected.filter((f) => f.id !== v.id);
            localStorage.setItem("labelsSelected", JSON.stringify(filtered));
            newList = filtered;
        } else {
            newList = lSelected.concat(v);
            localStorage.setItem("labelsSelected", JSON.stringify(newList));
        }

        if (newList.length > 0) {
            const ids = newList.map((m) => m.id);
            const { lines, bars, points } = getSeriesFromChartType(chartType);
            let dataSelected = e.map((series) => {
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
                        bars,
                        lines,
                        points,
                    };
                }
            });
            const { timeformat, min, max } = formatDateRange(dataSelected);

            let plot = $q.plot(
                element,
                dataSelected,

                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
                    xaxis: { timeformat, min, max },
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(chartRef.current).UseTooltip(plot);
        } else {
            const data = isSpliced ? chartData : allData;
            const { lines, bars, points } = getSeriesFromChartType(chartType);
            const newData = data.map((series) => {
                return {
                    ...series,
                    bars,
                    lines,
                    points,
                    isVisible: true,
                };
            });
            const { timeformat, min, max } = formatDateRange(newData);

            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
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
        setLabels(chartData.map(({ label }) => label));
        $q(chartRef.current).bind("plotselected", setRanges);
        setChartData(getDataParsed(isSpliced));
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
        let newData = getNewData(data);
        try {
            const { timeformat, min, max } = formatDateRange(newData);
            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
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

    const handleNoLimitData = (e) => {
        setIsSpliced(false);
    };

    const handleLimitData = (e) => {
        setIsSpliced(true);
    };

    return (
        <div style={{height:'inherit'}}>
            <ChartTools
                matrixData={matrixData}
                chartType={chartType}
                handleNoLimitData={handleNoLimitData}
                handleLimitData={handleLimitData}
                isSpliced={isSpliced}
                onSetChartType={onSetChartType}
            />

            <div
                ref={chartRef}
                id={"chart-container"}
                style={{
                    width: "100%",
                    height: "220px",
                    display: "block",
                    position: "relative",
                }}
            ></div>

            <ChartLabelsList onLabelClick={onLabelClick} labels={labels} />
        </div>
    );
}
