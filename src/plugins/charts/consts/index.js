const APP_NAME = "cloki_view";
export const LOCAL_CHART_TYPE = `${APP_NAME}_chart_type`;



export const CHART_OPTIONS = {
    xaxis: {
        show: true,
        mode: "time",
        timezone: "local",
        timeformat: "%Y-%m-%d %H:%M:%S",
      
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
        margin: { left: 20, right: -10 },
        minBorderMargin: 0,
        labelMarginX: 0,
        labelMarginY: 0,
        reserveSpace: false,
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
        lines: { show: true, lineWidth: 1.5, shadowSize: 0, zero: false },
        bars: {
            align: "center",
            show: false,
            barWidth: 1000,
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
};

export const CHART_BAR_SERIES = {
    lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
    bars: { show: true, barWidth: 100, shadowSize: 0 },
    points: { show: true, radius: 1, shadowSize: 0 },
};

export const CHART_LINE_SERIES = {
    lines: { show: true, lineWidth: 1.5, shadowSize: 0 },
    bars: { show: false, barWidth: 100, shadowSize: 0 },
    points: { show: true, radius: 1, shadowSize: 0 },
};
export const CHART_POINT_SERIES = {
    lines: { show: false, lineWidth: 1.5, shadowSize: 0 },
    bars: { show: false, barWidth: 100, shadowSize: 0 },
    points: { show: true, radius: 2, shadowSize: 0 },
};
