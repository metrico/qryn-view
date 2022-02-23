import "./jquery-loader";
import ReactFlot from "react-flot";
import "react-flot/flot/jquery.flot.time.min";
import "react-flot/flot/jquery.flot.selection.min";
import "react-flot/flot/jquery.flot.crosshair.min";
import loadLogs from "../../actions/loadLogs";
import { useDispatch, useSelector } from "react-redux";
import { setStartTime, setStopTime, setTimeRangeLabel } from "../../actions";
import * as moment from "moment";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ChartLabelList } from "./ChartLabelList";
function ClokiChart({ matrixData }) {
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

    const [chartOptions, setChartOptions] = useState(options);

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

    function setRanges(event, ranges) {
        const element = $q(chartRef.current);
        event.preventDefault();

        try {
            let plot = $q.plot(
                element,
                chartData,
                $q.extend(true, {}, options, {
                    xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
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
            let plot = $q.plot(element, dataSet, chartOptions);
            const colorLabels = plot.getData();
            setLabels(colorLabels);
        } else {
            const data = isSpliced ? chartData : allData;
            let plot = $q.plot(element, data, chartOptions);
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
        setChartOptions(options);
        setElement(chartRef.current);
        if (isSpliced) {
            drawChart(chartData);
        } else {
            drawChart(allData);
        }
    }, [matrixData, isSpliced]);


    function drawChart(data) {
        try {
            let plot = $q.plot(chartRef.current, data, chartOptions);
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
            <div style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                fontSize:'.95rem',
                cursor:'pointer'
            }}>
                {isSpliced ? (
                    <div onClick={handleNoLimitData} style={{ color: "white" }}>
                     
                        {"Showing: 20 Series, Show All "}{matrixData.length}{" Series"}
                        
                    </div>
                ) : (
                    <div onClick={handleLimitData} style={{ color: "white" }}>
                       
                       {"Showing: "}{matrixData.length}{" Series, Show Only 20 Series"}
                    </div>
                )}
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
