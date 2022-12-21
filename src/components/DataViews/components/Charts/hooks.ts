import { useMemo } from "react";
import { themes } from "../../../../../theme/themes";
import { CHART_OPTIONS } from "../consts";
import { formatTs, formatLabel } from "../helpers";

export const useMatrixData = (spliced, data) => {
    return useMemo(() => {
        let parsed = [
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

export const useChartOptions = ({ tWidth }) => {
    return useMemo(() => {
        if (tWidth) {
            const chartOp = { ...CHART_OPTIONS };
            chartOp["xaxis"]["ticks"] = Math.round(tWidth / 125);
            return chartOp;
        } else {
            return CHART_OPTIONS;
        }
    }, [tWidth]);
};

export const useTheme = ( name ) => {
    return useMemo(() => themes[name], [name]);
};

export const useMatchHeight = ({ length }) => {
    return useMemo(() => {
        if (length <= 12) {
            return 150;
        } else if (length <= 20) {
            return 250;
        } else if (length <= 15) {
            return 175;
        } else if (length > 0) {
            return 450;
        }
    }, [length]);
};
