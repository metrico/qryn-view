import React, { useCallback, useEffect, useState } from "react";
import { OperationsContainer } from "../../../../QueryBuilder/Operations/DragAndDropContainer";
import OperationSelector from "../../../../QueryBuilder/Operations/OperationSelector";
import { InitialAddButton } from "../InitialAddButton";
import { LogLabelValueForm } from "../LogLabelValueForm";
import { FlexWrap } from "../styles";
import { Label } from "../types";
import { InitialLabelValueState, NewLabel } from "../consts";
import { cx } from "@emotion/css";
import { nanoid } from "nanoid";
import { useLabelSeries } from "../../../../QueryBuilder/Operations/hooks/useLabelSeries";
import {
    logsToString,
    setInitialOperation,
    setOperatorByType,
} from "../helpers";
import { OperationsManager } from "../builders/OperationsManager";

/// it renders the label = value selectors
/**
 * Sets a default Logs Volume operation
 * @param query 
 * @returns 
 */

const setOperationForLogsVolume = (query: string) => {
    return `sum by(level) (count_over_time(${query}[$__interval]))`;
};

export interface LabelValuesSelectorsProps {
    dataSourceId: string;
    logsResponse: any[];
    theme: any;
    setFinalQuery(query: string): void;
    setLabelsString(labelsString: string): void;
    labelValuesState: any[];
    labelValueString: string;
    setLabelValueString: any;
    setBuilders: any;
    index: number;
}

export type LabelValuesSelectorsFn = (
    props: LabelValuesSelectorsProps
) => JSX.Element | null;

/**
 *
 * @param props
 * @returns Label value selector for Logs
 */
export const LabelValuesSelectors: LabelValuesSelectorsFn = (props) => {
    const {
        dataSourceId,
        logsResponse,
        theme,
        setFinalQuery,
        setLabelsString,
        labelValueString,
        setLabelValueString,
        setBuilders,
        index,
    } = props;

    const [labelValuesState, setLabelValuesState] = useState<Label[]>(
        props.labelValuesState ||[ {...InitialLabelValueState}]
    );

    // manage the labelValuesState at builder scope
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

    // adds a new labelValue to list, should be at labelValue side
    const onAdd = (e: any) => {
        setLabelValuesState((prev: Label[]) => {
            return [...prev, { ...NewLabel, id: nanoid() }];
        });
    };

    //  change a label / value state, should be at labelValue side
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
    };

    // update string result from label values selectors change
    useEffect(() => {
        const labValue = labelValueString || JSON.stringify("");
        const logsString = logsToString(JSON.parse(labValue));
        setLabelsString(logsString)
        setFinalQuery(logsString);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelValueString]);

    // update builder state at label values change

    useEffect(() => {
        setBuilders((prev: any[]) => {
            const next = [...prev];
            return next.map((builder) => {
                if (next.indexOf(builder) === index) {
                    return {
                        ...builder,
                        labelValuesState: [...labelValuesState],
                        logsVolumeQuery: setOperationForLogsVolume(
                            logsToString(labelValuesState)
                        ),
                    };
                }
                return builder;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelValuesState]);


    /**
     *
     * resets the label values state to it's initial value
     */
    const resetLabelsState = () => {
        setLabelValuesState(() => [{...InitialLabelValueState}]);
    };

    if (Array.isArray(labelValuesState)) {
        return (
            <div className={cx(FlexWrap)}>
                {labelValuesState?.length > 0 &&
                    labelValuesState?.map((keyval: any, key: number) => (
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
                {initialButtonRenderer(
                    theme,
                    resetLabelsState,
                    labelValuesState?.length || 0
                )}
            </div>
        );
    }
    return null;
};

/**
 * renders the builder operations functions
 * @param props
 * @returns the operation function selectors for metrics and logs
 */
export const OperationFunctions = (props: any) => {
    const {
        dataSourceId,
        setFinalQuery,
        labelsString,
        labelValueString,
        addBinary,
        setBuilders,
        index,
    } = props;
    const { labelSeries } = useLabelSeries(dataSourceId, labelsString);
    const [operations, setOperations] = useState<any>(props.operations || []);

    useEffect(() => {
        if (labelValueString !== "") {
            let res = OperationsManager(labelValueString, operations); 
            setFinalQuery(res);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operations, labelValueString]);

    // add new operation function
    const addOperator = useCallback(
        (e: any, name: string, opType: string) => {
            if (name === "Binary Operation With Query") {
                addBinary(index);
                return;
            }

            const initialOperator = setInitialOperation(
                name,
                opType,
                labelSeries,
                operations
            );
            setOperations((prev: any) =>
                setOperatorByType(opType, initialOperator, prev)
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [operations, labelSeries, labelsString]
    );

    // update builders with operations change
    useEffect(() => {
        setBuilders((prev: any) => {
            const next = [...prev];
            return next.map((builder) => {
                if (next.indexOf(builder) === index) {
                    return { ...builder, operations: [...operations] };
                }
                return builder;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operations]);

    return (
        <div className={cx(FlexWrap)}>
            <OperationSelector menuClick={addOperator} />
            <OperationsContainer
                {...props}
                setOperations={setOperations}
                operations={operations}
            />
        </div>
    );
};

// render initial button from label values selection
// if there are no labels selection visible
/**
 * The initial button for adding Operations functions
 * @param theme
 * @param resetLabelsState
 * @param length
 * @returns the  Initial button for adding Operation functions for Logs and Metrics
 */
export const initialButtonRenderer = (
    theme: any,
    resetLabelsState: any,
    length: number
) => {
    if (length < 1) {
        return (
            <InitialAddButton
                mainTheme={theme}
                resetLabelsState={resetLabelsState}
            />
        );
    }
    return null;
};
