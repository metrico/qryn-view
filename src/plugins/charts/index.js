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
import { nanoid } from "nanoid";

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
    // set it to local storage

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
        points: { show: true, radius: 0, shadowSize: 0 },
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

    $q.fn.UseTooltip = function () {
        let previousPoint = null;

        $q(this).bind("plothover", function (event, pos, item) {
            if (item) {
                if (previousPoint !== item.dataIndex) {
                    $q("#tooltip").remove();
                    const tooltipTemplate = `
                    <div style="${"display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #666;padding:6px"}">
                    <p>${moment(item.datapoint[0]).format(
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    )}</p>
                    <p>
                  Value: ${item.datapoint[1]}</p>
                    </div>
                   <div style="padding:3px">
                    <p style="display:flex;align-items:center">
                    <span style="background:${
                        item.series.color
                    };height:6px;width:24px;pading:3px;border-radius:1px;margin:4px" ></span>
                    ${item.series.label}</p>
                    </div>
                    `;
                    const labelLength = item.series.label.length;
                    showTooltip(
                        item.pageX,
                        item.pageY,
                        tooltipTemplate,
                        labelLength
                    );
                }
            } else {
                $q("#tooltip").remove();
                previousPoint = null;
            }
        });
    };

    function showTooltip(x, y, contents, length) {
        let wWidth = window.innerWidth;
        let posX = x + 20;
        if (x * 2 > wWidth) {
            posX = x - length * 6 - 28;
        }
        $q(`<div id="tooltip">` + contents + `</div>`)
            .css({
                position: "absolute",
                display: "none",
                top: y,
                left: posX,
                padding: "6px",
                "font-size": "12px",
                size: "10",
                "border-radius": "6px 6px 6px 6px",
                "background-color": "#333",
                color: "#aaa",
            })
            .appendTo("body")
            .fadeIn(200);
    }

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
                id: nanoid(),
            }));
        } else {
            return [...matrixData].map((m) => ({
                data: formatTs(m.values),
                label: formatLabel(m.metric),
                isVisible: true,
                id: nanoid(),
            }));
        }
    }
    /**
     *
     * Set chart types
     */
    function setBarChart() {

        const lSelected = JSON.parse(localStorage.getItem("labelsSelected")) || [];



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
            console.log(data, e);
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
        const labelsSelected = (localStorage.getItem("labelsSelected"))||[]


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
    /**
     *
     *  Chart from selection (Set start and end times and redraw)
     */
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
    /**
     *
     *Isolate Series clicking label
     */

    function onLabelClick(e, v) {


        let newList = [];
        const lSelected = JSON.parse(localStorage.getItem("labelsSelected")) || [];
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
         
            let plot = $q.plot(
                element,
                dataSelected,

                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);

        } else {
            console.log("inhere!!!!!");
            const data = isSpliced ? chartData : allData;
            const { lines, bars, points } = getSeriesFromChartType(chartType);
            const newData = data.map((series) => {
                console.log(series.bars);
                return {
                    ...series,
                    bars,
                    lines,
                    points,
                };
            });
            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    series: getSeriesFromChartType(chartType),
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
        }
    }

    // Init
    useEffect(() => {
        setElement(chartRef.current);
        setLabels(chartData.map(({ label }) => label));
        $q(chartRef.current).bind("plotselected", setRanges);
        setChartData(getDataParsed(isSpliced));
        localStorage.setItem("labelsSelected", JSON.stringify([]));
    }, []);

    // On data update or splicing / showing all data
    useEffect(() => {
        setChartOptions(chartOptions);
        setElement(chartRef.current);

        drawChartFromData();
    }, [matrixData, isSpliced]);

    function drawChartFromData() {
        if (isSpliced) {
            drawChart(chartData);
        } else {
            drawChart(allData);
        }
    }

    function drawChart(data) {
        if (data?.length) {
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
                $q(chartRef.current).UseTooltip();
            } catch (e) {
                console.log("error drawing chart", data);
            }
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
