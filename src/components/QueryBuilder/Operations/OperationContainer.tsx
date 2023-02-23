import { cx, css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState, useMemo, useEffect } from "react";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import { OperationSelectorFromType } from "./OperationSelector";
import { useLabelsFromProps } from "./hooks";
import { BinaryOperation, LabelFilter } from "./DragAndDropContainer";
export const OperationContainerStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    .operation-header {
        background: ${theme.viewBg};
        color: ${theme.textColor};
        padding: 0px 8px;
        border-bottom: 1px solid ${theme.buttonBorder};
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        span {
            //  font-weight: bold;
            font-size: 12px;
        }
        .operation-tools {
            display: none;
            align-items: center;
        }
        &:hover .operation-tools {
            display: flex;
        }
    }
    .operation-body {
        padding: 8px;
    }
`;

export const OperationBodyStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    gap: 3px;
    .input-group {
        display: flex;
        align-items: center;
        gap: 3px;
    }
    label {
        font-size: 12px;
        color: ${theme.textColor};
    }
    input {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 0px 6px;
        &.checkbox {
            font-size: 12px;
            height: 12px;
        }
    }

    select {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 0px 6px;
    }
    button {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 12px;
    }
`;

type Props = {
    id: number;
    header: any;
    body: any;
    rate: string;
    removeItem: any;
    index: number;
    opType: string;
    expressions: any[];
    conversion_function: string;
    labelValue: string;
    filterText: string;
    labelFilter: LabelFilter;
    binaryOperation: BinaryOperation;
    lineFilter: string;
    quantile: string | number;
    kValue: number;
    labels: any[];
    labelOpts: string[];
    onExpChange: (expressions: any[]) => void;
    setOperations: any;
};

export const RangesSelector = (props: any) => {
    const { initial, onChange } = props;
    const rangeOpts: any[] = useMemo(() => {
        return ["$__interval", "1m", "5m", "10m", "1h", "24h"]?.map(
            (m: string) => ({ name: m, value: m })
        );
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {rangeOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};

export const BinaryOperatorsSelector = (props: any) => {
    // intial:   divide
    const { initial, onChange, opts } = props;

    return (
        <select defaultValue={initial} onChange={onChange}>
            {opts.map((opt: { name: string; value: string }, key: number) => (
                <option key={key} value={opt.value}>
                    {opt.name}
                </option>
            ))}
        </select>
    );
};

export const ConversionFunctionSelector = (props: any) => {
    const { initial, onChange } = props;
    const rangeOpts: any[] = useMemo(() => {
        return ["duration", "duration_seconds", "bytes", ""]?.map(
            (m: string) => ({ name: m, value: m })
        );
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {rangeOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};

export const RangeLabelsSelector = (props: any) => {
    const { initial, onChange, labels } = props;

    const labelOpts: any[] = useMemo(() => {
        return (
            labels?.map((m: string) => ({ name: m, value: m })) || [
                { name: "Select Label", value: "" },
            ]
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <select defaultValue={initial} onChange={onChange}>
            {labelOpts.map(
                (opt: { name: string; value: string }, key: number) => (
                    <option key={key} value={opt.value}>
                        {opt.name}
                    </option>
                )
            )}
        </select>
    );
};

export const JSONFormatBody = (props: any) => {
    const { setOperations, id } = props;
    const theme = useTheme();
    const [expressions, setExpressions] = useState<string[]>([]);
    // we need: input and 'add expression' button
    // here: add the expressions

    const onExpChange = useCallback((e, index) => {
        setExpressions((prev) => {
            let n = [...prev];
            n[index] = e?.target?.value;
            return n;
        });

        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.expressions[index] = e.target.value;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onExpRemove = (e: any, index: number) => {
        setExpressions((prev) => {
            const next = [...prev];
            return next?.filter((_, i) => i !== index);
        });
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.expressions = [...m?.expressions]?.filter(
                        (_, i) => i !== index
                    );
                    return m;
                }
                return m;
            });
        });
    };
    const onExpAdd = () => {
        setExpressions((prev) => [...prev, ""]);
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.expressions = [...m.expressions, ""];
                    return m;
                }
                return m;
            });
        });
    };

    const expressionsRenderer = () => {
        if (Array.isArray(expressions) && expressions?.length > 0) {
            return expressions?.map((exp: string, index: number) => (
                <div key={index} className="input-group">
                    {" "}
                    <input
                        className={"expression-input"}
                        value={exp}
                        onChange={(e: any) => onExpChange(e, index)}
                    />{" "}
                    <button onClick={(e) => onExpRemove(e, index)}>x</button>{" "}
                </div>
            ));
        }
        return null;
    };

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            {expressionsRenderer()}
            <button onClick={onExpAdd}>Add Expression</button>
        </div>
    );
};

// add the simple input types
export const PatternFormatBody = (props: Props) => {
    const { setOperations, id } = props;
    const [expression, setExpression] = useState("");
    const theme = useTheme();

    const onExpChange = useCallback(
        (e: any) => {
            setExpression(e.target.value);

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.expressions[0] = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [expression]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <input
                value={expression}
                placeholder={"<pattern|expression>"}
                onChange={onExpChange}
            />
        </div>
    );
};

export const UnwrapFormatBody: React.FC = (props: any) => {
    const { setOperations, id } = props;
    const theme = useTheme();
    const [labelValue, setLabelValue] = useState<string>("");
    const onLabelValueChange = useCallback(
        (e) => {
            setLabelValue(e.target.value);

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.labelValue = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labelValue]
    );

    const onConversionFunctionChange = useCallback((e) => {
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.conversion_function = e.target.value;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <input
                value={labelValue}
                placeholder={"Unrap Label"}
                onChange={onLabelValueChange}
            />

            <ConversionFunctionSelector
                initial=""
                onChange={onConversionFunctionChange}
                className={"expression-input"}
            />
        </div>
    );
};

export const RegexpFormatBody = (props: any) => {
    const { setOperations, id } = props;
    const [expression, setExpression] = useState("");
    const theme = useTheme();

    const onExpChange = useCallback(
        (e: any) => {
            setExpression(e.target.value);

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.expressions[0] = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [expression]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <input
                value={expression}
                placeholder={"<re>"}
                onChange={onExpChange}
            />
        </div>
    );
};
// extract  label - values from JSON expression for later unwrap function

export const LineFormatBody = (props: any) => {
    const { setOperations, id } = props;
    const [expression, setExpression] = useState("");
    const theme = useTheme();

    const onExpChange = useCallback(
        (e: any) => {
            setExpression(e.target.value);

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.expressions[0] = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [expression]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <input
                value={expression}
                placeholder={"{{.status_code}}"}
                onChange={onExpChange}
            />
        </div>
    );
};

export const DefaultFormatBody = (props: any) => {
    return <></>;
};

export const RangeBody = (props: any) => {
    const { setOperations, id } = props;
    const [range, setRange] = useState(props.range);

    const theme = useTheme();
    const onRangeChange = useCallback(
        (e: any) => {
            let val: string = e.target.value;
            setRange(val);
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.range = val;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [range]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <RangesSelector onChange={onRangeChange} initial={range} />
        </div>
    );
};

export const LabelRangeBody = (props: any) => {
    const { setOperations, id } = props;
    const labelsList = useLabelsFromProps(id, props);

    const [labels, setLabels] = useState<string[]>(props.labels || []);
    const [range, setRange] = useState(props.range);
    const [quantile, setQuantile] = useState(props.quantile);
    const theme = useTheme();
    const onLabelAdd = (e: any) => {
        setLabels((prev) => [...prev, ""]);
    };

    const onLabelRemove = useCallback(
        (e: any, index: number) => {
            setLabels((prev) => {
                const next = [...prev];
                return next?.filter((_, i) => i !== index);
            });
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.labels = [...m?.labels]?.filter(
                            (_, i) => i !== index
                        );
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labels]
    );

    const onLabelChange = useCallback(
        (e: any, index: number) => {
            setLabels((prev) => {
                let n = [...prev];
                n[index] = e?.target?.value;
                return n;
            });

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.labels[index] = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labels]
    );

    const onQuantileChange = useCallback(
        (e: any) => {
            let val: string = e.target.value;
            setQuantile(val);
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.quantile = val;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [range]
    );

    const onRangeChange = useCallback(
        (e: any) => {
            let val: string = e.target.value;
            setRange(val);
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.range = val;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [range]
    );

    const rangeLabelsRenderer = () => {
        if (Array.isArray(labels) && labels?.length > 0) {
            return labels?.map((exp: string, index: number) => (
                <div key={index} className="input-group">
                    <RangeLabelsSelector
                        initial=""
                        onChange={(e: any) => onLabelChange(e, index)}
                        className={"expression-input"}
                        labels={labelsList}
                    />
                    <button onClick={(e) => onLabelRemove(e, index)}>x</button>{" "}
                </div>
            ));
        }
        return null;
    };

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            {rangeLabelsRenderer()}
            {props.header === "Quantile Over Time" && (
                <input onChange={onQuantileChange} value={quantile} />
            )}
            <button onClick={onLabelAdd}>Add Label</button>
            <RangesSelector onChange={onRangeChange} initial={range} />
        </div>
    );
};

// change:
// labels
//

export const AggregationsBody = (props: any) => {
    const { setOperations, id, aggrType } = props;
    const labelsList = useLabelsFromProps(id, props);
    const [labels, setLabels] = useState<string[]>([""]);
    const [kValue, setKValue] = useState<number>(props.kValue || []);

    const theme = useTheme();
    const onLabelAdd = (e: any) => {
        setLabels((prev) => [...prev, ""]);

        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.labels = [...labels];

                    return m;
                } else {
                    return m;
                }
            });
        });
    };

    const onLabelRemove = useCallback(
        (e: any, index: number) => {
            setLabels((prev) => {
                const next = [...prev];
                return next?.filter((_, i) => i !== index);
            });
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.labels = [...m?.labels]?.filter(
                            (_, i) => i !== index
                        );
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labels]
    );

    const onLabelChange = useCallback(
        (e: any, index: number) => {
            setLabels((prev) => {
                let n = [...prev];
                n[index] = e?.target?.value;
                return n;
            });

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.labels[index] = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labels]
    );

    const onKValueChange = useCallback(
        (e: any) => {
            setKValue(e.target.value);

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.kValue = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [kValue]
    );

    const rangeLabelsRenderer = () => {
        if (Array.isArray(labels) && labels?.length > 0) {
            return labels?.map((exp: string, index: number) => (
                <div key={index} className="input-group">
                    <RangeLabelsSelector
                        initial=""
                        onChange={(e: any) => onLabelChange(e, index)}
                        className={"expression-input"}
                        labels={labelsList}
                    />
                    <button onClick={(e) => onLabelRemove(e, index)}>x</button>{" "}
                </div>
            ));
        }
        return null;
    };

    const isKValue: (type: string) => boolean = (type) =>
        type === "topk" || type === "bottomk";

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            {isKValue(aggrType) && (
                <input
                    value={kValue}
                    placeholder={"<pattern|expression>"}
                    onChange={onKValueChange}
                />
            )}

            {rangeLabelsRenderer()}
            <button onClick={onLabelAdd}>Add Label</button>
            {/* <RangesSelector onChange={onRangeChange} initial={range} /> */}
        </div>
    );
};

export const formatsRenderer = (op: string, props: any) => {
    switch (op) {
        case "json":
            return <JSONFormatBody {...props} />;
        case "pattern":
            return <PatternFormatBody {...props} />;
        case "regexp":
            return <RegexpFormatBody {...props} />;
        case "line_format":
            return <LineFormatBody {...props} />;
        case "unwrap":
            return <UnwrapFormatBody {...props} />;
        default:
            return <DefaultFormatBody {...props} />;
    }
};

export const LineFilterBody = (props: any) => {
    const { setOperations, id } = props;
    const [expression, setExpression] = useState("");
    const theme = useTheme();

    const onExpChange = useCallback(
        (e: any) => {
            setExpression(e.target.value);

            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.filterText = e.target.value;
                        return m;
                    }
                    return m;
                });
            });
        },
        [id, setOperations]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <input
                value={expression}
                placeholder={"Text Filter"}
                onChange={onExpChange}
            />
        </div>
    );
};

interface FilterState {
    label: string;
    operator: string;
    value: string;
}
export const LabelFilterBody = (props: any) => {
    const { setOperations, id } = props;
    const [labelFilterState, setLabelFilterState] = useState<FilterState>({
        label: "",
        operator: "equals",
        value: "",
    });

    const theme = useTheme();
    const operatorOptions = useMemo(() => {
        return [
            { name: "=", value: "equals" },
            { name: "!=", value: "not_equals" },
            { name: "=~", value: "regex_equals" },
            { name: "!~", value: "regex_not_equals" },
            { name: ">", value: "more" },
            { name: "<", value: "less" },
            { name: ">=", value: "more_equals" },
            { name: "<=", value: "less_equals" },
        ];
    }, []);

    useEffect(() => {
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.labelFilter = { ...labelFilterState };
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelFilterState]);

    const onChange = useCallback(
        (e: any, key: "label" | "operator" | "value") => {
            setLabelFilterState((prev: FilterState) => ({
                ...prev,
                [key]: e.target.value,
            }));
        },

        []
    );
    if (props.header !== "No Pipeline Errors") {
        return (
            <div className={cx(OperationBodyStyles(theme))}>
                <input
                    value={labelFilterState.label}
                    placeholder={"Text Filter"}
                    onChange={(e) => onChange(e, "label")}
                />

                <select
                    defaultValue={"equals"}
                    onChange={(e) => onChange(e, "operator")}
                >
                    {operatorOptions.map(
                        (opt: { name: string; value: string }, key: number) => (
                            <option key={key} value={opt.value}>
                                {opt.name}
                            </option>
                        )
                    )}
                </select>

                <input
                    value={labelFilterState.value}
                    placeholder={"Text Filter"}
                    onChange={(e) => onChange(e, "value")}
                />
            </div>
        );
    }
    return null;
};

const BinaryOperationsBody = (props: any) => {
    const { setOperations, id, binaryOperation } = props;
    const theme = useTheme();
    const [binaryOperationState, setBinaryOperationState] = useState(
        binaryOperation || {
            value: 0,
            bool: false,
        }
    );

    const onChange = useCallback(
        (e: any, key: "value" | "bool") => {
            let value =
                key === "value"
                    ? e.target.value
                    : e.target.checked
                    ? true
                    : false;
            setBinaryOperationState((prev: any) => ({ ...prev, [key]: value }));
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m: any) => {
                    if (m.id === id) {
                        m.binaryOperation = {
                            ...m.binaryOperation,
                            [key]: value,
                        };
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [binaryOperationState]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <input
                value={binaryOperationState.value}
                placeholder={"Value"}
                onChange={(e) => onChange(e, "value")}
            />
            <div className={"input-group"}>
                <label>Boolean</label>
                <input
                    type={"checkbox"}
                    className={"checkbox"}
                    checked={binaryOperationState.bool || false}
                    value={"Boolean"}
                    onChange={(e) => onChange(e, "bool")}
                />
            </div>
        </div>
    );
};

const ranges = [
    "rate",
    "rate_counter",
    "count_over_time",
    "sum_over_time",
    "bytes_rate",
    "bytes_over_time",
    "absent_over_time",
];

const label_ranges = [
    "avg_over_time",
    "max_over_time",
    "min_over_time",
    "first_over_time",
    "last_over_time",
    "stdvar_over_time",
    "stddev_over_time",
    "quantile_over_time",
    "",
];

const aggregations = ["sum", "min", "max", "avg", "stddev", "stdvar", "count"];
const aggregations_k = ["topk", "bottomk"];

export const rangeRenderer = (op: string, props: any) => {
    if (ranges.includes(op)) {
        return <RangeBody {...props} />;
    }

    if (label_ranges.includes(op)) {
        return <LabelRangeBody {...props} />;
    }
    return null;
};

export const aggregationRenderer = (op: string, props: any) => {
    if (aggregations.includes(op)) {
        return <AggregationsBody {...props} aggrType={op} />;
    }

    if (aggregations_k.includes(op)) {
        return <AggregationsBody {...props} aggrType={op} />;
    }
};

export const opTypeSwitch = (opType: string, op: string, props: any) => {
    switch (opType) {
        case "formats":
            return formatsRenderer(op, props);
        case "range_functions":
            return rangeRenderer(op, props);
        case "aggregations":
            return aggregationRenderer(op, props);
        case "line_filters":
            return <LineFilterBody {...props} />;
        case "label_filters":
            return <LabelFilterBody {...props} />;
        case "binary_operations":
            return <BinaryOperationsBody {...props} />;
        default:
            return rangeRenderer(op, props);
    }
};

export default function OperationContainer(props: Props) {
    const { id, opType, header, removeItem, index, setOperations } = props;

    const theme = useTheme();

    const [opHeader, setOpHeader] = useState(header);
    useEffect(() => {
        setOpHeader(header);
    }, [header, setOpHeader]);
    const onOpChange = useCallback(
        (e: any, header: string) => {
            setOpHeader(header);
            setOperations((prev: any) => {
                const next = [...prev];
                return next?.map((m) => {
                    if (m.id === id) {
                        m = {
                            ...m,
                            header,
                            name: header.toLowerCase().split(" ").join("_"),
                        };
                        return m;
                    }
                    return m;
                });
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [opHeader]
    );

    const typeFormat = (str: string) =>
        str?.toLowerCase()?.split(" ")?.join("_") || "";
    if (header && typeof header === "string") {
        return (
            <div className={cx(OperationContainerStyles(theme))}>
                <div className="operation-header">
                    <span>{opHeader}</span>
                    <div className="operation-tools">
                        <OperationSelectorFromType
                            opType={opType}
                            onOperationSelect={onOpChange}
                        />
                        <CloseIcon
                            style={{
                                margin: "0px",
                                padding: "0px",
                                height: "12px",
                                width: "12px",
                                cursor: "pointer",
                            }}
                            onClick={(e) => removeItem(index)}
                        />
                    </div>
                </div>
                <div className="operation-body">
                    {opTypeSwitch(typeFormat(opType), typeFormat(header), {
                        ...props,
                    })}
                </div>
            </div>
        );
    }
    return null;
}
