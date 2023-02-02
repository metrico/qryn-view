import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { nanoid } from "nanoid";
import { useEffect, useState, useCallback } from "react";
import DragAndDropContainer from "../../../QueryBuilder/Operations/DragAndDropContainer";
import { useLabelSeries } from "../../../QueryBuilder/Operations/hooks/useLabelSeries";
import OperationSelector from "../../../QueryBuilder/Operations/OperationSelector";
import { InitialLabelValueState, NewLabel } from "./consts";
import { logsToString } from "./helpers";
import useLogLabels from "./hooks/useLogLabels";
import { InitialAddButton } from "./InitialAddButton";
import { LogLabelValueForm } from "./LogLabelValueForm";
import { FlexWrap, FlexColumn } from "./styles";
import { Label } from "./types";
import { OperationsManager } from "./builders/OperationsManager";

const InitialOperation = {
    id: 0,
    name: "none",
    header: <div>Container Header</div>,
    body: <div></div>,
};

export function LogsLabelValueSelector(props: any) {
    const { dataSourceId, value, onChange, labelValueChange } = props;
    const { loading, logsResponse } = useLogLabels(dataSourceId);
    const [labelValuesState, setLabelValuesState] = useState<Label[]>(
        InitialLabelValueState
    );

    const [labelsString, setLabelsString] = useState("");
    const { labelSeries } = useLabelSeries(dataSourceId, labelsString);
    const [jsonExpressions, setJsonExpressions] = useState([]);

    const [operations, setOperations] = useState<any>([]);
    const [labelValueString, setLabelValueString] = useState("");
    // const [logsString, setLogsString] = useState("")

    const mainTheme = useTheme();

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
            return [...prev, { ...NewLabel, id: nanoid() }];
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
        const logsString = logsToString(value, JSON.parse(labValue));
        setLabelsString(logsString);
        labelValueChange(logsString);
    }, [labelValueString, value]);

    const resetLabelsState = (e: any) => {
        setLabelValuesState((prev) => InitialLabelValueState);
    };

    // check for changes inside the operations
    // send to operations manager

    useEffect(() => {
        let res = OperationsManager(
            labelValueString,
            operations,
            value
        );

        labelValueChange(res);
    }, [operations, labelValueString, value, jsonExpressions]);

    const addOperator = useCallback(
        (e: any, name: string, opType: string) => {
            setOperations((prev: any) => [
                ...prev,
                {
                    ...InitialOperation,
                    header: name,
                    range: "$__interval",
                    name: name?.toLowerCase()?.split(" ")?.join("_"),
                    id: operations?.length + 1,
                    expressions: [],
                    labels: [],
                    labelOpts: [...labelSeries], // here we should have the labels from the .. initial operation
                    opType,
                },
            ]);
        },
        [operations, labelSeries]
    );

    const onExpChange = useCallback(
        (expressions: []) => {
            setJsonExpressions(expressions);
        },
        [jsonExpressions]
    );

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

    if (loading) {
        return null;
    }
    return (
        <ThemeProvider theme={mainTheme}>
            <div className={cx(FlexColumn)}>
                <div className={cx(FlexWrap)}>
                    {labelValuesState?.length > 0 &&
                        labelValuesState?.map((keyval, key) => (
                            <LogLabelValueForm
                                dataSourceId={dataSourceId}
                                id={keyval.id}
                                key={key}
                                keyVal={keyval}
                                labelOpts={logsResponse}
                                labelAdd={onAdd}
                                labelRemove={onRemove}
                                onChange={onLabelChange}
                                currentState={labelValuesState}
                                labelValuesLength={labelValuesState.length || 0}
                            />
                        ))}

                    {initialButtonRenderer()}
                </div>
                <div className={cx(FlexWrap)}>
                    <OperationSelector menuClick={addOperator} />
                    <DragAndDropContainer
                        onExpChange={onExpChange}
                        setOperations={setOperations}
                        operations={operations}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
}
