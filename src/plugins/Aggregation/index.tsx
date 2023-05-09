import { nanoid } from "nanoid";
import { Plugin } from "../types";
import { useTheme } from "../../theme";
import { useEffect, useMemo, useState } from "react";
import { cx, css } from "@emotion/css";
import axios from "axios";
import useDataSources from "./useDataSources";
import useDataSourceConfig from "./useDataSourceConfig";
import InfoIcon from "@mui/icons-material/Info";
import { Switch } from "@mui/material";


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
            font-size: 14px;

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
        max-height: 500px;
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
                cursor: pointer;
                &:hover {
                    background: ${theme.widgetContainer};
                }
                p {
                    margin-bottom: 10px;
                }
                .log {
                    margin-bottom: 4px;
                }
            }
            .res-done {
                flex: 1;
                width: 100px;
                progress {
                    background: ${theme.inputBg};
                    border-radius: 3px;
                    width: 50%;
                    height: 12px;

                    border: 1px solid ${theme.buttonBorder};
                }
                progress::-webkit-progress-bar {
                    background-color: ${theme.inputBg};
                    border-radius: 3px;
                }
                progress::-webkit-progress-value {
                    background-color: ${theme.widgetContainer};
                    border-radius: 3px;
                }
                progress::-moz-progress-bar {
                    background-color: ${theme.widgetContainer};
                    border-radius: 3px;
                }
            }
            .res-actions {
                flex: 0.5;
                display: flex;
            }
            .cancel-button {
                border-radius: 3px;
                display: flex;
                align-items: center;
                border: 1px solid ${theme.buttonBorder};
                color: ${theme.textColor};
                background: ${theme.buttonDefault};

                height: 21px;
                font-size: 12px;
                cursor: pointer;
            }
        }
    }
`;
export const apiGet = async (apiUrl: string, config: any) => {
    let res = {};
    axios
        .get(`${apiUrl}/reports/loki`, config)
        .then((data) => {
            res = data;
        })
        .catch((e) => {
            console.log(e);
        });
    return res;
};
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
        cursor: pointer;
        padding: 4px;
        &:hover {
            background: ${theme.widgetContainer};
        }
    }
    .aggr-sign {
        padding: 10px;
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        font-size: 12px;
        color: ${theme.textColor};
        width: fit-content;
        display: flex;
        flex-direction: column;
        transition: 0.25s all;
        background: ${theme.widgetContainer};
        cursor: pointer;
        p {
            line-height: 1.5;
        }
        &:hover {
            background: ${theme.inputBg};
        }
    }
    .subtitle {
        font-size: 14px;
        padding: 8px 0px;
    }
    .input-group {
        display: flex;
        // flex: 1;
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
            //width: 100px;
            &.switch {
                padding-right: 3px;
            }
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
    .action-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
        cursor: pointer;
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

function formatPercentage(num: number) {
    if (num === 100) {
        return num;
    }
    return num.toFixed(2);
}
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
    const onLabelAdd = () => {
        let newLabel: AggregationLabel = {
            id: nanoid(),
            name: "",
            value: "",
        };

        let newLabels = [...labels, newLabel];
        onLabelsChange(newLabels);
    };

    const onLabelRemove = (e: any) => {
        let { id } = e;
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
    const { res, onDelete } = props;
    const theme = useTheme();

    const sorted = useMemo(() => {
        if (res?.length > 0) {
            return res?.sort((a: any, b: any) => b.id - a.id);
        }
        return [];
    }, [res]);

    // let res: any = []; //testJSON;
    return (
        <div className={cx(AggregationsResponseStyles(theme))}>
            <div className="response-column-headers">
                <p className="res-name">Name</p>{" "}
                <p className="res-done">Done</p>{" "}
                <p className="res-actions">Actions</p>
            </div>
            <div className="response-entries">
                {sorted?.length > 0 &&
                    sorted?.map((k: any, v: number) => (
                        <div className="entry-row" key={v}>
                            <AggrLogLine entry={k} />
                            <div className="res-done">
                                <span>{formatPercentage(k.done)}%</span>{" "}
                                <progress value={k.done} max={100} />
                            </div>

                            <div className="res-actions">
                                <button
                                    className="cancel-button"
                                    onClick={(e) => onDelete(e, k.id)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export const AggrLogLine = (props: any) => {
    const { entry } = props;

    const [showDetail, setShowDetail] = useState(false);

    const onShowDetail = () => {
        setShowDetail((prev) => !prev);
    };

    return (
        <div className="res-name" onClick={onShowDetail}>
            <p>
                Query: <code>{entry?.parameters.query}</code>
            </p>
            {showDetail && (
                <>
                    <p>
                        By: {entry?.parameters.params[0].name} [
                        {entry?.parameters?.params[0]?.values?.length} values]
                    </p>
                    {entry?.parameters?.add_labels && (
                        <>
                        <p>Labels:</p>
                        <p>{JSON.stringify(entry?.parameters?.add_labels)}</p> 
                        
                        </>
                    )}
                    <p>Logs:</p>
                    {entry?.logs?.length > 0 &&
                        entry?.logs.map((log: string, idx: number) => (
                            <p key={idx} className={"log"}>
                                {log}
                            </p>
                        ))}
                </>
            )}
        </div>
    );
};

export async function getAggregations(
    apiUrl: string,
    config: any,
    setAggrResponse: Function,
    setLoading: Function
) {
    setLoading(() => true);
    await axios
        .get(`${apiUrl}/reports/loki`, config)
        .then((data) => {
            if (data?.data?.length > 0) {
                setAggrResponse(() => data.data);
                setLoading(() => false);
            }
            setLoading(() => false);
        })
        .catch((e) => {
            console.log("Error on getting aggregations data", e);
            setLoading(() => false);
        });
}

export async function deleteAggregation(
    apiUrl: string,
    config: any,
    id: number,
    setLoading: Function
) {
    setLoading(() => true);
    await axios
        .delete(`${apiUrl}/reports/loki?id=${id}`, config)
        .then((data) => {
            setLoading(() => false);
        })
        .catch((e) => {
            console.log("Error on deleting aggregations data", e);
            setLoading(() => false);
        });
}

export async function postAggregations(apiUrl: string, config: any, data: any) {
    let res: any = {};
    await axios
        .post(`${apiUrl}/reports/loki`, data, config)
        ?.then((data) => {
            res = data;
        })
        .catch((e) => {
            console.log("Error on submitting aggregations", e);
            res.error = e;
        });
}

const Aggregations: React.FC = (props: any) => {
    const {
        localProps: {
            props: { data },
        },
    } = props;
    const { start, stop, dataSourceType } = data;

    const theme = useTheme();

    const ds = useDataSources(dataSourceType);
    const { url } = ds;
    const config = useDataSourceConfig(ds);

    const [query, setQuery] = useState("");
    const [labels, setLabels] = useState([]);
    const [paramsName, setParamsName] = useState("");
    const [paramsValuesString, setParamsValuesString] = useState("");
    const [paramsValues, setParamsValues] = useState<any>([]); // we should format this ones
    const [requestData, setRequestData] = useState({});
    const [aggrResponse, setAggrResponse] = useState([]);
    const [labelsFormatted, setLabelsFormatted] = useState({});
    const [fromMs, setFromMs] = useState(Date.parse(start));
    const [toMs, setToMs] = useState(Date.parse(stop));
    const [loading, setLoading] = useState(false);
    const [actTimestamp, setActTimestamp] = useState(Date.now());
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [showForms, setShowForms] = useState(true);


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
        setRequestData(newRequest);
    }, [labelsFormatted, fromMs, toMs, paramsName, paramsValues, query]);

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
        setParamsValues(() => paramsValueArray);
    };

    const onSubmit = async () => {
        await postAggregations(url, config, requestData).then(() => {
            getAggregations(url, config, setAggrResponse, setLoading);
        });
    };

    const onDelete = async (e: any, id: number) => {
        await deleteAggregation(url, config, id, setLoading).then(() => {
            getAggregations(url, config, setAggrResponse, setLoading);
        });
    };

    const onRefresh = async () => {
        await getAggregations(url, config, setAggrResponse, setLoading);
    };

    const onAutoRefresh = (e: any) => {
        const val = e?.target?.checked;
        setAutoRefresh(() => val);
    };

    const onShowForms = () => {
        setShowForms((prev) => !prev);
    };

    // auto refresh data :

    useEffect(() => {
        const interval = setInterval(() => {
            setActTimestamp(Date.now());
        }, 5000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (autoRefresh && actTimestamp) {
            getAggregations(url, config, setAggrResponse, setLoading);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoRefresh, actTimestamp]);

    let param = `{{.parameter}}`;

    return (
        <div className={cx(AggregationLabelsStyle(theme))}>
            <p
                className="aggr-title"
                onClick={onShowForms}
                title={`Click to ${showForms ? "hide" : "show"} settings`}
            >
                Aggregations{" "}
            </p>
            {showForms && (
                <>
                    <TitleInfo
                        theme={theme}
                        title={"Dispatch Downsample Report"}
                    >
                        Specify a query to downsample to match with time range.
                    </TitleInfo>

                    <div className="input-group">
                        <label>Query</label>
                        <input onChange={onQueryChange} value={query} />
                    </div>
                    <TitleInfo theme={theme} title={" Output Metric"}>
                        <p>
                            {" "}
                            - Add Label __name__ with value 'sampled_*' prefix
                            to easily find newly created metric points.
                        </p>
                        <p>
                            {" "}
                            - Add other labels, to more easily distinguish the
                            new metric Use `{param}` to create dynamic label
                            values
                        </p>
                    </TitleInfo>

                    <AggregationLabels
                        labels={labels}
                        onLabelsChange={onLabelsChange}
                    />
                    <TitleInfo theme={theme} title={"Select Query Parameters"}>
                        Use parameter name to replace the chosen {param} inside
                        your query and labels. Enter each value on a new line.
                    </TitleInfo>
                    <div className="input-group">
                        <label>Parameter Name</label>
                        <input
                            onChange={onParamsNameChange}
                            value={paramsName}
                        />
                    </div>

                    <div className="input-group">
                        <label>Parameter Value</label>
                        <textarea
                            onChange={onParamsValueChange}
                            value={paramsValuesString}
                        />
                    </div>
                </>
            )}

            <div className="action-buttons">
                <div className="input-group">
                    <label className="switch">Auto Refresh</label>
                    <Switch
                        checked={autoRefresh}
                        size={"small"}
                        onChange={onAutoRefresh}
                    />
                </div>

                {aggrResponse?.length > 0 && (
                    <button className={"go-button"} onClick={onRefresh}>
                        Refresh
                    </button>
                )}
                <button className={"go-button"} onClick={onSubmit}>
                    Go!
                </button>
            </div>

            {!loading && aggrResponse?.length > 0 && (
                <AggregationResponse res={aggrResponse} onDelete={onDelete} />
            )}
        </div>
    );
};

export type TitleInfoProps = {
    title: string;
    children?: React.ReactNode;
    theme: any;
};
export const TitleInfo: React.FC<TitleInfoProps> = (props) => {
    const { title, children, theme } = props;

    const [open, setOpen] = useState(false);
    const onInfoOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <div className="subtitle">
                {title}{" "}
                <InfoIcon
                    fontSize={"inherit"}
                    style={{ color: theme.primaryDark, cursor: "pointer" }}
                    onClick={onInfoOpen}
                />
            </div>
            {open && (
                <div
                    className="aggr-sign"
                    title="Click to close"
                    onClick={onInfoOpen}
                >
                    {children}
                </div>
            )}
        </>
    );
};

const aggregationsPlugin: Plugin = {
    name: "Aggregations",
    section: "Query Item",
    id: nanoid(),
    Component: Aggregations,
    roles:['admin'],
    description: "QRYN Reader Aggregation Reports ",
    active: false,
};

export default aggregationsPlugin;
