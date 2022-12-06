import { ThemeProvider } from "@emotion/react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";
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

interface operatorsTypes {
    equals: string | any;
    regexequals: string | any;
    excludeequals: string | any;
    regexexclude: string | any;
}

export const OPERATORS: operatorsTypes | any = {
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
        const { value, id } = e;
        setMetricValue((prev: any) => {
            return { value: value?.value, label: value?.value };
        });
    };
    const handleMetricChange = (e: any) => {
        handleMetricValueChange(e);
    };
    const onLabelValueChange = (e: any) => {
        setLabelFilters((prev: any) => {
            if (prev?.length > 0) {
                if (prev?.some((s: any) => s.id === e.id)) {
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
                        type={"metric"}
                        defaultValue={"Select Metric..."}
                        selectOpts={metricsOpts}
                        mainTheme={mainTheme}
                        onChange={onMetricChange}
                        minWidth={250}
                        labelValuesLength={0}
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
        {
            label: "",
            operator: "equals",
            values: [""],
            id: nanoid(),
        },
    ]);

    const [labelValueString, setLabelValueString] = useState("");

    const theme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );
    const mainTheme = useMemo(() => {
        return themes[theme];
    }, [theme]);

    const labelOpts = useMemo(() => {
        if (valuesOpts && Object.keys(valuesOpts)?.length > 0) {
            return Object.keys(valuesOpts)
                ?.filter((f) => f !== "__name__")
                ?.map((m) => ({ label: m, value: m }));
        }
        return [];
    }, [valuesOpts]);

    const onRemove = (id: any) => {
        setLabelValuesState((prev: Label[]) => {
            const prevValue = JSON.parse(JSON.stringify(prev));

            const newState = prevValue?.filter((f: any) => f.id !== id);
            return newState;
        });

        setLabelValueString((prev: any) => {
            const prevValue = JSON.parse(prev || JSON.stringify("[]"));
            const newState = prevValue?.filter((f: any) => f.id !== id);
            return JSON.stringify(newState);
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

        props.onChange(e);
    };

    useEffect(() => {
        const labValue = labelValueString || JSON.stringify("");
        const metricString = metricsToString(value, JSON.parse(labValue));
        metricValueChange(metricString);
    }, [labelValueString, value]);

    const resetLabelsState = (e: any) => {
        setLabelValuesState((prev) => [
            { label: "", operator: "equals", values: [], id: nanoid() },
        ]);
    };

    return (
        <ThemeProvider theme={mainTheme}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {labelValuesState?.length > 0 &&
                    labelValuesState?.map((keyval, key) => (
                        <MetricsLabelValue
                            id={keyval.id}
                            idx={key}
                            key={key}
                            keyVal={keyval}
                            labelOpts={labelOpts}
                            valuesOpts={valuesOpts}
                            labelAdd={onAdd}
                            labelRemove={onRemove}
                            onChange={onLabelChange}
                            currentState={labelValuesState}
                            labelValuesLength={labelValuesState.length || 0}
                        />
                    ))}

                {labelValuesState?.length < 1 && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "5px",
                            cursor: "pointer",
                            color: mainTheme.textColor,
                        }}
                        onClick={resetLabelsState}
                    >
                        <AddOutlinedIcon
                            style={{
                                margin: "0px 5px",
                                color: mainTheme.textColor,
                            }}
                            fontSize="small"
                        />{" "}
                        <small>Add Labels</small>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
}

export const MetricsLabelValue = (props: any) => {
    const {
        keyVal,
        labelOpts,
        valuesOpts,
        labelAdd,
        labelRemove,
        onChange,
        labelValuesLength,
        idx,
        currentState,
        id,
    } = props;

    const theme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );

    const optRef = useRef<any>(null);
    const operatorRef = useRef<any>(null);
    const valueRef = useRef<any>(null);

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

    const [operatorValue, setOperatorValue] = useState({
        label: "=",
        value: "equals",
    });

    const onLabelChange = (e: any) => {
        const { value, id } = e;

        setLabelValue((_: any) => ({
            value: value?.value,
            label: value?.value,
        }));
        const prevKeyVal = JSON.parse(JSON.stringify(localKeyVal));
        const newKeyVal = {
            ...prevKeyVal,
            label: value?.label,
            value: value.value,
            id,
        };
        onChange(newKeyVal);
        setLocalKeyVal((prev: any) => {
            return { ...prev, label: value?.value };
        });
    };

    const onValueChange = (e: any) => {
        const { value, id } = e;
        let values: any = [];
        let next = value !== null ? value : { label: "", value: "" };
        if (isMulti && Array.isArray(next)) {
            values = next?.map((e: any) => e.value);
        } else {
            values = [next.value];
        }

        const prevKeyVal = JSON.parse(JSON.stringify(localKeyVal));

        const newKeyVal = { ...prevKeyVal, values, id };

        onChange(newKeyVal);
        setLocalKeyVal((prev: any) => ({ ...prev, values }));
    };

    const onOperatorChange = (e: any) => {
        const { value, id } = e;

        const prevKeyVal = JSON.parse(JSON.stringify(localKeyVal));

        const newKeyVal = { ...prevKeyVal, operator: value?.value, id };

        onChange(newKeyVal);

        setOperatorValue((_: any) => {
            return { ...value };
        });
        setLocalKeyVal((prev: any) => ({ ...prev, operator: value?.value }));
    };

    const cleanAndRemove = (e: any) => {
        if (optRef?.current && operatorRef?.current && valueRef?.current) {
            labelRemove(keyVal.id);
        }
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

    const labelValueRender = () => {
        if (labelValuesLength > 0) {
            return (
                <div
                    id={id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "3px",
                        marginTop: "3px",
                    }}
                >
                    <InputSelect
                        ref={optRef}
                        type={"label"}
                        isMulti={false}
                        defaultValue={keyVal.label}
                        selectOpts={labelOpts}
                        mainTheme={mainTheme}
                        onChange={onLabelChange}
                        keyVal={keyVal}
                        objId={id}
                        minWidth={100}
                        labelsLength={labelValuesLength}
                    />

                    <InputSelect
                        ref={operatorRef}
                        type={"operator"}
                        isMulti={false}
                        defaultValue={keyVal.operator}
                        selectOpts={OPERATOR_OPTIONS}
                        keyVal={keyVal}
                        mainTheme={mainTheme}
                        onChange={onOperatorChange}
                        objId={id}
                        minWidth={60}
                        labelsLength={labelValuesLength}
                    />

                    <InputSelect
                        ref={valueRef}
                        type={"value"}
                        isMulti={isMulti}
                        defaultValue={keyVal.values}
                        selectOpts={valueSelectOpts}
                        keyVal={keyVal}
                        mainTheme={mainTheme}
                        onChange={onValueChange}
                        objId={id}
                        minWidth={250}
                        labelsLength={labelValuesLength}
                    />
                    <DeleteOutlineOutlinedIcon
                        style={{
                            color: mainTheme.textColor,
                            margin: "0px 5px",
                            cursor: "pointer",
                        }}
                        fontSize="small"
                        onClick={cleanAndRemove}
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
        }
    };

    return <>{labelValueRender()}</>;
};

export const InputSelect = forwardRef((props: any, ref: any) => {
    const {
        selectOpts,
        mainTheme,
        minWidth,
        onChange,
        defaultValue,
        type,
        keyVal,
        objId,
        labelsLength,
    } = props;

    const defaultValueMemo = useMemo(() => {
        if (type === "operator") {
            return { value: defaultValue, label: OPERATORS[defaultValue] };
        }
        if (type === "value") {
            return keyVal.values;
        }

        return { key: defaultValue, label: defaultValue };
    }, [defaultValue]);

    const [selectedOption, setSelectedOption] = useState(
        defaultValueMemo || { label: "", value: "" }
    );

    const multiType = (op: any) => {
        return (
            op?.operator === "regexequals" || op?.operator === "regexexclude"
        );
    };

    const isMulti = useMemo(() => {
        if (type === "metrics") {
            return false;
        }

        if (multiType(keyVal) && type === "value") {
            return true;
        }
        return false;
    }, [type, keyVal]);

    useEffect(() => {
        if (type === "metric") {
            setSelectedOption((prev: any) => prev);
        } else if (type === "operator") {
            setSelectedOption({
                value: keyVal[type],
                label: OPERATORS[keyVal[type]],
            });
        } else if (type === "value") {
            const mapped = [
                ...keyVal.values.map((m: any) => ({ label: m, value: m })),
            ];
            setSelectedOption(mapped);
        } else {
            setSelectedOption({ key: keyVal[type], label: keyVal[type] });
        }
    }, [labelsLength]);

    const onsSelectValueChange = (e: any) => {
        setSelectedOption((prev: any) => e);
        onChange({ value: e, id: objId });
    };

    const localTheme = useMemo(() => {
        return mainTheme;
    }, [mainTheme]);

    return (
        <>
            <Select
                id={objId}
                isMulti={isMulti}
                options={selectOpts}
                styles={cStyles(localTheme, minWidth)}
                value={selectedOption}
                ref={ref}
                defaultValue={defaultValueMemo}
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
                onChange={onsSelectValueChange}
            />
        </>
    );
});
