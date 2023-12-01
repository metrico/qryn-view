import { cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { InitialLabelValueState, NewLabel } from "./consts";
import { metricsToString } from "./helpers";
import { useLabelOpts, useValueSelectOpts } from "./hooks";
import { useMetricsList } from "./hooks/useMetricsList";
import { InitialAddButton } from "./InitialAddButton";
import { LabelValueForm } from "./LabelValueForm";
import { FlexWrap } from "./styles";
import { Label } from "./types";
import useTheme from "@ui/theme/useTheme";

// here inject the label selector
export function MetricsLabelValueSelectors(props: any) {
    const {
        dataSourceId,
        value,
        metricValueChange,
        onChange,
        setBuilders,
        index,
        setFinalQuery,
        labelValueString,
        setLabelValueString,
    } = props;
    const valuesOpts = useMetricsList(dataSourceId, value);

    const [labelValuesState, setLabelValuesState] = useState<Label[]>( // here should add the initial metric
        props.labelValuesState || [{ ...InitialLabelValueState, metric: value }]
    );

    // const [labelValueString, setLabelValueString] = useState("");

    const mainTheme = useTheme();

    const labelOpts = useLabelOpts(valuesOpts);

    /**
     *
     * @param id
     * onRemove removes a label - value pair selector from array by ID
     */
    const onRemove = (id: any) => {
        setLabelValuesState((prev: Label[]) => {
            const prevValue = JSON.parse(JSON.stringify(prev)) || [];
            const newState = prevValue?.filter((f: any) => f.id !== id);
            return newState;
        });

        setLabelValueString((prev: any) => {
            let prevValue = [];
            if (prev?.length > 1) {
                prevValue = JSON.parse(prev || JSON.stringify("[]"));
            }
            const newState = prevValue?.filter((f: any) => f.id !== id);
            return JSON.stringify(newState);
        });
    };

    /**
     *
     * onAdd adds a new label - value pair into array of label - values
     */
    const onAdd = () => {
        setLabelValuesState((prev: Label[]) => {
            return [...prev, { ...NewLabel, metric: value, id: nanoid() }];
        });
    };

    /**
     *
     * @param e
     * onLabelChange
     * - updates the state of the label-values Array
     * - updates the state of the label -values String
     * - sends event to onChange
     */
    const onLabelChange = (e: any) => {
        const labelFound = labelValuesState?.some((f) => f.id === e.id);
        if (labelValuesState?.length === 1 && !labelFound) {
            setLabelValuesState(() => [e]);
            setLabelValueString(() => JSON.stringify([e]));
        }

        const prevState = [...labelValuesState];
        const nextState = prevState?.map((m) => {
            if (m.id === e.id) {
                return { ...e };
            }
            return m;
        });

        if (labelFound) {
            setLabelValuesState(() => [...nextState]);
            setLabelValueString(() => JSON.stringify(nextState));
        }
        onChange(e);
    };

    /**
     *
     * @param e
     * Resets the labels value state into initial value.
     */
    const resetLabelsState = () => {
        setLabelValuesState((prev) => [
            { ...InitialLabelValueState, metric: value },
        ]);
    };

    useEffect(() => {
        // this useEffect sends the metricsString to the metricValueChange event.
        const labValue = labelValueString || JSON.stringify("");
        const metricString = metricsToString(value, JSON.parse(labValue));

        metricValueChange(metricString);
        setFinalQuery(metricString);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelValueString, value]);

    useEffect(() => {
        setBuilders((prev: any[]) => {
            const next = [...prev];
            return next.map((builder) => {
                if (next.indexOf(builder) === index) {
                    return {
                        ...builder,
                        labelValuesState: [...labelValuesState],
                        // convert here the value into a logsVolumeQuery
                    };
                }
                return builder;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelValuesState]);

    /**
     *
     * @returns the initial add label - value button
     */
    const initialButtonRenderer = () => {
        if (labelValuesState?.length < 1) {
            return (
                <InitialAddButton
                    mainTheme={mainTheme}
                    resetLabelsState={resetLabelsState}
                />
            );
        }
        return null;
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <div className={cx(FlexWrap)}>
                {labelValuesState?.length > 0 &&
                    labelValuesState?.map((keyval, key) => (
                        <LabelValueForm
                            id={keyval.id}
                            idx={key}
                            key={key}
                            metric={value}
                            keyVal={keyval}
                            labelOpts={labelOpts}
                            valuesOpts={valuesOpts}
                            labelAdd={onAdd}
                            labelRemove={onRemove}
                            onChange={onLabelChange}
                            currentState={labelValuesState}
                            useValueSelectOpts={useValueSelectOpts}
                            labelValuesLength={labelValuesState?.length || 0}
                        />
                    ))}

                {initialButtonRenderer()}
            </div>
        </ThemeProvider>
    );
}
