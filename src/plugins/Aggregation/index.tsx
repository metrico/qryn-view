import { nanoid } from "nanoid";
import { Plugin } from "../types";
import { useTheme } from "../../theme";
import { useEffect, useState } from "react";
import { cx, css } from "@emotion/css";

// const api = (apiUrl: string) => ({
//     get: () => `${apiUrl}/reports/loki`,
//     post: () => `${apiUrl}/reports/loki`,
//     delete: (id: any) => `${apiUrl}/reports/loki?id=${id}`,
// });

export const AggregationLabelsStyle = (theme: any) => css`

    border: 1px solid ${theme.buttonBorder};
    border-radius:3px;
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

    .input-group {
        display: flex;
        flex: 1;
        align-items: center;
        margin-bottom: 8px;
        input {
            display: flex;
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
                    height: 20px;
                    font-size: 12px;
                    //padding: 4px 8px;
                    background: ${theme.inputBg};
                    border: 1px solid ${theme.buttonBorder};
                }

                button {
                    border: 1px solid ${theme.buttonBorder};
                    border-radius: 3px;
                    background: ${theme.widgetContainer};
                    cursor: pointer;
                    color: ${theme.textColor};
                    height: 20px;
                    width: 20px;
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
            <input onChange={onNameChange} value={labelName} />
            <input onChange={onValueChange} value={labelValue} />
            <button onClick={() => onLabelRemove(label)}>-</button>
        </div>
    );
};

/**
 *
 * @param props AggregationLabelsProps
 * @returns
 * - an array of aggregation labels
 * - add labels
 */

export const AggregationLabels: React.FC<AggregationLabelsProps> = (
    props: any
) => {
    const { labels, onLabelsChange } = props;
    console.log(labels);
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
                <p>Labels</p>
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

const Aggregations: React.FC = (props: any) => {
    console.log(props);

    const theme = useTheme();

    // query editor
    // add label / values with [plus] button
    // params name simple input
    // params value :  textarea

    //
    const [query, setQuery] = useState("");
    const [labels, setLabels] = useState([]);
    const [paramsName, setParamsName] = useState("");
    const [paramsValue, setParamsValue] = useState("");

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

        setParamsValue(() => value);
    };

    const onSubmit = () => {
        console.log("submitted");
    };

    return (
        <div className={cx(AggregationLabelsStyle(theme))}>
            <p className="aggr-title">Aggregations</p>
            <div className="input-group">
                <label>Query</label>
                <input name="query" onChange={onQueryChange} value={query} />
            </div>
            <AggregationLabels
                labels={labels}
                onLabelsChange={onLabelsChange}
            />
            <div className="input-group">
                <label>Params Name</label>
                <input
                    name="paramsName"
                    onChange={onParamsNameChange}
                    value={paramsName}
                />
            </div>

            <div className="input-group">
                <label>Params Value</label>
                <textarea
                    name="query"
                    onChange={onParamsValueChange}
                    value={paramsValue}
                />
            </div>

            <button className={"go-button"} onClick={onSubmit}>
                Go!
            </button>
        </div>
    );
};

const aggregationsPlugin: Plugin = {
    name: "Aggregations",
    section: "Panel",
    id: nanoid(),
    Component: Aggregations,
    description: "A simple clock with date / time",
    active: false,
};

export default aggregationsPlugin;
