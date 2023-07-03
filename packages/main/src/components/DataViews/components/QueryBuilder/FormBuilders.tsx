/// it renders the label value selector and the operation functions
import { Builder, FormBuilderProps } from "./types";
import { FlexColumn, MetricsContStyle } from "./styles";
import { cx } from "@emotion/css";
import DOMPurify from 'isomorphic-dompurify';
import { LabelValuesSelectors, OperationFunctions } from "./renderers";
import useTheme from '@ui/theme/useTheme'
import { useMemo, useCallback, useState, useEffect } from "react";

import { labelsToString, logsToString } from "./helpers";
import { binaryOperatorOpts, binaryVectorOpt } from "./consts";
import { InputSelect } from "./InputSelect";
import { useValuesFromMetrics } from "../Metrics/useValuesFromMetrics";
import { MetricsLabelValueSelectors } from "./MetricsLabelValueSelector";
import { BinaryOperatorsSelector } from "../../../QueryBuilder/Operations/Components/selectors";
import { OperationBodyStyles } from "../../../QueryBuilder/Operations/OperationStyles";

// get the initial state from props
export const FormBuilders = (props: FormBuilderProps) => {
    const theme = useTheme();
    const { builders, setBuilders, dataSourceId, logsResponse } = props;

    return (
        <div className={cx(FlexColumn)}>
            {builders?.map((builder, idx) => {
                return (
                    <FormBuilder
                        {...props}
                        builder={builder}
                        dataSourceId={dataSourceId}
                        logsResponse={logsResponse}
                        key={idx}
                        idx={idx}
                        theme={theme}
                        setBuilders={setBuilders}
                    />
                );
            })}
        </div>
    );
};

// return an array of builders

export const BinaryOperationBar = (props: any) => {
    const { onBinaryClose, theme, onBinaryOptChange, binaryValue } = props;
    const [valueMatch, setValueMatch] = useState(binaryValue.vectValue || "");

    const onValueMatchChange = useCallback(
        (e: any, name: string) => {
            setValueMatch(e.target.value);
            onBinaryOptChange(e, name);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [valueMatch]
    );
    /// operator
    const binaryOpts = useMemo(() => {
        return Object.entries(binaryOperatorOpts).map(([key, val]) => ({
            value: key,
            name: val,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [binaryOperatorOpts]);

    const binaryVectorOpts = useMemo(() => {
        return Object.entries(binaryVectorOpt).map(([key, val]) => ({
            value: key,
            name: val,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [binaryOperatorOpts]);
    return (
        <div>
            <div className={cx(OperationBodyStyles(theme))}>
                <div className="binary-operation-bar">
                    <div className="binary-operation-cont">
                        <label>Operator</label>{" "}
                        <BinaryOperatorsSelector
                            initial={binaryValue.binaryOpt || "divide"}
                            onChange={(e: any) =>
                                onBinaryOptChange(e, "binaryOpt")
                            }
                            opts={binaryOpts}
                        />
                        <label>Label Matches</label>
                        <BinaryOperatorsSelector
                            initial={binaryValue.vectOpt || "on"}
                            onChange={(e: any) =>
                                onBinaryOptChange(e, "vectOpt")
                            }
                            opts={binaryVectorOpts}
                        />
                        <input
                            value={DOMPurify.sanitize(valueMatch)}
                            onChange={(e: any) =>
                                onValueMatchChange(e, "vectValue")
                            }
                        />
                    </div>
                    <button onClick={onBinaryClose}> X</button>
                </div>
            </div>
        </div>
    );
};

export const FormBuilder = (props: any) => {
    const { builder, theme, idx, setBuilders, logsResponse, dataSourceId } =
        props;

    // const [logsVolumeQuery, setLogsVolumeQuery] = useState(builder.logsVolumeQuery)

    const [labelsString, setLabelsString] = useState(
        logsToString(builder.labelValuesState) || ""
    );
    const labelValueMemo = useMemo(() => {
        if (builder?.labelValuesState) {
            let labelString = labelsToString(builder?.labelValuesState);
            return `{${labelString}}` || "{}";
        }
        return {};
    }, [builder.labelValuesState]);
    const metricsOpts = useValuesFromMetrics(dataSourceId);
    const [metricValue, setMetricValue] = useState(
        metricsOpts[0] || { label: "", value: "" }
    );

    const [finalQuery, setFinalQuery] = useState(builder.builderResult || "");

    const [labelValueString, setLabelValueString] = useState(
        JSON.stringify(builder.labelValuesState) || ""
    );
    useEffect(() => {
        setLabelValueString(JSON.stringify(builder.labelValuesState));
    }, [builder]);
    const onFinalQueryChange = useCallback((query: string) => {
        setBuilders((prev: any) => {
            const next = [...prev];
            return next.map((builder: Builder, i: number) => {
                if (i === idx) {
                    return { ...builder, builderResult: query };
                }
                return builder;
            });
        });

        setFinalQuery(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClose = () => {
        setBuilders((prev: any) => {
            const next = [...prev];
            return next.filter((f, i) => i !== idx);
        });
    };
    const onMetricChange = (e: any) => {
        const { value } = e;

        setMetricValue((prev: any) => {
            return { value: value?.value, label: value?.value };
        });
    };
    const handleMetricChange = (e: any) => {
       // console.log(e);
    };

    const handleMetricType = (
        builder: any,
        logLabels: any,
        metricLabels: any
    ) => {
        if (builder.isMetrics) {
            return metricLabels;
        }
        return logLabels;
    };

    const onLabelValueChange = (e: any) => {};
    const onBinaryOptionChange = (e: any, name: string) => {
        setBuilders((prev: any) => {
            const next = [...prev];
            return next.map((builder: Builder, i: number) => {
                if (i === idx) {
                    return {
                        ...builder,
                        binaryValue: {
                            ...builder.binaryValue,
                            [name]: e.target.value,
                        },
                    };
                }
                return builder;
            });
        });
    };

    return (
        <div className={cx(FlexColumn)} key={idx}>
            {builder.isBinary && (
                <BinaryOperationBar
                    theme={theme}
                    binaryValue={DOMPurify.sanitize(builder.binaryValue)}
                    onBinaryOptChange={onBinaryOptionChange}
                    onBinaryClose={onClose}
                />
            )}
            <div className={cx(MetricsContStyle)}>
                {builder.isMetrics === true ? (
                    <>
                        <MetricsSelector
                            // metrics selector for Metrics
                            theme={theme}
                            onMetricChange={onMetricChange}
                            dataSourceId={dataSourceId}
                        />
                        <MetricsLabelValueSelectors
                            // label value selectors for metrics
                            index={idx}
                            onChange={onLabelValueChange} // this will be set
                            dataSourceId={dataSourceId}
                            value={DOMPurify.sanitize(metricValue.value)}
                            setBuilders={setBuilders}
                            finalQuery={finalQuery}
                            builder={builder}
                            setFinalQuery={onFinalQueryChange}
                            labelValueString={labelValueString}
                            setLabelValueString={setLabelValueString}
                            metricValueChange={handleMetricChange}
                        />
                    </>
                ) : (
                    <LabelValuesSelectors
                        //  Label value selector for logs
                        {...builder}
                        dataSourceId={dataSourceId}
                        logsResponse={logsResponse}
                        setLabelsString={setLabelsString}
                        finalQuery={finalQuery}
                        setFinalQuery={onFinalQueryChange}
                        labelValueString={labelValueString}
                        setLabelValueString={setLabelValueString}
                        setBuilders={setBuilders}
                        index={idx}
                        theme={theme}
                    />
                )}
            </div>
            <OperationFunctions
                // Operations functions for metrics and logs
                {...props}
                {...builder}
                setBuilders={setBuilders}
                dataSourceId={dataSourceId}
                labelsString={handleMetricType(
                    builder,
                    labelsString,
                    labelValueMemo
                )}
                labelValueString={labelValueString}
                setFinalQuery={onFinalQueryChange}
                finalQuery={finalQuery}
                index={idx}
            />
        </div>
    );
};
export interface MetricSelectorProps {
    theme: any;
    dataSourceId: string;
    onMetricChange(e: any): void;
}
export const MetricsSelector = (props: MetricSelectorProps) => {
    const { dataSourceId, theme, onMetricChange } = props;
    const metricsOpts = useValuesFromMetrics(dataSourceId);
    return (
        <InputSelect
            isMulti={false}
            type={"metric"}
            defaultValue={DOMPurify.sanitize("Select Metric...")}
            selectOpts={metricsOpts}
            mainTheme={theme}
            onChange={onMetricChange}
            minWidth={250}
            labelValuesLength={0}
        />
    );
};
