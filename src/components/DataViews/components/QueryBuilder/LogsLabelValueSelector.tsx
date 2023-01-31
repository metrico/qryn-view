import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { nanoid } from "nanoid";
import { useEffect, useState, useCallback } from "react";
import DragAndDropContainer from "../../../QueryBuilder/Operations/DragAndDropContainer";
import { FormatOperators } from "../../../QueryBuilder/Operations/helpers";
import OperationSelector from "../../../QueryBuilder/Operations/OperationSelector";
import { AddOperatorButton } from "./AddOperatorButton";
import { InitialLabelValueState, NewLabel } from "./consts";
import { logsToString } from "./helpers";
import useLogLabels from "./hooks/useLogLabels";
import { InitialAddButton } from "./InitialAddButton";
import { LogLabelValueForm } from "./LogLabelValueForm";
import { FlexWrap, FlexColumn } from "./styles";
import { Label } from "./types";

const InitialOperation = {
    id: 0,
    name: "none",
    header: <div>Container Header</div>,
    body: <div></div>,
};

const formats = [
    "json",
    "logfmt",
    "regexp",
    "pattern",
    "unpack",
    "line_format",
    "label_format",
    "unwrap",
];

export type OperationsManagerType = (
    initial: string,
    jsonExpressions: any[],
    operations: any[],
    value: any
) => string;
export function LogsLabelValueSelector(props: any) {
    const { dataSourceId, value, onChange, labelValueChange } = props;
    const { loading, logsResponse } = useLogLabels(dataSourceId);
    const [labelValuesState, setLabelValuesState] = useState<Label[]>(
        InitialLabelValueState
    );

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

    const isSingleExpression = (expr: string) =>
        ["line_format", "regexp", "pattern"].includes(expr);

    const setResultType = (result: string, logString: string) =>
        result === ""
            ? JSON.parse(JSON.stringify(logString))
            : JSON.parse(JSON.stringify(result));

    const setExpressions = (result: any, expressions: string[]) => {
        if (expressions.length > 0) {
            expressions.forEach((expr) => {
                result.addExpression(expr);
            });
        }
    };
    const OperationsManager: OperationsManagerType = (
        initial: string,
        jsonExpressions: any[],
        operations: any[],
        value: any
    ) => {
        let result: any = "";
        if (initial && typeof initial === "string") {
            const logString = logsToString(value, JSON.parse(initial));

           //  const operationNames = operations?.map((m: any) => m.name);

            operations.forEach((operation: any) => {

                if (formats.includes(operation.name)) {
                    // if initial data, use previous
                    const resultType = setResultType(result, logString);

                    // initialize operator
                    result = FormatOperators[operation.name]();

                    // json case, multiple expressions
                    if (operation.name === "json") {
                        // at json format we could have multiple expressions
                        setExpressions(result, operation.expressions);

                        // single expression cases
                    } else if (isSingleExpression(operation.name)) {
                        const [expression] = operation.expressions
                        // single expression at this types
                        if (expression !== "") {
                            result.setExpression(operation.expressions[0]);
                        }
                    }

                    // build operator
                    result = result.build(resultType);
                }
            });
        }
        return result;
    };

    useEffect(() => {
        const labValue = labelValueString || JSON.stringify("");
        const logsString = logsToString(value, JSON.parse(labValue)); 
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
            jsonExpressions,
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
                    name: name?.toLowerCase()?.split(" ")?.join("_"),
                    id: operations?.length + 1,
                    expressions:[],
                    opType,
                },
            ]);

    
        },
        [operations]
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
    const addOperatorsRenderer = () => {
        if (labelValuesState?.length > 0) {
            return (
                <AddOperatorButton
                    mainTheme={mainTheme}
                    addOperator={addOperator}
                />
            );
        }
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
                    {/* {addOperatorsRenderer()} */}
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
