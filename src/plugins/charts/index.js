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
import { ChartLabelList } from "./ChartLabelList";

function ClokiChart({ matrixData }) {
    const APP_NAME = "cloki_view";
    const LOCAL_CHART_TYPE = `${APP_NAME}_chart_type`;
    const chartRef = useRef(null);
    const $q = window.jQuery;
    const dispatch = useDispatch();
    const [isSpliced, setIsSpliced] = useState(true);
    const [chartData, setChartData] = useState(getDataParsed(isSpliced));
    const [allData, getAllData] = useState(getDataParsed(false));
    const [labels, setLabels] = useState([]);
    const [element, setElement] = useState(chartRef.current);

    const options = {
        xaxis: {
            show: true,
            mode: "time",
            timeformat: "%H:%M:%S", // set this one on custom settings
        },
        grid: {
            show: true,
            aboveData: true,
            color: "#999",
            clickable: true,
            hoverable: true,
            autoHighlight: true,
            mouseActiveRadius: 30,
            borderWidth: 0,
        },
        legend: {
            show: false,
        },
        tooltip: {
            show: true,
            cssClass: "floatTip",
            shifts: {
                x: 10,
                y: 20,
            },
            defaultTheme: false,
            lines: true,
        },
        interaction: {
            redrawOverlayInterval: 1,
        },

        series: {
            lines: { show: true, lineWidth: 1.5, shadowSize: 0 },
            bars: { show: false, barWidth: 100, shadowSize: 0 },
            points: { show: false, radius: 2, shadowSize: 0 },
        },
        markings: {
            clickable: true,
        },

        selection: {
            mode: "x",
        },
    };

    const barSeries = {
        lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
        bars: { show: true, barWidth: 100, shadowSize: 0 },
        points: { show: false, radius: 2, shadowSize: 0 },
    };

    const lineSeries = {
        lines: { show: true, lineWidth: 1.5, shadowSize: 0 },
        bars: { show: false, barWidth: 100, shadowSize: 0 },
        points: { show: false, radius: 2, shadowSize: 0 },
    };
    const pointSeries = {
        lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
        bars: { show: false, barWidth: 100, shadowSize: 0 },
        points: { show: true, radius: 2, shadowSize: 0 },
    };

    const [chartOptions, setChartOptions] = useState(options);

    function getSeriesFromChartType(type) {
        switch (type) {
            case "bar":
                return barSeries;

            case "line":
                return lineSeries;

            case "points":
                return pointSeries;

            default:
                return lineSeries;
        }
    }

    function getTypeFromLocal() {
        return localStorage.getItem(LOCAL_CHART_TYPE);
    }

    function setTypeToLocal(type) {
        localStorage.setItem(LOCAL_CHART_TYPE, type);
    }
    const [chartType, setChartType] = useState(getTypeFromLocal() || "line");
    function formatLabel(labels) {
        return (
            "{" +
            Object.entries(labels)
                .map(([key, value]) => `${key}="${value}"`)
                .join(",") +
            "}"
        );
    }

    function formatTs(values) {
        return values.map(([ts, val]) => [ts * 1000, val]);
    }

    function getDataParsed(spliced) {
        if (spliced) {
            const chartD = [...matrixData];
            const spliced = chartD.splice(0, 20);
            return spliced.map((m) => ({
                data: formatTs(m.values),
                label: formatLabel(m.metric),
                isVisible: true,
            }));
        } else {
            return [...matrixData].map((m) => ({
                data: formatTs(m.values),
                label: formatLabel(m.metric),
                isVisible: true,
            }));
        }
    }
    function setBarChart() {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        const chartBarSeries = {
            series: barSeries,
        };

        try {
            let plot = $q.plot(
                element,
                data,
                $q.extend(true, {}, chartOptions, chartBarSeries)
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
            setChartType("bar");
            setTypeToLocal("bar");
        } catch (e) {
            console.log(e);
        }
    }
    function setPointsChart() {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        const chartPointsSeries = {
            series: pointSeries,
        };
        try {
            let plot = $q.plot(
                element,
                data,
                $q.extend(true, {}, chartOptions, chartPointsSeries)
            );
            const colorLabels = plot.getData();
            setLabels(colorLabels);
            setChartType("points");
            setTypeToLocal("points");
        } catch (e) {
            console.log(e);
        }
    }
    function setLineChart() {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        const chartLineSeries = {
            series: lineSeries,
        };
        try {
            let plot = $q.plot(
                element,
                data,
                $q.extend(true, {}, chartOptions, chartLineSeries)
            );
            const colorLabels = plot.getData();
            setLabels(colorLabels);
            setChartType("line");
            setTypeToLocal("line");
        } catch (e) {
            console.log(e);
        }
    }
    function setRanges(event, ranges) {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;
        event.preventDefault();

        try {
            let plot = $q.plot(
                element,
                data,
                $q.extend(true, {}, chartOptions, {
                    xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
                    series: getSeriesFromChartType(chartType),
                })
            );
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
                dispatch(loadLogs());
            }, 400);
        } catch (e) {
            console.log("error on chart redraw", e);
        }
    }

    function onLabelClick(e, v) {
        const dataSet = e.map((m) => {
            if (m.isVisible) {
                return {
                    ...m,
                    lines: { ...m.lines, show: false },
                    bars: { ...m.bars, show: false },
                    points: { ...m.points, show: false },
                };
            } else {
                return m;
            }
        });
        if (dataSet.length > 0 && !v.isVisible) {
            let plot = $q.plot(
                element,
                dataSet,

                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
        } else {
            const data = isSpliced ? chartData : allData;
            let plot = $q.plot(
                element,
                data,
                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
                })
            );
            const colorLabels = plot.getData();
            setLabels(colorLabels);
        }
    }

    useEffect(() => {
        setElement(chartRef.current);
        setLabels(chartData.map(({ label }) => label));
        $q(chartRef.current).bind("plotselected", setRanges);
        setChartData(getDataParsed(isSpliced));
        drawChart();
    }, []);

    useEffect(() => {
        setChartOptions(chartOptions);
        setElement(chartRef.current);
        if (isSpliced) {
            drawChart(chartData);
        } else {
            drawChart(allData);
        }
    }, [matrixData, isSpliced]);

    function drawChart(data) {
        try {
            let plot = $q.plot(
                chartRef.current,
                data,
                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
                })
            );
            // get  generated colors
            const colorLabels = plot.getData();
            setLabels(colorLabels);
        } catch (e) {
            console.log("error drawing chart", e);
        }
    }

    const handleNoLimitData = (e) => {
        setIsSpliced(false);
    };
    const handleLimitData = (e) => {
        setIsSpliced(true);
    };
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: ".95rem",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {isSpliced ? (
                        <div
                            onClick={handleNoLimitData}
                            style={{ color: "white" }}
                        >
                            {matrixData.length > 20
                                ? "Showing: 20 Series, Show All "
                                : "Showing: "}
                            {matrixData.length}
                            {" Series"}
                        </div>
                    ) : (
                        <div
                            onClick={handleLimitData}
                            style={{ color: "white" }}
                        >
                            {"Showing: "}
                            {matrixData.length}
                            {" Series, Show Only 20 Series"}
                        </div>
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <button
                        style={{
                            border: "none",
                            margin: "3px",
                            background: chartType === "bar" ? "#333" : "black",
                            color: "#ddd",
                            padding: "3px 6px",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontSize: "1em",
                        }}
                        onClick={setBarChart}
                    >
                        {"bar chart"}
                    </button>
                    <button
                        onClick={setLineChart}
                        style={{
                            border: "none",
                            margin: "3px",
                            background: chartType === "line" ? "#333" : "black",
                            color: "#ddd",
                            padding: "3px 6px",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontSize: "1em",
                        }}
                    >
                        {"line chart"}
                    </button>
                    <button
                        onClick={setPointsChart}
                        style={{
                            border: "none",
                            margin: "3px",
                            background:
                                chartType === "points" ? "#333" : "black",
                            color: "#ddd",
                            padding: "3px 6px",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontSize: "1em",
                        }}
                    >
                        {"points chart"}
                    </button>
                </div>
            </div>
            <div
                ref={chartRef}
                id={"chart-container"}
                style={{
                    width: "100%",
                    height: "220px",
                }}
            ></div>

            <ChartLabelList onLabelClick={onLabelClick} labels={labels} />
        </div>
    );
}

export default ClokiChart;
