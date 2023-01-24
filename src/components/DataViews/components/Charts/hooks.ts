import { useMemo } from "react";
import { themes } from "../../../../../theme/themes";
import { CHART_OPTIONS } from "../consts";
import { formatTs, formatLabel, getLabelsFromLocal } from "../helpers";

export const useMatrixData = (spliced: any, data: any) => {
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
            parsed = [...data]?.map((m) => ({
                data: formatTs(m?.values),
                label: formatLabel(m?.metric),
                isVisible: true,
                shadowSize: 0,
                id: m.id,
            }));

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

export const useChartOptions = ({ tWidth }: { tWidth: number }) => {
    return useMemo(() => {
        if (tWidth) {
            const chartOp: any = { ...CHART_OPTIONS };
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