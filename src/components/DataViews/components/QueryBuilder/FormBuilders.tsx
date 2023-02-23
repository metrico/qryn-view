/// it renders the label value selector and the operation functions
import { Builder, FormBuilderProps } from "./types";
import { FlexColumn} from "./styles";
import { cx } from "@emotion/css";
import { LabelValuesSelectors, OperationFunctions } from "./renderers";
import { useTheme } from "./hooks";
import { useMemo, useCallback, useState } from "react";
import {
    BinaryOperatorsSelector,
    OperationBodyStyles,
} from "../../../QueryBuilder/Operations/OperationContainer";
import { logsToString } from "./helpers";

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

const binaryOperatorOpts = {
    minus: "-",
    plus: "+",
    by: "*",
    divide: "/",
    exp: "^",
    equals: "==",
    not_equals: "!=",
    modulo: "%",
    more: "<",
    less: ">",
    less_equals: "<=",
    more_equals: ">=",
};

const binaryVectorOpt = {
    on: "on",
    ignoring: "ignoring",
};
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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: theme.widgetContainer,
                        borderRadius: "3px",
                        padding: "6px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
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
                            value={valueMatch}
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

    // send up a logsVolume

    // const [logsVolumeQuery, setLogsVolumeQuery] = useState(builder.logsVolumeQuery)

    const [labelsString, setLabelsString] = useState(
        logsToString(builder.labelValuesState) || ""
    );

    const [finalQuery, setFinalQuery] = useState(builder.builderResult || "");

    /// here we should set the initial labelValueString

    const [labelValueString, setLabelValueString] = useState(
        JSON.stringify(builder.labelValuesState) || ""
    );
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

    // here we should add a handler instead of the state manager

    return (
        <div className={cx(FlexColumn)} key={idx}>
            {builder.isBinary && (
                <BinaryOperationBar
                    theme={theme}
                    binaryValue={builder.binaryValue}
                    onBinaryOptChange={onBinaryOptionChange}
                    onBinaryClose={onClose}
                />
            )}
            <LabelValuesSelectors
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

            <OperationFunctions
                {...props}
                {...builder}
                setBuilders={setBuilders}
                dataSourceId={dataSourceId}
                labelsString={labelsString}
                labelValueString={labelValueString}
                setFinalQuery={onFinalQueryChange}
                finalQuery={finalQuery}
                index={idx}
            />
        </div>
    );
};
