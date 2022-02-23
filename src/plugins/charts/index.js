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

function ClokiChart({ matrixData, chartLimit }) {
    const chartRef = useRef(null);
    const $q = window.jQuery;
    const dispatch = useDispatch();
 const query = useSelector(store => store.query)
    const [chartData, setChartData] = useState(
        getDataParsed(matrixData)(chartLimit)
    );
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
            points: { show: false, radius: 3, shadowSize: 0 },
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

    function getSplicedData(data) {
        return function (limit) {
            return data.length > limit ? data.splice(0, limit) : data;
        };
    }
    function getDataParsed(data) {
        return function (limit) {
            const spliced = getSplicedData(data)(limit);
            return spliced.map((m) => ({
                data: formatTs(m.values),
                label: formatLabel(m.metric),
                isVisible: true,
            }));
        };
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
            setTimeout(()=>{
                const fromTime = ranges.xaxis.from;
                const toTime = ranges.xaxis.to;
    
                const fromTs = new Date(
                    moment(parseInt(fromTime)).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                );
                const toTs = new Date(
                    moment(parseInt(toTime)).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                );
                const fromLabel = format(fromTs, "yyyy/MM/dd HH:mm:ss")
                const toLabel = format(toTs, "yyyy/MM/dd HH:mm:ss")
    
                const timeRangeLabel = `${fromLabel}-${toLabel}`
                dispatch(setStopTime(toTs));
                dispatch(setStartTime(fromTs));
    
                dispatch(setTimeRangeLabel(timeRangeLabel))
                dispatch(loadLogs());

            },400)
        } catch (e) {
            console.log("error on chart redraw", e);
        }
    }

    function onLabelClick (e,v){
        const dataSet = e.map(m =>{
            if(m.isVisible) {
                return {...m , 
                lines : {...m.lines, show:false},
                bars: {...m.bars, show:false},
                points: {...m.points, show:false}
                } 
            } else { return m}
        })
        if(dataSet.length > 0 && !v.isVisible) {

            let plot = $q.plot(element,dataSet,chartOptions)
          const colorLabels = plot.getData()
          setLabels(colorLabels);
        } else {

            let plot = $q.plot(element,chartData,chartOptions)
           const colorLabels = plot.getData()
            setLabels(colorLabels);
        }
       
    }
    // first chart load
    useEffect(() => {
        setElement(chartRef.current);
        setLabels(chartData.map(({ label }) => label));
        $q(chartRef.current).bind("plotselected", setRanges);
        drawChart();
    }, []);

    // detect changes on chart data
    useEffect(() => {
        setChartOptions(options);
        setChartData(getDataParsed(matrixData)(chartLimit));
        setElement(chartRef.current);
        drawChart();

        return () => {
            if (element !== null) {
                $q(element).unbind("plotselected", setRanges);


            }
        };
    }, [matrixData]);

    function drawChart() {
        let plot;
        try {
            plot = $q.plot(chartRef.current, chartData, chartOptions);
            // get  generated colors
            const colorLabels = plot.getData()
            setLabels(colorLabels);
        } catch (e) {
            console.log("error drawing chart", e);

        }
    }

    return (
        <div>
            <div
                ref={chartRef}
                id={"chart-container"}
                style={{
                    width: "100%",
                    height: "220px",
                }}
            ></div>
            <ChartLabelList
            
            onLabelClick={onLabelClick}
            labels={labels} />
        </div>
    );
}

export default ClokiChart;
