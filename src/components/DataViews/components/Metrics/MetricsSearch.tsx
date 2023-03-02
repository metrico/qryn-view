import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useTheme } from "../QueryBuilder/hooks";
import { useValuesFromMetrics } from "./useValuesFromMetrics";
import { cx } from "@emotion/css";
import { MetricsFormBuilder } from "../QueryBuilder/MetricsFormBuilder";
import { FlexWrap } from "../QueryBuilder/styles";
export default function MetricsSearch(props: any) {
    
    const {
        handleMetricValueChange, // goes to process AT query bar
        data: { dataSourceId },
    } = props;

    const metricsOpts = useValuesFromMetrics(dataSourceId);

    const [metricValue, setMetricValue] = useState(
        metricsOpts[0] || { label: "", value: "" }
    );

    const onMetricChange = (e: any) => {
        const { value } = e;

        setMetricValue((prev: any) => {
            return { value: value?.value, label: value?.value };
        });
    };

    const handleMetricChange = (e: any) => {
        handleMetricValueChange(e);
    };

    const onLabelValueChange = (e: any) => {};

    /*
        return (
            <ThemeProvider theme={mainTheme}>{
                <div
                    className={cx(MetricsContStyle)}
                >
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
                        type={dataSourceType}
                        onChange={onLabelValueChange}
                        dataSourceId={dataSourceId}
                        value={metricValue.value}
                        metricValueChange={handleMetricChange}
                    />
                </div>
                <div className={cx(MetricsButtonsContStyle)}>
                    {searchButton}
                    {logsRateButton}
                    {hasStats && statsSwitch}
                </div>
            </ThemeProvider>
        );
            */

    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(FlexWrap)}>
                <MetricsFormBuilder
                    {...props}
                    dataSourceId={dataSourceId}
                    labelValueChange={handleMetricChange}
                />
            </div>
        </ThemeProvider>
    );
}
