import { useMemo } from "react";
import { themes } from "../../../../../theme/themes";
import { CHART_OPTIONS } from "../consts";
import { getLabelsFromLocal } from "../helpers";

import { formatTs, formatLabel } from "../helpers";

export const TAGS_LEVEL: any = {
    critical: ["emerg", "fatal", "alert", "crit", "critical"],
    error: ["err", "eror", "error"],
    warning: ["warn", "warning"],
    info: ["info", "information", "notice"],
    debug: ["dbug", "debug"],
    trace: ["trace"],
};
export const LEVEL_COLORS: any = {
    critical: "purple",
    error: "red",
    warning: "orange",
    info: "green",
    debug: "blue",
    trace: "lightblue",
    unknown: "gray",
};

export const getColorByLevel = (level: any) => {
 return LEVEL_COLORS[level[0]] || 'gray'
};

export const useMatrixData = (
    spliced: any,
    data: any,
    isLogsVolume?: boolean
) => {
    return useMemo(() => {
        let parsed: any = [
            {
                data: [],
                label: [],
                isVisible: true,
                shadowSize: 0,
                id: "",
            },
        ];

        if (data?.length > 0) {

            parsed = [...data]?.map((m) => {
                let DataPoint:any =  {
                    data: formatTs(m?.values),
                    label: formatLabel(m?.metric, isLogsVolume, data.length),
                    isVisible: true,
                    shadowSize: 0,
                    id: m.id,
                }

                if(isLogsVolume) {
                    let color = getColorByLevel(formatLabel(m?.metric, isLogsVolume, data.length) || "");
                    DataPoint.color = color
                }

                return DataPoint
            });

            if (spliced) {
                const splicedData = parsed?.splice(0, 20);
                return splicedData;
            } else {
                return parsed;
            }
        }
        return parsed;
    }, [spliced, data]);
};

export const useChartOptions = ({ tWidth }: { tWidth: number },isLogsVolume=false) => {
    return useMemo(() => {
        if (tWidth) {
            const chartOp: any = { ...CHART_OPTIONS(isLogsVolume) };
            chartOp["xaxis"]["ticks"] = Math.round(tWidth / 125);
            return chartOp;
        } else {
            return CHART_OPTIONS;
        }
    }, [tWidth]);
};

export const useTheme = (name: "dark" | "light") => {
    return useMemo(() => themes[name], [name]);
};

export const useMatchHeight = ({ length }: { length: number }) => {
    return useMemo(() => {
        if (length <= 12) {
            return 140;
        } else if (length <= 20) {
            return 240;
        } else if (length <= 15) {
            return 165;
        } else if (length > 0) {
            return 440;
        }
    }, [length]);
};

export function useLabelList() {
    return useMemo(() => {
        return getLabelsFromLocal();
    }, []);
}
