import {
    CHART_BAR_SERIES,
    CHART_LINE_SERIES,
    CHART_POINT_SERIES,
    LOCAL_CHART_TYPE,
} from "../consts";

export function highlightItems(list) {
    list.forEach((item) => {
        item.plot.highlight(item.i, item.plotIndex);
    });
}

export function isFloat(x) {
    return !!(x % 1);
}

export function makeTolltipItems(list) {
    const sorted = list.filter(
        (f) => parseFloat(f.value) === parseFloat(f.item.datapoint[1])
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
                 
                        </div>
                        </div>
                        
`
        )
        .join("");
}

export function getTimeSpan(data) {
    const tsArray = data
        .map((tsItem) => tsItem?.data?.map(([t, v]) => t))
        .flat()
        .sort();
    const first = tsArray[0];
    //const last = tsArray[tsArray.length - 1] ;
    const last = tsArray[tsArray.length - 1];

    const timeSpan = (last - first) / 1000 / 86400;

    return { first, last, timeSpan };
}

export function formatDateRange(data) {
    const { timeSpan, first, last } = getTimeSpan(data);

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

export function formatTs(values) {
    return values.map(([ts, val]) => [ts * 1000, val]);
}

export function getSeriesFromChartType(type) {
    switch (type) {
        case "bar":
            return CHART_BAR_SERIES;

        case "line":
            return CHART_LINE_SERIES;

        case "points":
            return CHART_POINT_SERIES;

        default:
            return CHART_LINE_SERIES;
    }
}

export function setChartTypeSeries(type) {
    switch (type) {
        case "bar":
            return { series: CHART_BAR_SERIES };

        case "line":
            return { series: CHART_LINE_SERIES };

        case "points":
            return { series: CHART_POINT_SERIES };

        default:
            return { series: CHART_LINE_SERIES };
    }
}

export function getTypeFromLocal() {
    return localStorage.getItem(LOCAL_CHART_TYPE);
}

export function setTypeToLocal(type) {
    localStorage.setItem(LOCAL_CHART_TYPE, type);
}

export function formatLabel(labels) {
    return (
        "{" +
        Object.entries(labels)
            .map(([key, value]) => `${key}="${value}"`)
            .join(",") +
        "}"
    );
}

export function hideSeries(series) {
    return {
        ...series,
        lines: { ...series.lines, show: false },
        bars: { ...series.bars, show: false },
        points: { ...series.points, show: false },
        isVisible: false,
    };
}
export function showSeries(series, type) {
    const { lines, bars, points } = getSeriesFromChartType(type);

    return {
        ...series,
        bars,
        lines,
        points,
        isVisible: true,
    };
}

export function mapIds(arr) {
    return arr?.map((m) => m.id);
}

export function getLabelsSelected() {
    return JSON.parse(localStorage.getItem("labelsSelected")) || [];
}

export function isLAbelSelected(label) {
    const labelsSelected = JSON.parse(localStorage.getItem("labelsSelected"));
    return labelsSelected.some((l) => l.id === label.id);
}

export function getNewData(data, type) {
    const lSelected = getLabelsSelected();

    if (lSelected.length > 0) {
        const ids = mapIds(lSelected);

        const dataMapped = data?.map((series) => {
            if (!ids?.includes(series.id)) {
                return hideSeries(series);
            } else {
                return showSeries(series, type);
            }
        });
        return dataMapped;
    } else {
        return data;
    }
}
