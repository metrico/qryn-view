import {
    CHART_BAR_SERIES,
    CHART_LINE_SERIES,
    CHART_POINT_SERIES,
    LOCAL_CHART_TYPE,
} from "./consts";

export function highlightItems(list: any) {
    list.forEach((item: any) => {
        item.plot.highlight(item.i, item.plotIndex);
    });
}

export function isFloat(x: number) {
    return !!(x % 1);
}

export function getSortedItems(list: any) {
    return list?.filter(
        (f: any) => parseFloat(f.value) === parseFloat(f.item.datapoint[1])
    );
}

export function getLabelTemplate(sortedList: any) {
    return sortedList
        ?.map(
            (template: any) =>
                ` <div style="display:flex;justify-content:space-between">
                           <div style="display:flex;margin-right:10px;">
                               <span style="background:${template.color};
                               height:6px;width:24px;pading:3px;
                               border-radius:1px;margin:4px;"></span> 
                               <p style="display:flex;flex-wrap:wrap;
                               line-height:1.25">${template.label}</p>
                            </div>
                        <div>
                    </div>
                </div>
    `
        )

        .join("");
}

export function makeTolltipItems(list: any) {
    const sorted = getSortedItems(list);
    return getLabelTemplate(sorted);
}

export function getItemsLength(list: any) {
    const sList = getSortedItems(list);

    if (sList?.length > 0) {
        return sList?.sort((a: any, b: any) =>
            a.label.length > b.label.length ? 0 : 1
        )[0].label.length;
    }
}

export function getTimeSpan(data: any) {
    const tsArray = data
        .map((tsItem: any) => tsItem?.data?.map(([t, v]: any) => t))
        .flat()
        .sort();
    const first = tsArray[0];
    //const last = tsArray[tsArray.length - 1] ;
    const last = tsArray[tsArray.length - 1];
    const timeDiff = last - first;

    const timeSpan = timeDiff / 1000 / 86400;

    return { first, last, timeSpan };
}

export function formatDateRange(data: any): any {
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

export function formatTs(values: any) {
    return values?.map(([ts, val]: any) => [ts * 1000, val]) || [];
}

export function getSeriesFromChartType(type: any) {
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

export function setChartTypeSeries(type: any) {
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

export function setTypeToLocal(type: any) {
    localStorage.setItem(LOCAL_CHART_TYPE, type);
}

export function formatLabel(labels: any) {
    if (labels) {
        return (
            "{ " +
            Object.entries(labels)
                .map(([key, value]) => `${key}="${value}"`)
                .join(", ") +
            " }"
        );
    } else return "";
}

export function hideSeries(series: any) {
    return {
        ...series,
        lines: { ...series.lines, show: false },
        bars: { ...series.bars, show: false },
        points: { ...series.points, show: false },
        isVisible: false,
    };
}
export function showSeries(series: any, type: any) {
    const { lines, bars, points } = getSeriesFromChartType(type);

    return {
        ...series,
        bars,
        lines,
        points,
        isVisible: true,
    };
}

export function mapIds(arr: any) {
    return arr?.map((m: any) => m.id);
}

export function getLabelsSelected() {
    return JSON.parse(localStorage.getItem("labelsSelected") || 'null') || [];
}

export function isLAbelSelected(label: any) {
    const labelsSelected = JSON.parse(localStorage.getItem("labelsSelected") || 'null');
    return labelsSelected.some((l: any) => l.id === label.id);
}

export function getNewData(data: any, type: any) {
    const lSelected = getLabelsSelected();

    if (lSelected.length > 0) {
        const ids = mapIds(lSelected);

        const dataMapped = data?.map((series: any) => {
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

export function yAxisTickFormatter(val: any, axis: any) {
    const floatNum = (val: any, suffix: string) => {
        let num = 0;
        if (suffix === "M") {
            num = 1_000_000;
        }

        if (suffix === "K") {
            num = 1_000;
        }

        if (val % num === 0) {
            return 0;
        }
        return 1;
    };

    if (val > 999999) {
        return (val / 1000000).toFixed(floatNum(val, "M")) + " M";
    }

    if (val > 999) {
        return (val / 1000).toFixed(floatNum(val, "K")) + " K";
    }

    return val.toFixed(axis.tickDecimals);
}
