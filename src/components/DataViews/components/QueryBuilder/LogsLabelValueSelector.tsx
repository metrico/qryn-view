import { cx } from "@emotion/css";
import { ThemeProvider, useTheme } from "@emotion/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import DragAndDropContainer from "../../../QueryBuilder/Operations/DragAndDropContainer";
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
    header: <div>Container Header</div>,
    body: <div>this bodyent is rendered</div>,
};
export function LogsLabelValueSelector(props: any) {
    const { dataSourceId, value, onChange, labelValueChange } = props;
    const { loading, logsResponse } = useLogLabels(dataSourceId);
    const [labelValuesState, setLabelValuesState] = useState<Label[]>(
        InitialLabelValueState
    );

    const [operations, setOperations] = useState([
        {
            id: 1,
            header: <div>JSON</div>,
            body: <div>this bodyent is rendered</div>,
        },
        {
            id: 2,
            header: <div>LogFmt</div>,
            body: <div>this bodyent is rendered</div>,
        },
        {
            id: 3,
            header: <div>Regexp</div>,
            body: <div>this bodyent is rendered</div>,
        },
        {
            id: 4,
            header: <div>Pattern</div>,
            body: <div>this somex bodyent is rendered</div>,
        },
        {
            id: 5, // add header inhere // also id should be array index
            header: <div>Unpack</div>,
            body: <div>this Twitter bodyent is rendered</div>,
        },
        {
            id: 6,
            header: <div>Line Format</div>,
            body: <div>this ??? bodyent is rendered</div>,
        },
        {
            id: 7,
            header: <div>LabelFormat</div>,
            body: <div>this PROFIT content is rendered</div>,
        },
    ]);
    const [labelValueString, setLabelValueString] = useState("");
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
        const logsString = logsToString(value, JSON.parse(labValue)); // logs string function
        labelValueChange(logsString); // pass the processing function from parent
    }, [labelValueString, value]);

    const resetLabelsState = (e: any) => {
        setLabelValuesState((prev) => InitialLabelValueState);
    };

    const addOperator = (e: any) => {
        setOperations((prev: any) =>
            [...prev,{ ...InitialOperation, id: operations?.length + 1 }]
        );
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
                {addOperatorsRenderer()}
                <DragAndDropContainer
                    setOperations={setOperations}
                    operations={operations}
                />
            </div>
            </div>
        </ThemeProvider>
    );
}
