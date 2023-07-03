import { yAxisTickFormatter } from "./helpers";

const APP_NAME = "qryn_view";
export const LOCAL_CHART_TYPE = `${APP_NAME}_chart_type`;

export const CHART_OPTIONS = (isLogsVolume = false) => ({
    xaxis: {
        show: true,
        mode: "time",
        timezone: "local",
        timeformat: "%Y-%m-%d %H:%M:%S",
        reserveSpace: false,
        shadowSize: 0,
    },
    yaxis: {
        tickFormatter: yAxisTickFormatter,
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
        minBorderMargin: 0,
        labelMarginX: 0,
        labelMarginY: 0,
        shadowSize: 0,
        margin: { left: 5, right: 5 },
    },
    legend: {
        noColumns: 0,
        position: "nw",
        show: false,
    },

    interaction: {
        redrawOverlayInterval: 1,
    },

    series: {
        stack: isLogsVolume,
        lines: { show: true, lineWidth: 1.5, shadowSize: 0, zero: false },
        bars: {
            align: "center",
            show: false,
            barWidth: 5000,
            shadowSize: 0,
            zero: false,
        },
        points: { show: true, radius: 1, shadowSize: 0, zero: false },
    },
    markings: {
        clickable: false,
    },
    crosshair: { color: "#88888855", mode: "xy", linewidth: 1 },

    selection: {
        mode: "x",
    },
});
// pass the bar width
// calculate here the span width

export const CHART_BAR_SERIES = (barWidth=0, isLogsVolume = false) => ({
    stack: isLogsVolume,
    lines: {
        show: false,
        lineWidth: 1.5,
        shadowSize: 0,
        fill: isLogsVolume,
    },
    bars: {
        show: true,
        barWidth: barWidth !== 0 ? barWidth : 5000,
        shadowSize: 0,
    },
    points: { show: true, radius: 0.25, shadowSize: 0 },
});

export const CHART_LINE_SERIES = (isLogsVolume = false) => ({
    stack: isLogsVolume,
    lines: {
        show: true,
        lineWidth: 1,
        shadowSize: 0,
        stack: isLogsVolume,
        fill: isLogsVolume,
    },
    bars: { show: false, barWidth: 0, shadowSize: 0 },
    points: { show: false, radius: 1, shadowSize: 0 },
});

export const CHART_POINT_SERIES = (isLogsVolume = false) => ({
    stack: isLogsVolume,
    lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
    bars: { show: false, barWidth: 0, shadowSize: 0 },
    points: { show: true, radius: 2, shadowSize: 0 },
});
