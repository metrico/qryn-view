import { nanoid } from "nanoid";
import { Plugin } from "../types";
import { useTheme } from "../../theme";
import { useEffect, useState } from "react";
import { cx, css } from "@emotion/css";
// import testJSON from "./test.json";
// const api = (apiUrl: string) => ({
//     get: () => `${apiUrl}/reports/loki`,
//     post: () => `${apiUrl}/reports/loki`,
//     delete: (id: any) => `${apiUrl}/reports/loki?id=${id}`,
// });

export const AggregationsResponseStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    .response-column-headers {
        color: ${theme.textColor};
        display: flex;
        border-bottom: 1px solid ${theme.buttonBorder};
        border-top: 1px solid ${theme.buttonBorder};
        padding: 4px 0px;
        justify-content: space-between;
        p {
            display: flex;
            font-size:14px;
           
            flex: 1;
        }
        .res-name {
            flex: 3;
        }
        .res-done {
            width: 100px;
            justify-content: flex-start;
        }
        .res-actions {
            flex: 0.5;
            width: 100px;
        }
    }
    .response-entries {
        font-size: 12px;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        height: 200px;
        overflow: hidden;
        overflow-y: scroll;
        code {
            font-family: monospace;
        }
        .entry-row {
            display: flex;
            flex-direction: row;
            flex: 1;
            padding: 8px 0px;
            border-bottom: 1px solid ${theme.buttonBorder};
            .res-name {
                flex: 3;
                p{
                    margin-bottom:10px;
                
                }
                .log{
                        margin-bottom:4px;
                    }
            }
            .res-done {
                flex: 1;
                width: 100px;
            }
            .res-actions {
                flex: 0.5;
                display: flex;
               
                
            }
            .cancel-button {
                border-radius:3px;
                display:flex;
                align-items:center;
                border:1px solid ${theme.buttonBorder};
                color: ${theme.textColor};
                background: ${theme.buttonDefault};

                height:21px;
                font-size:12px;
                cursor:pointer;
            }
        }
    }
`;

export const AggregationLabelsStyle = (theme: any) => css`
    border: 1px solid ${theme.buttonBorder};
    border-radius: 3px;
    margin: 8px;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    color: ${theme.textColor};

    .aggr-title {
        font-size: 14px;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid ${theme.buttonBorder};
    }
    .aggr-sign {
        padding: 10px;
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        font-size: 12px;
        color: ${theme.textColor};
        p {
            line-height: 1.5;
        }
    }
    .subtitle {
        font-size: 14px;
        padding: 8px 0px;
    }
    .input-group {
        display: flex;
        flex: 1;
        align-items: center;
        margin: 8px 0px;
        input {
            display: flex;
            height: 21px;
            border-radius: 3px;
            flex: 1;
            background: ${theme.inputBg};
            color: ${theme.textColor};
            border: 1px solid ${theme.buttonBorder};
        }
        textarea {
            margin: 0px 1px;
            border-radius: 3px;
            color: ${theme.textColor};
            font-size: 12px;
            padding: 4px 8px;
            background: ${theme.inputBg};
            border: 1px solid ${theme.buttonBorder};
            flex: 1;
        }
        label {
            font-size: 12px;
            display: flex;
            padding: 4px;
            padding-right: 8px;
            width: 100px;
        }
    }

    .labels-root {
        .labels-title {
            display: flex;
            align-items: center;
            flex: 1;
            width: 100%;
            p {
                color: ${theme.textColor};
                font-size: 12px;
                padding: 10px;
            }
            button {
                height: 20px;
                background: ${theme.widgetContainer};
                border: 1px solid ${theme.buttonBorder};
                border-radius: 3px;
                color: ${theme.textColor};
                cursor: pointer;
            }
        }
        .labels-cont {
            display: flex;
            flex-wrap: wrap;

            .label-value {
                display: flex;
                margin: 2px;
                align-items: center;
                textarea {
                    display: flex;
                    flex: 1;
                    margin: 0px 1px;
                    border-radius: 3px;
                    color: ${theme.textColor};
                    font-size: 12px;
                    padding: 4px 8px;
                    background: ${theme.inputBg};
                    border: 1px solid ${theme.buttonBorder};
                }
                input {
                    margin: 0px 1px;
                    border-radius: 3px;
                    color: ${theme.textColor};
                    height: 21px;
                    font-size: 12px;
                    background: ${theme.inputBg};
                    border: 1px solid ${theme.buttonBorder};
                }

                button {
                    border: 1px solid ${theme.buttonBorder};
                    border-radius: 3px;
                    background: ${theme.widgetContainer};
                    cursor: pointer;
                    color: ${theme.textColor};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                }
            }
        }
    }
    .go-button {
        margin: 10px;
        color: ${theme.buttonText};
        background: ${theme.primaryDark};
        border: 1px solid ${theme.primaryBorder};
        border-radius: 3px;
        padding: 3px;
        width: 70px;
        align-self: flex-end;
    }
`;

interface AggregationLabel {
    id: string; // nanoid
    name: string;
    value: string;
}
export type AggregationLabelsProps = {
    labels: AggregationLabel[] | any[];
    onLabelsChange(e: any): void;
};

export type AggregationLabelProps = {
    onLabelChange(e: any): void;
    onLabelRemove(e: any): void;
    label: AggregationLabel;
};

/**
 * Aggregation Label Item:
 * An aggregation label unit with key / value pair and 'remove label' button
 * @param props [ onLabelChange, onLabelRemove, label ]
 * @returns
 */
export const AggregationLabelItem: React.FC<AggregationLabelProps> = (
    props
) => {
    const { onLabelChange, onLabelRemove, label } = props;

    const [labelName, setLabelName] = useState(label.name);
    const [labelValue, setLabelValue] = useState(label.name);

    useEffect(() => {
        setLabelName(label.name);
        setLabelValue(label.value);
    }, [label.name, label.value]);

    const onNameChange = (e: any) => {
        let name = e?.target?.value;
        setLabelName(() => name);
        let newLabel = { ...label, name };
        onLabelChange(newLabel);
    };

    const onValueChange = (e: any) => {
        let value = e?.target?.value;
        setLabelValue(() => value);
        let newLabel = { ...label, value };
        onLabelChange(newLabel);
    };

    return (
        <div className="label-value">
            <input
                placeholder="__name__"
                onChange={onNameChange}
                value={labelName}
            />
            <input
                placeholder="sampled_metric"
                onChange={onValueChange}
                value={labelValue}
            />
            <button onClick={() => onLabelRemove(label)}>-</button>
        </div>
    );
};

/**
 * Aggregations Labels:
 * Aggregations Labels container with header and 'add labels' button.
 * @param props AggregationLabelsProps [labels, onLabelsChange]
 * @returns
 *
 */

export const AggregationLabels: React.FC<AggregationLabelsProps> = (
    props: any
) => {
    const { labels, onLabelsChange } = props;
    //console.log(labels);
    const onLabelAdd = () => {
        let newLabel: AggregationLabel = {
            id: nanoid(),
            name: "",
            value: "",
        };

        let newLabels = [...labels, newLabel];
        console.log(newLabels);
        onLabelsChange(newLabels);
    };

    const onLabelRemove = (e: any) => {
        let { id } = e;
        console.log(id);
        if (labels?.some((s: any) => s.id === id)) {
            let filtered = labels?.filter((f: any) => f.id !== id);
            onLabelsChange(filtered);
        }
    };

    const onLabelChange = (e: any) => {
        let { id } = e;
        if (labels?.some((s: any) => s.id === id)) {
            let newLabels = labels?.map((label: any) => {
                if (label?.id === id) {
                    return { ...e };
                }
                return label;
            });

            onLabelsChange(newLabels);
        }
    };

    return (
        <div className="labels-root">
            <div className="labels-title">
                <p>Create Labels:</p>
                <button onClick={onLabelAdd}>+</button>
            </div>
            <div className="labels-cont">
                {labels?.length > 0 &&
                    labels?.map((label: AggregationLabel, key: number) => (
                        <AggregationLabelItem
                            key={key}
                            onLabelChange={onLabelChange}
                            onLabelRemove={onLabelRemove}
                            label={label}
                        />
                    ))}
            </div>
        </div>
    );
};

// add_labels : key-val object

export interface ParamsValue {
    name: string;
    values: any[];
}
export interface RequestData {
    from_ms: number;
    to_ms: number;
    query: string;
    add_labels: any;
    params: ParamsValue[];
}

export const formatLabels = (labels: any[]): any => {
    if (labels && labels?.length > 0) {
        return labels?.reduce(
            (prev: AggregationLabel, curr: AggregationLabel) => ({
                ...prev,
                [curr.name]: curr.value,
            }),
            {}
        );
    }
    return {};
};

export const getParamsValueArray = (value: string): any[] => {
    return value?.split("\n").filter((i: any) => !!i) || [];
};

const AggregationResponse = (props: any) => {
    //const {response} = props
    const theme = useTheme();
    let res:any = [] //testJSON;

    console.log(res);
    return (
        <div className={cx(AggregationsResponseStyles(theme))}>
            <div className="response-column-headers">
                <p className="res-name">Name</p>{" "}
                <p className="res-done">Done</p>{" "}
                <p className="res-actions">Actions</p>
            </div>
            <div className="response-entries">
                {res?.length > 0 && res?.map((k: any, v: number) => (
                    <div className="entry-row" key={v}>
                        <div className="res-name">
                            <p>
                                Query: <code>{k.parameters.query}</code>
                            </p>
                            <p>
                                By: {k.parameters.params[0].name} [
                                {k?.logs?.length} values]
                            </p>
                            <p>Logs:</p>
                            {k.logs?.length > 0 &&
                                k.logs.map((log: string, idx: number) => (
                                    <p key={idx} className={"log"}>
                                        {log}
                                    </p>
                                ))}
                        </div>
                        <div className="res-done">{k.done}%</div>

                        <div className="res-actions">
                            <button className="cancel-button">Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// add date range picker in here
const Aggregations: React.FC = (props: any) => {
    // default from : Date.now() - ((15 * 60) * 1000)
    // default to: Date.now()
    console.log(props); // we can't use props since it's is outside the panel in here.
    // perhaps we should add it inside query

    const {
        localProps: {
            props: { data },
        },
    } = props;
    const { start, stop } = data;
    console.log(data);

    const theme = useTheme();

    const [query, setQuery] = useState("");
    const [labels, setLabels] = useState([]);
    const [paramsName, setParamsName] = useState("");
    const [paramsValuesString, setParamsValuesString] = useState("");
    const [paramsValues, setParamsValues] = useState<any>([]); // we should format this ones
    const [requestData, setRequestData] = useState({});
    const [labelsFormatted, setLabelsFormatted] = useState({});
    const [fromMs, setFromMs] = useState(Date.parse(start));
    const [toMs, setToMs] = useState(Date.parse(stop));

    console.log(fromMs, toMs);
    console.log(formatLabels(labels));

    useEffect(() => {
        setLabelsFormatted(formatLabels(labels));
    }, [labels]);

    useEffect(() => {
        setFromMs(Date.parse(start));
        setToMs(Date.parse(stop));
    }, [start, stop]);

    useEffect(() => {
        let newRequest: RequestData = {
            from_ms: fromMs,
            to_ms: toMs,
            query,
            add_labels: labelsFormatted,
            params: [
                {
                    name: paramsName,
                    values: paramsValues,
                },
            ],
        };
        console.log(newRequest);
    }, [labelsFormatted, fromMs, toMs, paramsName, paramsValues]);

    const onQueryChange = (e: any) => {
        let value = e.target.value;
        setQuery(() => value);
    };

    const onLabelsChange = (e: any) => {
        setLabels(() => e);
    };

    const onParamsNameChange = (e: any) => {
        let value = e.target.value;

        setParamsName(() => value);
    };

    const onParamsValueChange = (e: any) => {
        let value = e.target.value;
        // format as array in here

        setParamsValuesString(() => value);

        let paramsValueArray = getParamsValueArray(value);
        console.log(paramsValueArray);
        setParamsValues(() => paramsValueArray);
    };

    const onSubmit = () => {
        console.log("submitted");
    };

    let param = `{{.parameter}}`;

    return (
        <div className={cx(AggregationLabelsStyle(theme))}>
            <p className="aggr-title">Aggregations</p>
            <div className="subtitle">Dispatch Downsample Report</div>
            <div className="aggr-sign">
                Specify a query to downsample to match with time range.
            </div>
            <div className="input-group">
                <label>Query</label>
                <input onChange={onQueryChange} value={query} />
            </div>
            <div className="subtitle">Output Metric</div>
            <div className="aggr-sign">
                <p>
                    {" "}
                    - Add Label __name__ with value 'sampled_*' prefix to easily
                    find newly created metric points.
                </p>
                <p>
                    {" "}
                    - Add other labels, to more easily distinguish the new
                    metric Use `{param}` to create dynamic label values
                </p>
            </div>
            <AggregationLabels
                labels={labels}
                onLabelsChange={onLabelsChange}
            />
            <div className="subtitle">Select Query Parameters</div>
            <div className="aggr-sign">
                Use parameter name to replace the chosen {param} inside your
                query and labels. Enter each value on a new line.
            </div>
            <div className="input-group">
                <label>Parameter Name</label>
                <input
                    name="paramsName"
                    onChange={onParamsNameChange}
                    value={paramsName}
                />
            </div>

            <div className="input-group">
                <label>Parameter Value</label>
                <textarea
                    name="query"
                    onChange={onParamsValueChange}
                    value={paramsValuesString}
                />
            </div>

            <button className={"go-button"} onClick={onSubmit}>
                Go!
            </button>

            <AggregationResponse />
        </div>
    );
};

const aggregationsPlugin: Plugin = {
    name: "Aggregations",
    section: "Query Item",
    id: nanoid(),
    Component: Aggregations,
    description: "QRYN Reader Aggregation Reports ",
    active: false,
};

export default aggregationsPlugin;

// For displaying:
// SHOW COLUMNS :
// NAME DONE ACTIONS

// map report to send on post request
// map the get request
// usage of delete action
