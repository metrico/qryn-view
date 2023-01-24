import { cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { InitialLabelValueState, NewLabel } from "./consts";
import { metricsToString } from "./helpers";
import { useLabelOpts, useTheme, useValueSelectOpts } from "./hooks";
import { useMetricsList } from "./hooks/useMetricsList";
import { InitialAddButton } from "./InitialAddButton";
import { LabelValueForm } from "./LabelValueForm";
import { FlexWrap } from "./styles";
import {Label} from './types';

// here inject the label selector
export function MetricsLabelValueSelectors(props: any) {


    const { dataSourceId, type, value, metricValueChange, onChange } = props;
    const valuesOpts = useMetricsList(dataSourceId, value);

    const [labelValuesState, setLabelValuesState] = useState<Label[]>(
        InitialLabelValueState
    );

    const [labelValueString, setLabelValueString] = useState("");

    const mainTheme = useTheme();

    const labelOpts = useLabelOpts(valuesOpts);

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

    const onAdd = (e: any) => {
        setLabelValuesState((prev: Label[]) => {
            return [...prev, {...NewLabel,id:nanoid()}];
        });
    };

    const onLabelChange = (e: any) => {
        const labelFound = labelValuesState?.some((f) => f.id === e.id);
        if (labelValuesState?.length === 1 && !labelFound) {
            setLabelValuesState((prev) => [e]);
            setLabelValueString((prev) => JSON.stringify([e]));
        }

        const prevState = [...labelValuesState];

        const nextState = prevState?.map((m) => {
            if (m.id === e.id) {
                return { ...e };
            }
            return m;
        });

        if (labelFound) {
            setLabelValuesState((_) => [...nextState]);
            setLabelValueString((_) => JSON.stringify(nextState));
        }
        onChange(e);
    };

    useEffect(() => {
        const labValue = labelValueString || JSON.stringify("");
        const metricString = metricsToString(value, JSON.parse(labValue));
        metricValueChange(metricString); // pass the processing function from parent
    }, [labelValueString, value]);

    const resetLabelsState = (e: any) => {
        setLabelValuesState((prev) => InitialLabelValueState);
    };

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
                            keyVal={keyval}
                            labelOpts={labelOpts}
                            valuesOpts={valuesOpts}
                            labelAdd={onAdd}
                            labelRemove={onRemove}
                            onChange={onLabelChange}
                            currentState={labelValuesState}
                            useValueSelectOpts={useValueSelectOpts}
                            labelValuesLength={labelValuesState.length || 0}
                        />
                    ))}

                {initialButtonRenderer()}
            </div>
        </ThemeProvider>
    );
}
