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
    function highlightItems(list) {
        list.forEach((item) => {
            item.plot.highlight(item.i, item.plotIndex);
        });
    }
    function makeTolltipItems(list) {
        const sorted = list.sort((a, b) =>
            parseFloat(a.value) < parseFloat(b.value) ? 1 : -1
        );

        return sorted
            ?.map(
                (template) => `
                        <div style="display:flex;justify-content:space-between">
                           <div style="display:flex;margin-right:10px;">  
                               <span style="background:${template.color};height:6px;width:24px;pading:3px;border-radius:1px;margin:4px;"></span>
                                   <p style="white-space:nowrap">${template.label}</p>
                            </div>
                            <div>
                            <p>${template.value}</p>
                            </div>
                            </div>
                            
    `
            )
            .join("");
        //console.log(mapped)
    }
    function formatDateRange(data) {
        const tsArray = data
            .map((m) => m.data.map(([t, v]) => t))
            .flat()
            .sort();
        const first = tsArray[0];
        const last = tsArray[tsArray.length - 1];
        const timeSpan = (last - first) / 1000 / 86400;

        const formatted =
            timeSpan > 1
                ? "%m/%d %H:%M"
                : timeSpan > 30
                ? "%y/%m/%d %H:%M"
                : "%H:%M:%S";
        return {
            timeformat: formatted,
            min: first,
            max: last,
        };
    }

    const options = {
        xaxis: {
            show: true,
            mode: "time",
            timezone: "local",
            timeformat: "%Y-%m-%d %H:%M:%S", // set this one on custom settings
        },
        grid: {
            show: true,
            aboveData: false,
            color: "#999",
            clickable: true,
            hoverable: true,
            autoHighlight: false,
            highlightColor: "blue",
            mouseActiveRadius: 30,
            borderWidth: 0,
            margin: { left: 0, right: 0 },
            labelMarginX: 0,
            reserveSpace: true,
        },
        legend: {
            show: false,
        },

        interaction: {
            redrawOverlayInterval: 1,
        },

        series: {
            lines: { show: true, lineWidth: 1.5, shadowSize: 0, zero: false },
            bars: { show: false, barWidth: 1000, shadowSize: 0, zero: false },
            points: { show: true, radius: 1, shadowSize: 0, zero: false },
        },
        markings: {
            clickable: true,
        },
        crosshair: { mode: "x" },

        selection: {
            mode: "x",
        },
    };

    const barSeries = {
        lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
        bars: { show: true, barWidth: 100, shadowSize: 0 },
        points: { show: true, radius: 1, shadowSize: 0 },
    };

    const lineSeries = {
        lines: { show: true, lineWidth: 1.5, shadowSize: 0 },
        bars: { show: false, barWidth: 100, shadowSize: 0 },
        points: { show: true, radius: 1, shadowSize: 0 },
    };
    const pointSeries = {
        lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
        bars: { show: false, barWidth: 100, shadowSize: 0 },
        points: { show: true, radius: 2, shadowSize: 0 },
    };

    const [chartOptions, setChartOptions] = useState(options);
    function isLAbelSelected(label) {
        const labelsSelected = JSON.parse(
            localStorage.getItem("labelsSelected")
        );
        return labelsSelected.some((l) => l.id === label.id);
    }

    $q.fn.UseTooltip = function (plot) {
        let previousPoint = null;
        $q("#tooltip").remove();
        previousPoint = null;
        $q(this).bind("plothover", function (event, pos, item) {
            let labels = ``;
            plot.unhighlight();
            if (item) {
                let plotData = plot.getData();
                const plotTime = item.datapoint[0];
                const plotValue = item.datapoint[1];

                // const notAllVisible = plotData.some( plot => !plot.isVisible)
                const selectedPlots = JSON.parse(
                    localStorage.getItem("labelsSelected")
                );

                const isSelectedPlots = selectedPlots.length > 0;
                const labelsList = [];
                for (let i = 0; i < plotData.length; i++) {
                    const plotIsVisible = isSelectedPlots
                        ? isLAbelSelected(plotData[i])
                        : true;
                    const plotTimes = plotData[i].data
                        .map((d) => d)
                        .map((e) => e[0]);
                    const plotPoints = plotData[i].data.map((d) => d);

                    if (plotTimes.includes(plotTime) && plotIsVisible) {
                        const plotIndex = plotTimes.indexOf(plotTime);

                        const [_, value] = plotPoints.find(
                            ([time, _]) => time === plotTime
                        );
                        labelsList.push({
                            color: plotData[i].color,
                            label: plotData[i].label,
                            value: parseFloat(value).toFixed(3),
                            plot,
                            plotIndex,
                            i,
                        });
                    }
                }

                highlightItems(labelsList);
                const labelsFormatted = makeTolltipItems(labelsList);
                if (previousPoint !== item.datapoint) {
                    previousPoint = item.datapoint;
                    $q("#tooltip").remove();
                    const tooltipTemplate = `
                    <div style="${"display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #666;padding:6px"}">
                    <p>${moment(item.datapoint[0]).format(
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    )}</p>
                    <p>Total: ${labelsList.length}</p>
                    <p>
                  Value: </p>
                    </div>
                   <div style="padding:3px">
                    ${labelsFormatted}
                    </div>
                    `;
                    const labelLength = item.series.label.length; // counting only this label length
                    showTooltip(
                        item.pageX,
                        item.pageY,
                        tooltipTemplate,
                        labelLength
                    );
                    // plot.highlight()
                }
            } else {
                $q("#tooltip").remove();
                previousPoint = null;
                labels = ``;
            }
        });
    };

    function showTooltip(x, y, contents, length) {
        let wWidth = window.innerWidth;
        let posX = x + 20;
        if (x * 2 > wWidth) {
            posX = x - length * 8;
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
            .fadeIn(125);
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

    /**
     *
     * Set chart types
     */

    function setBarChart() {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;

        let newData = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected")) || [];
        if (lSelected.length > 0) {
            const { lines, bars, points } = getSeriesFromChartType("bar");
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

        const chartBarSeries = {
            series: barSeries,
        };

        try {
            const { timeformat, min, max } = formatDateRange(newData);
            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    ...chartBarSeries,
                    xaxis: { timeformat, min, max },
                })
            );

            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(chartRef.current).UseTooltip(plot);
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

        let newData = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected")) || [];
        if (lSelected.length > 0) {
            const { lines, bars, points } = getSeriesFromChartType("points");
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
            const { timeformat, min, max } = formatDateRange(newData);
            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    ...chartPointsSeries,
                    xaxis: { timeformat, min, max },
                })
            );
            const colorLabels = plot.getData();
            setLabels(colorLabels);
            setChartType("points");
            $q(chartRef.current).UseTooltip(plot);
            setTypeToLocal("points");
        } catch (e) {
            console.log(e);
        }
    }
    function setLineChart() {
        const element = $q(chartRef.current);
        const data = isSpliced ? chartData : allData;

        let newData = [];
        const lSelected =
            JSON.parse(localStorage.getItem("labelsSelected")) || [];
        if (lSelected.length > 0) {
            const { lines, bars, points } = getSeriesFromChartType("line");
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

        const chartLineSeries = {
            series: lineSeries,
        };

        try {
            const { timeformat, min, max } = formatDateRange(newData);
            let plot = $q.plot(
                element,
                newData,
                $q.extend(true, {}, chartOptions, {
                    ...chartLineSeries,
                    xaxis: { timeformat, min, max },
                })
            );
            const colorLabels = plot.getData();
            setLabels(colorLabels);
            $q(element).UseTooltip(plot);
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
                        // isVisible: true
                    };
                } else {
                    return {
                        ...series,
                        bars,
                        lines,
                        points,
                        // isVisible:false
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
        const data = isSpliced ? chartData : allData;
        const element = $q(chartRef.current);

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

    function drawChart(data) {
        if (data?.length) {
            try {
                const { timeformat, min, max } = formatDateRange(data);
                let plot = $q.plot(
                    chartRef.current,
                    data,
                    $q.extend(true, {}, chartOptions, {
                        series: getSeriesFromChartType(chartType),
                        xaxis: { timeformat, min, max },
                    })
                );
                // get  generated colors
                const colorLabels = plot.getData();
                setLabels(colorLabels);
                $q(chartRef.current).UseTooltip(plot);
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
                    margin: "0px 23px",
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
                            style={{ color: "#aaa", fontSize: "13px" }}
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
                            style={{ color: "#aaa", fontSize: "13px" }}
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
                            padding: "4px 10px",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontSize: "13px",
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
                            padding: "4px 10px",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontSize: "13px",
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
                            padding: "4px 10px",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontSize: "13px",
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
