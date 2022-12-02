// here we should :
// search for metrics values
// searc for label- values of metrics
import { ThemeProvider } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";
import { Select as RSelect } from "../../../../views/DataSources/ui";
import { useMetricsList } from "./useMetricsList";
import { useValuesFromMetrics } from "./useValuesFromMetrics";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Select from "react-select";
import { nanoid } from "nanoid";

export const cStyles = (theme: any, minWidth: number) => ({
    menu: (base: any) => ({
        ...base,
        fontSize: "12px",
        color: theme.textColor,
    }),
    control: (base: any) => ({
        ...base,
        fontSize: "12px",
        height: 28,
        minHeight: 28,
        boxShadow: "none",
        color: theme.textColor,
        // marginTop: "5px",
        minWidth,
    }),
    input: (base: any) => ({
        ...base,
        fontSize: "12px",
        color: theme.textColor,
    }),
    indicatorSeparator: (base: any) => ({
        display: "none",
    }),
    dropdownIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
        color: theme.textColor,
    }),
    clearIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
    }),
    singleValue: (base: any) => ({
        ...base,
        fontSize: "12px",
        height: 30,
        minHeight: 30,
        margin: 0,
        padding: 0,
        marginTop: "4px",
        color: theme.textColor,
    }),
});

export const OPERATOR_OPTIONS = [
    { label: "=", value: "equals" },
    { label: "~=", value: "regexequals" },
    { label: "!=", value: "excludeequals" },
    { label: "!~", value: "regexexclude" },
];

export const OPERATORS = {
    equals: "=",
    regexequals: "~=",
    excludeequals: "!=",
    regexexclude: "!~",
};

export type operator =
    | "equals"
    | "regexequals"
    | "excludeequals"
    | "regexexclude";
export interface Label {
    id: string;
    label: string;
    operator: operator;
    values: string[];
}

export function labelsToString(labels: Label[]): string {
    let finalString = [];

    for (let label of labels) {
        if (label.label) {
            let l = `${label.label}${OPERATORS[label.operator]}"`;

            if (label?.values?.length > 0) {
                l += `${label?.values.join("|")}"`;
            } else {
                l += `${label?.values[0] || ""}"`;
            }
            finalString.push(l);
        }
    }
    return finalString.join(",");
}

function metricsToString(metric: string, labels: Label[]): string {
    let metricString = "";
    let labelsBody = "";

    if (labels?.length > 0) {
        labelsBody = labelsToString(labels);
    }

    if (metric !== "" && labelsBody) {
        metricString = `${metric}{${labelsBody}}`;
    } else {
        metricString = `${metric}{}`;
    }

    return metricString;
}

export default function MetricsSearch(props: any) {
    const {
        handleMetricValueChange,
        data: { dataSourceId },
        searchButton,
        logsRateButton,
    } = props;
    const metricsOpts = useValuesFromMetrics(dataSourceId);

    const [metricValue, setMetricValue] = useState(
        metricsOpts[0] || { label: "", value: "" }
    );

    const [labelFilters, setLabelFilters] = useState([] as any);

    const storeTheme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );

    const mainTheme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);

    const onMetricChange = (e: any) => {
        setMetricValue((prev) => ({ ...e }));
    };
    const handleMetricChange = (e: any) => {
        handleMetricValueChange(e);
    };
    const onLabelValueChange = (e: any) => {
        setLabelFilters((prev: any) => {
            if (prev?.length > 0) {
                if (prev?.some((s: any) => s.label === e.label)) {
                    return prev.map((labelFilter: any) => {
                        if (labelFilter.label === e.label) {
                            return { ...e };
                        }
                        return labelFilter;
                    });
                }
            }
            return [e];
        });
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <div style={{ display: "flex" }}>
                <div style={{ marginTop: "3px" }}>
                    <InputSelect
                        isMulti={false}
                        selectOpts={metricsOpts}
                        mainTheme={mainTheme}
                        onChange={onMetricChange}
                        minWidth={250}
                    />
                </div>
                <MetricsLabelValueSelectors
                    onChange={onLabelValueChange}
                    dataSourceId={dataSourceId}
                    value={metricValue.value}
                    metricValueChange={handleMetricChange}
                />
            </div>
            <div style={{ display: "flex", margin: "10px 0px" }}>
                {searchButton}
                {logsRateButton}
            </div>
        </ThemeProvider>
    );
}

export function MetricsLabelValueSelectors(props: any) {
    const { dataSourceId, value, metricValueChange } = props;
    const valuesOpts = useMetricsList(dataSourceId, value);

    const [labelValuesState, setLabelValuesState] = useState<Label[]>([
        { label: "", operator: "equals", values: [], id: nanoid() },
    ]);
    const [labelsCount, setLabelsCount] = useState(0);

    useEffect(() => {
        const metricString = metricsToString(value, labelValuesState);
        metricValueChange(metricString);
    }, [labelValuesState, value]);

    const labelOpts = useMemo(() => {
        if (valuesOpts && Object.keys(valuesOpts)?.length > 0) {
            return Object.keys(valuesOpts)
                ?.filter((f) => f !== "__name__")
                ?.map((m) => ({ label: m, value: m }));
        }
        return [];
    }, [valuesOpts]);

    const onRemove = (e: any, val: any) => {
        e.preventDefault();

        setLabelValuesState((prev: Label[]) => {
            if (prev?.length > 1) {
                return prev?.filter((f: Label) => {
                    return f.id !== val.id;
                });
            }
            return prev;
        });
    };

    const onAdd = (e: any) => {
        setLabelValuesState((prev: Label[]) => {
            return [
                ...prev,
                { label: "", operator: "equals", values: [], id: nanoid() },
            ];
        });
    };

    const onLabelChange = (e: any) => {
        const labelFound = labelValuesState?.some((f) => f.id === e.id);

        if (labelFound) {
            setLabelValuesState((prev) => {
                return prev?.map((m) => {
                    if (m.id === e.id) {
                        return { ...e };
                    }
                    return m;
                });
            });
        }

        props.onChange(e);
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {labelValuesState &&
                labelValuesState.map((keyval, key) => (
                    <>
                        <MetricsLabelValue
                            key={key}
                            keyVal={keyval}
                            labelOpts={labelOpts}
                            valuesOpts={valuesOpts}
                            labelAdd={onAdd}
                            labelRemove={onRemove}
                            onChange={onLabelChange}
                        />
                    </>
                ))}
        </div>
    );
}

export const MetricsLabelValue = (props: any) => {
    const { keyVal, labelOpts, valuesOpts, labelAdd, labelRemove, onChange, key } =
        props;

    const theme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );

    const mainTheme = useMemo(() => {
        return themes[theme];
    }, [theme]);

    const [localKeyVal, setLocalKeyVal] = useState(keyVal);

    const [labelValue, setLabelValue] = useState(
        labelOpts[0] || { label: "Select Option", value: "" }
    );

    const valueSelectOpts = useMemo(() => {
        if (valuesOpts[labelValue.value]) {
            return valuesOpts[labelValue.value]?.map((val: any) => ({
                label: val,
                value: val,
            }));
        } else {
            return [{ label: "", value: "" }];
        }
    }, [labelValue.value, valuesOpts]);

    const [valValue, setValValue] = useState(
        valuesOpts[0] || { label: "Select Value", value: "" }
    );

    const [operatorValue, setOperatorValue] = useState({
        label: "=",
        value: "equals",
    });

    useEffect(() => {
        onChange(localKeyVal);
    }, [localKeyVal]);

    const onLabelChange = (e: any) => {
        setLabelValue((_: any) => ({ ...e }));
        setLocalKeyVal((prev: any) => ({ ...prev, label: e?.value }));
        // onChange(localKeyVal);
    };

    const onValueChange = (e: any) => {
        let values: any = [];
        if (isMulti) {
            values = [...e].map((e) => e.value);
        } else {
            values = [e.value];
        }

        setValValue((_: any) => ({ label: values, values }));
        setLocalKeyVal((prev: any) => ({ ...prev, values }));
        // onChange(localKeyVal);
    };

    const onOperatorChange = (e: any) => {
        ///const value = e.target.value;
        setOperatorValue((_: any) => ({ ...e }));
        setLocalKeyVal((prev: any) => ({ ...prev, operator: e?.value }));
        // onChange(localKeyVal);
    };

    const isMulti = useMemo(() => {
        if (
            operatorValue.value === "regexequals" ||
            operatorValue.value === "regexexclude"
        ) {
            return true;
        }
        return false;
    }, [operatorValue.value]);

    return (
        <div key={key}
            style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3px",
                marginTop: "3px",
            }}
        >
            <InputSelect
                isMulti={false}
                selectOpts={labelOpts}
                mainTheme={mainTheme}
                onChange={onLabelChange}
                minWidth={100}
            />

            <InputSelect
                isMulti={false}
                selectOpts={OPERATOR_OPTIONS}
                mainTheme={mainTheme}
                onChange={onOperatorChange}
                minWidth={60}
            />

            <InputSelect
                isMulti={isMulti}
                selectOpts={valueSelectOpts}
                mainTheme={mainTheme}
                onChange={onValueChange}
                minWidth={250}
            />
            <DeleteOutlineOutlinedIcon
                style={{
                    color: mainTheme.textColor,
                    margin: "0px 5px",
                    cursor: "pointer",
                }}
                fontSize="small"
                onClick={(e) => labelRemove(e, localKeyVal)}
            />
            <AddOutlinedIcon
                style={{
                    color: mainTheme.textColor,
                    margin: "0px 5px",
                    cursor: "pointer",
                }}
                fontSize="small"
                onClick={labelAdd}
            />
        </div>
    );
};

// should do a map of label / values

export const InputSelect = (props: any) => {
    const { isMulti, selectOpts, mainTheme, minWidth, onChange } = props;

    const localTheme = useMemo(() => {
        return mainTheme;
    }, [mainTheme]);

    return (
        <>
            <Select
                isMulti={isMulti}
                options={selectOpts}
                styles={cStyles(localTheme, minWidth)}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 2,
                    fontSize: 12,
                    colors: {
                        ...theme.colors,
                        primary: localTheme.textColor,
                        neutral90: localTheme.textColor,
                        neutral80: localTheme.textColor,
                        neutral0: localTheme.inputBg,
                        primary25: localTheme.widgetContainer,
                        neutral5: localTheme.widgetContainer,
                        neutral10: localTheme.widgetContainer,
                    },
                })}
                onChange={onChange}
            />
        </>
    );
};
