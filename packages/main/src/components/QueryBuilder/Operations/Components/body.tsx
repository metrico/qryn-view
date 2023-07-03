import { useState, useCallback, useEffect, useMemo } from "react";
import useTheme from "@ui/theme/useTheme"
import { cx } from "@emotion/css";
import { OperationContainerProps, FilterState } from "../types";
import { OperationBodyStyles } from "../OperationStyles";
import {
    RangesSelector,
    RangeLabelsSelector,
    ConversionFunctionSelector,
    QuantilesSelector,
} from "./selectors";
import { useLabelsFromProps } from "../hooks";
import DOMPurify from "isomorphic-dompurify";

export const JSONFormatBody = (props: any) => {
    const { setOperations, id } = props;
    const theme = useTheme();
    const [expressions, setExpressions] = useState<string[]>([]);
    // we need: input and 'add expression' button
    // here: add the expressions

    const onExpChange = useCallback((e:any, index:number) => {
        setExpressions((prev: any) => {
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
                        value={DOMPurify.sanitize(exp)}
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
export const PatternFormatBody = (props: OperationContainerProps) => {
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
                value={DOMPurify.sanitize(expression)}
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
        (e:any) => {
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

    const onConversionFunctionChange = useCallback((e:any) => {
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
                value={DOMPurify.sanitize(labelValue)}
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
                value={DOMPurify.sanitize(expression)}
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
                value={DOMPurify.sanitize(expression)}
                placeholder={"{{.status_code}}"}
                onChange={onExpChange}
            />
        </div>
    );
};

export const ClampBody = (props: any) => {
    const { setOperations, id } = props;
    const [minimum, setMinimum] = useState("1");
    const [maximum, setMaximum] = useState("1");
    const theme = useTheme();

    const onMaxChange = (e: any) => {
        setMaximum((prev: any) => e.target.value);
    };

    const onMinChange = (e: any) => {
        setMinimum((prev: any) => e.target.value);
    };

    useEffect(() => {
        let clapArr = [minimum, maximum];

        let clapStr = clapArr.join(",");

        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.after_args = "," + clapStr;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minimum, maximum]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div className="input-group">
                <label>Minimum Scalar</label>
                <input
                    value={DOMPurify.sanitize(minimum)}
                    placeholder={"1"}
                    onChange={onMinChange}
                />
            </div>
            <div className="input-group">
                <label>Maximum Scalar</label>
                <input
                    value={DOMPurify.sanitize(maximum)}
                    placeholder={"1"}
                    onChange={onMaxChange}
                />
            </div>
        </div>
    );
};
export const ClampMinBody = (props: any) => {
    const { setOperations, id } = props;
    const [minimum, setMinimum] = useState("1");

    const theme = useTheme();

    const onMinChange = (e: any) => {
        setMinimum((prev: any) => e.target.value);
    };
    useEffect(() => {
        let clapArr = [minimum];

        let clapStr = clapArr.join(",");

        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.after_args = "," + clapStr;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minimum]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div>
                <label>Minimum Scalar</label>
                <input
                    value={DOMPurify.sanitize(minimum)}
                    placeholder={"1"}
                    onChange={onMinChange}
                />
            </div>
        </div>
    );
};
export const ClampMaxBody = (props: any) => {
    const { setOperations, id } = props;
    const [maximum, setMaximum] = useState("1");
    const theme = useTheme();
    const onMaxChange = (e: any) => {
        setMaximum((prev: any) => e.target.value);
    };

    useEffect(() => {
        let clapArr = [maximum];

        let clapStr = clapArr.join(",");

        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.after_args = "," + clapStr;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maximum]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div>
                <label>Maximum Scalar</label>
                <input
                    value={DOMPurify.sanitize(maximum)}
                    placeholder={"1"}
                    onChange={onMaxChange}
                />
            </div>
        </div>
    );
};

export const QuantileBody = (props: any) => {
    const { setOperations, id } = props;
    const [quantile, setQuantile] = useState("1");
    const theme = useTheme();
    const onQuantileChange = (e: any) => {
        setQuantile(() => e.target.value);
    };

    useEffect(() => {
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.prev_args = quantile + ", ";
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantile]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div>
                <label>Quantile</label>
                <input
                    value={DOMPurify.sanitize(quantile)}
                    placeholder={"1"}
                    onChange={onQuantileChange}
                />
            </div>
        </div>
    );
};

export const RoundBody = (props: any) => {
    const { setOperations, id } = props;
    const [round, setRound] = useState("1");
    const theme = useTheme();
    const onRoundChange = (e: any) => {
        setRound((prev: any) => e.target.value);
    };

    useEffect(() => {
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.after_args = "," + round;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [round]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div>
                <label>Nearest Scalar</label>
                <input
                    value={DOMPurify.sanitize(round)}
                    placeholder={"1"}
                    onChange={onRoundChange}
                />
            </div>
        </div>
    );
};

export const LabelReplaceBody = (props: any) => {
    const { setOperations, id } = props;
    const [destinationLabel, setDestinationLabel] = useState<string>("");
    const [replacement, setReplacement] = useState<string>("$1");
    const [sourceLabel, setSourceLabel] = useState<string>("");
    const [regex, setRegex] = useState<string>("(.*)");

    const theme = useTheme();

    const onDestinationLevelChange = (e: any) => {
        setDestinationLabel(e.target.value);
    };

    const onReplacementChange = (e: any) => {
        setReplacement(e.target.value);
    };

    const onSourceLabelChange = (e: any) => {
        setSourceLabel(e.target.value);
    };

    const onRegexChange = (e: any) => {
        setRegex(e.target.value);
    };

    useEffect(() => {
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.after_args =
                        ', "' +
                        destinationLabel +
                        '", "' +
                        replacement +
                        '", "' +
                        sourceLabel +
                        '", "' +
                        regex +
                        '"';
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [destinationLabel, replacement, sourceLabel, regex]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div className="input-group">
                <label>Destination Label</label>
                <input
                    value={DOMPurify.sanitize(destinationLabel)}
                    placeholder={destinationLabel}
                    onChange={onDestinationLevelChange}
                />
            </div>
            <div className="input-group">
                <label>Replacement</label>
                <input
                    value={DOMPurify.sanitize(replacement)}
                    placeholder={replacement}
                    onChange={onReplacementChange}
                />
            </div>
            <div className="input-group">
                <label>Source Label</label>
                <input
                    value={DOMPurify.sanitize(sourceLabel)}
                    placeholder={sourceLabel}
                    onChange={onSourceLabelChange}
                />
            </div>
            <div className="input-group">
                <label>Regex</label>
                <input
                    value={DOMPurify.sanitize(regex)}
                    placeholder={regex}
                    onChange={onRegexChange}
                />
            </div>
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

export const HistogramQuantileBody = (props: any) => {
    const { setOperations, id } = props;
    const [quantile] = useState(props.quantile);

    useEffect(() => {
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.prev_args = `${props.quantile},`;
                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.quantile]);

    const theme = useTheme();

    const onQuantileChange = useCallback(
        (e: any) => {
            let val: string = e.target.value;
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
        [quantile]
    );

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <QuantilesSelector
                onChange={onQuantileChange}
                initial={props.quantile}
            />
        </div>
    );
};

export const LabelJoinBody = (props: any) => {
    const { setOperations, id } = props;
    const labelsList = useLabelsFromProps(id, props);
    const [destinationLabel, setDestinationLabel] = useState<string>("");
    const [sourceLabelSelectors, setSourceLabelSelectors] = useState(
        props.labels || [""]
    );
    const [separator, setSeparator] = useState<string>(",");

    const theme = useTheme();

    const onSourceLabelAdd = (e: any) => {
        setSourceLabelSelectors((prev: any) => [...prev, ""]);
    };

    const onDestinationLabelChange = (e: any) => {
        setDestinationLabel(() => e.target.value);
    };

    const onSeparatorChange = (e: any) => {
        setSeparator(() => e.target.value);
    };

    const onSourceLabelChange = (e: any, idx: number) => {
        setSourceLabelSelectors((prev: any) => {
            let n = [...prev];
            n[idx] = e?.target?.value;
            return n;
        });
    };

    const onSourceLabelRemove = useCallback(
        (e: any, index: number) => {
            setSourceLabelSelectors((prev: any) => {
                const next = [...prev];
                return next?.filter((_, i) => i !== index);
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sourceLabelSelectors]
    );

    const sourceLabelsRenderer = () => {
        return sourceLabelSelectors?.map((exp: string, index: number) => (
            <div key={index} className="input-group">
                <label>Source Label</label>
                <RangeLabelsSelector
                    initial=""
                    onChange={(e: any) => onSourceLabelChange(e, index)}
                    className={"expression-input"}
                    labels={labelsList}
                />
                <button onClick={(e) => onSourceLabelRemove(e, index)}>
                    x
                </button>{" "}
            </div>
        ));
    };

    useEffect(() => {
        let sl = sourceLabelSelectors.join('"' + separator + '"');
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.after_args =
                        ', "' +
                        destinationLabel +
                        '", "' +
                        separator +
                        '", "' +
                        sl +
                        '"';

                    return m;
                }
                return m;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [destinationLabel, sourceLabelSelectors, separator]);

    return (
        <div className={cx(OperationBodyStyles(theme))}>
            <div className="input-group">
                <label>Destination Label</label>
                <RangeLabelsSelector
                    initial=""
                    onChange={onDestinationLabelChange}
                    className={"expression-input"}
                    labels={labelsList}
                />
            </div>
            <div className="input-group">
                <label>Replacement</label>
                <input
                    value={DOMPurify.sanitize(separator)}
                    placeholder={separator}
                    onChange={onSeparatorChange}
                />
            </div>
            <div className="input-group col">{sourceLabelsRenderer()}</div>
            <div className="input-group end">
                <button onClick={onSourceLabelAdd}>+ Add Source Label</button>
            </div>
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
                <input
                    onChange={onQuantileChange}
                    value={DOMPurify.sanitize(quantile)}
                />
            )}
            <button onClick={onLabelAdd}>Add Label</button>
            <RangesSelector onChange={onRangeChange} initial={range} />
        </div>
    );
};

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
                    type={"number"}
                    value={DOMPurify.sanitize(String(kValue))}
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
                    value={DOMPurify.sanitize(labelFilterState.label)}
                    placeholder={"Text Filter"}
                    onChange={(e) => onChange(e, "label")}
                />

                <select
                    defaultValue={"equals"}
                    onChange={(e) => onChange(e, "operator")}
                >
                    {operatorOptions.map(
                        (opt: { name: string; value: string }, key: number) => (
                            <option
                                key={key}
                                value={DOMPurify.sanitize(opt.value)}
                            >
                                {opt.name}
                            </option>
                        )
                    )}
                </select>

                <input
                    value={DOMPurify.sanitize(labelFilterState.value)}
                    placeholder={"Text Filter"}
                    onChange={(e) => onChange(e, "value")}
                />
            </div>
        );
    }
    return null;
};

export const BinaryOperationsBody = (props: any) => {
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
                value={DOMPurify.sanitize(binaryOperationState.value)}
                placeholder={"Value"}
                onChange={(e) => onChange(e, "value")}
            />
            <div className={"input-group"}>
                <label>Boolean</label>
                <input
                    type={"checkbox"}
                    className={"checkbox"}
                    checked={binaryOperationState.bool || false}
                    value={DOMPurify.sanitize("Boolean")}
                    onChange={(e) => onChange(e, "bool")}
                />
            </div>
        </div>
    );
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
                value={DOMPurify.sanitize(expression)}
                placeholder={"Text Filter"}
                onChange={onExpChange}
            />
        </div>
    );
};
