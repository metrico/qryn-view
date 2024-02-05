import { useEffect, useState, useMemo, useCallback } from "react";
import useLabelValues from "./useLabelValues";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { Loader, LoaderCont, SmallInput } from "./styled";
import { panelAction } from "../QueryTypeBar";
import { decodeQuery } from "../LabelBrowser/helpers/querybuilder";

export const selectedStyle = {
    borderColor: "#11abab",
    color: "#11abab",
};

export const LabelValue = (props: any) => {
    let { value, data, onValueClick } = props;

    const valueSelected = useMemo(() => value.selected, [value.selected]);

    const [isValueSelected, setIsValueSelected] = useState(valueSelected);

    const valueStyle = useMemo(() => {
        if (isValueSelected || data?.metric === value.name) {
            return selectedStyle;
        } else return {};
    }, [isValueSelected, value.selected, data.metric, value.name]);

    useEffect(() => {
        setIsValueSelected(value.selected);
    }, [value.selected]);

    const onValueSelected = () => {
        let isSelected = false;

        setIsValueSelected((prev: any) => {
            isSelected = !prev;
            return !prev;
        });

        const valueUpdated = { ...value, selected: isSelected };
        onValueClick(valueUpdated);
    };

    return (
        <small
            className="label-value"
            style={valueStyle}
            onClick={onValueSelected}
        >
            {value.name}
        </small>
    );
};

export default function ValuesList(props: any) {
    const dispatch: any = useDispatch();
    const { name, data, start, stop } = props;

    const { dataSourceId } = data;
    const panelQuery = useSelector((store: any) => store[name]);

    const [filterState, setFilterState] = useState("");

    // get values hook

    const { response, controller, loading }: any = useLabelValues(
        dataSourceId,
        props.label,
        start,
        stop
    );

    // clone data helper

    const JSONClone = (arr: any) => {
        const arrToJSON = JSON.stringify(arr);
        const actArr = JSON.parse(arrToJSON);
        return actArr;
    };

    // values selection >

    const [valsSelection, setValsSelection] = useState([]);

    useEffect(() => {
        const panel = panelQuery.find((panel: any) => panel.id === data.id);
        const label = panel?.labels?.find(
            (label: any) => label.name === props.label
        );
        const values = label?.values;
        if (typeof values !== "undefined") {
            setValsSelection(values);
        }
    }, [panelQuery]);

    const valuesFromProps = useMemo(() => {
        if (props?.data?.labels?.length < 1) {
            return [];
        }

        const actLabel = props.data.labels.find(
            (f: any) => f.name === props.label
        );

        if (!actLabel) {
            return [];
        }

        return actLabel?.values;
    }, [props.data.labels]);

    const resp = useMemo(() => {
        if (response?.data?.data?.length > 0) {
            const panel = panelQuery.find((panel: any) => panel.id === data.id);
            const label = panel?.labels?.find(
                (label: any) => label.name === props.label
            );
            const values = label?.values;
            const valuesMap = new Map();
            values?.forEach((value: any) => {
                valuesMap.set(value.name, value);
            });
            return response?.data?.data?.map((val: any) => ({
                label: props.label,
                name: val,
                selected: valuesMap.get(val)?.selected || false,
                inverted: false,
                type: "value",
                id: valuesMap.get(val)?.id || nanoid(),
            }));
        } else {
            return [];
        }
    }, [response]);

    const [valuesState, setValuesState] = useState(resp);
    const [filterValuesState, setFilterValuesState] = useState(valuesState);

    useEffect(() => {
        setValuesState(resp);
    }, [resp, setValuesState]);

    useEffect(() => {
        setFilterValuesState(valuesState);
    }, [valuesState, setFilterValuesState]);

    useEffect(() => {
        if (resp && valuesFromProps) {
            let clonedValues = JSONClone(resp);

            let modValues: any = [];

            clonedValues.forEach((value: any) => {
                if (valuesFromProps.some((s: any) => s.name === value.name)) {
                    const valueFound = valuesFromProps.find(
                        (f: any) => f.name === value.name
                    );

                    modValues.push({ ...valueFound });
                } else {
                    modValues.push(value);
                }
            });

            setValuesState(modValues);
        }
    }, [valuesFromProps, resp, setValuesState]);

    const onClear = (label: any) => {
        const newQuery = decodeQuery(
            data.expr || "",
            label || props.label,
            null,
            "=",
            "value"
        );

        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.expr = newQuery;
            }
        });

        dispatch(panelAction(name, panel));
        controller?.abort();
    };

    const onValueFilter = (val: any, selection: any) => {
        if (selection.some((s: any) => s.name === val.name)) {
            const filtered = selection.filter((f: any) => f.name !== val.name);
            return filtered;
        }

        if (!selection.some((s: any) => s.name === val.name)) {
            return [...selection, { ...val }];
        }
    };

    const onValueClick = (val: any, isAll = false) => {
        let initialValues: any = [];
        if (isAll) {
            setValsSelection([]);
        }
        if (valsSelection.length > 0) {
            initialValues = onValueFilter(val, valsSelection);
            if (val.type === "metrics") {
                setValuesState((prev: any) => {
                    const found = prev.some((s: any) => s.id === val.id);

                    if (found) {
                        return prev.map((m: any) => {
                            if (m.id === val.id) {
                                return { ...m, selected: false };
                            }
                            return { ...m, selected: true };
                        });
                    }
                });
            }
        } else if (!isAll) {
            initialValues = [...initialValues, { ...val }];
        }

        let propsLabels = JSONClone(props.data.labels) || [];

        let labelsMod = [];

        if (propsLabels?.length < 1) {
            labelsMod = [
                {
                    name: props.label,
                    selected:
                        props.labelsSelected.includes(props.label) &&
                        initialValues.length > 0,

                    values: [...initialValues],
                },
            ];
        } else {
            if (propsLabels.some((s: any) => s.name === props.label)) {
                for (let LCP of propsLabels) {
                    if (LCP.name === props.label) {
                        LCP = {
                            name: props.label,
                            selected:
                                props.labelsSelected.includes(props.label) &&
                                initialValues.length > 0,
                            values: [...initialValues],
                        };
                        labelsMod.push(LCP);
                    } else {
                        labelsMod.push(LCP);
                    }
                }
            } else {
                labelsMod = [
                    ...propsLabels,
                    {
                        name: props.label,
                        selected:
                            props.labelsSelected.includes(props.label) &&
                            initialValues.length > 0,
                        values: [...initialValues],
                    },
                ];
            }
        }

        const filtered = labelsMod.filter((f) => f.selected);
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.labels = filtered;
            }
        });
        dispatch(panelAction(name, panel));
        setValsSelection(initialValues);
    };

    const onFilterChange = useCallback(
        (e) => {
            const value = e.target.value;
            setFilterState(() => value);

            if (e !== "") {
                setFilterValuesState(() =>
                    valuesState.filter((f: any) =>
                        f.name.toLowerCase().includes(value.toLowerCase())
                    )
                );
            } else {
                setFilterValuesState(() => valuesState);
            }
        },

        [filterState]
    );

    return (
        <div className="values-column">
            <div className="values-column-title">
                <LabelHeader
                    resp={resp}
                    label={props.label}
                    onClear={onClear}
                    filterState={filterState}
                    onFilterChange={onFilterChange}
                />
            </div>
            <div className="valuelist-content column">
                {loading && (
                    <LoaderCont>
                        <Loader />
                    </LoaderCont>
                )}
                {valuesState?.length > 0 &&
                    filterValuesState?.map((value: any, key: any) => (
                        <LabelValue
                            {...props}
                            key={key}
                            value={value}
                            actPanel={panelQuery}
                            onValueClick={onValueClick}
                        />
                    ))}
            </div>
        </div>
    );
}

export function LabelHeader({
    resp,
    label,
    onClear,
    filterState,
    onFilterChange,
}: any) {
    // Add here a replace for label with a custom name

    return (
        <>
            <span>
                <span className="key">{label}</span> | {resp?.length}
            </span>
            <span>
                <SmallInput
                    placeholder="Search For Values..."
                    value={filterState}
                    onChange={onFilterChange}
                />
            </span>
            <span className={"close-column"} onClick={() => onClear(label)}>
                clear
            </span>
        </>
    );
}
