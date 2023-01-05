import { ThemeProvider } from "@emotion/react";
import {useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";
import { useValuesFromMetrics } from "./useValuesFromMetrics";
import { MetricsLabelValueSelectors } from "../QueryBuilder/MetricsLabelValueSelector";
import { InputSelect } from "../QueryBuilder/InputSelect";


export default function MetricsSearch(props: any) {
    const {
        handleMetricValueChange,
        data: { dataSourceId, hasStats },
        searchButton,
        logsRateButton,
        statsSwitch,
    } = props;
    // get the options for metrics selector
    const metricsOpts = useValuesFromMetrics(dataSourceId);

    const [metricValue, setMetricValue] = useState(
        metricsOpts[0] || { label: "", value: "" }
    );

    const [labelFilters, setLabelFilters] = useState([] as any); // check label filters
    //  this one  should go upstairs and be stored as default value
    
    const storeTheme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );

    const mainTheme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);

    const onMetricChange = (e: any) => {
        const { value } = e;
        setMetricValue((prev: any) => {
            return { value: value?.value, label: value?.value };
        });
    };

    const handleMetricChange = (e: any) => {
        handleMetricValueChange(e);
    };
    const onLabelValueChange = (e: any) => {
        setLabelFilters((prev: any) => {
            if (prev?.length > 0) {
                if (prev?.some((s: any) => s.id === e.id)) {
                    return prev.map((labelFilter: any) => {
                        if (labelFilter.label === e.label) {
                            return { ...e };
                        }
                        return labelFilter;
                    });
                }
            }
            return [e];
        });
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div style={{ marginTop: "3px" }}>
                    <InputSelect
                        isMulti={false}
                        type={"metric"}
                        defaultValue={"Select Metric..."}
                        selectOpts={metricsOpts}
                        mainTheme={mainTheme}
                        onChange={onMetricChange}
                        minWidth={250}
                        labelValuesLength={0}
                    />
                </div>
                <MetricsLabelValueSelectors
                    onChange={onLabelValueChange}
                    dataSourceId={dataSourceId}
                    value={metricValue.value}
                    metricValueChange={handleMetricChange}
                />
            </div>
            <div style={{ display: "flex", margin: "10px 0px" }}>
                {searchButton}
                {logsRateButton}
                {hasStats && statsSwitch}
            </div>
        </ThemeProvider>
    );
}
