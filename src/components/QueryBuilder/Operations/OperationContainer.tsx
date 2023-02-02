import { cx, css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState, useMemo } from "react";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import { OperationSelectorFromType } from "./OperationSelector";
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
    input {
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

type ranges = "$__interval" | "1m" | "5m" | "10m" | "1h" | "24h";

type Props = {
    id: number;
    header: any;
    body: any;
    rate: string;
    removeItem: any;
    index: number;
    opType: string;
    expressions: [];
    onExpChange: (expressions: []) => void;
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

export const RangeBody = (props:any) => {
    const {setOperations, id} = props
    const [range, setRange] = useState(props.range) 
    const theme = useTheme();
    const onRangeChange = useCallback( (e:any) => {
        let val:string = e.target.value
        setRange(val)
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
    },[range])

   return <div className={cx(OperationBodyStyles(theme))}>
    <RangesSelector
    onChange={onRangeChange}
    initial={range}
    />
   </div>
} 

export const LabelRangeBody = (props:any) => {
    const {setOperations, id} = props

    const [labels, setLabels] = useState<string[]>(props.labels||[""])
    const [range, setRange] = useState(props.range) 
    const theme = useTheme();
    const onLabelAdd = useCallback((e:any) => {
        setLabels((prev) => [...prev, ""]);
        setOperations((prev: any) => {
            const next = [...prev];
            return next?.map((m: any) => {
                if (m.id === id) {
                    m.labels = [...m.labels, ""];
                    return m;
                }
                return m;
            });
        });
    },[labels])

    const onLabelRemove = useCallback((e:any,index:number)=> {
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

    },[labels])
    
    const onLabelChange = useCallback((e:any, index:number)=>{

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
    },[labels])



    const onRangeChange = useCallback( (e:any) => {
        let val:string = e.target.value
        setRange(val)
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
    },[range])


    const rangeLabelsRenderer = () => {
        if(Array.isArray(labels) && labels?.length > 0) {
            return labels?.map((exp: string, index: number) => (
                <div key={index} className="input-group">
                    {" "}
                    <input
                        className={"expression-input"}
                        value={exp}
                        onChange={(e: any) => onLabelChange(e, index)}
                    />{" "}
                    <button onClick={(e) => onLabelRemove(e, index)}>x</button>{" "}
                </div>
            ));
        }
        return null;
    }

   return <div className={cx(OperationBodyStyles(theme))}>
    {rangeLabelsRenderer()}
    <RangesSelector
    onChange={onRangeChange}
    initial={range}
    />

   </div>
} 

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
        default:
            return <DefaultFormatBody {...props} />;
    }
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
     "stddev_over_time"
]

export const rangeRenderer = (op:string, props:any) => {
    if(ranges.includes(op)) {
        return <RangeBody {...props}/>
    }

    if( label_ranges.includes(op)) {
        return <LabelRangeBody {...props}/>
    }
    return null
}

export const opTypeSwitch = (opType:string, op:string, props:any) => {

    switch(opType) {
        case "formats": return formatsRenderer(op,props);
        case "range_functions" :return rangeRenderer(op,props);
        default: return rangeRenderer(op,props);
    }

}


export default function OperationContainer(props: Props) {
    const { id, opType, header, body, removeItem, index, setOperations } =
        props;

    const theme = useTheme();
    const [opHeader, setOpHeader] = useState(header);
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
        [opHeader]
    );

    const typeFormat = (str:string) => str?.toLowerCase()?.split(" ")?.join("_") || ""
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
                    {opTypeSwitch(typeFormat(opType), typeFormat(header), props)}
                    {/* {formatsRenderer(
                      typeFormat(header),
                        props
                    )} */}
                </div>
            </div>
        );
    }
    return null;
}

// this should have
// -- a header
// a body
