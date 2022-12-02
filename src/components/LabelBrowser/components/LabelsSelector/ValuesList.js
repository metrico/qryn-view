import { useEffect, useState, useMemo, useCallback } from "react";

import useLabelValues from "./useLabelValues";

import { useDispatch, useSelector } from "react-redux";
import { decodeQuery } from "../../../../components/LabelBrowser/helpers/querybuilder";

import { nanoid } from "nanoid";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";
import { Loader, LoaderCont, SmallInput } from "./styled";

export function panelAction(name, value) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}
export const selectedStyle = {
    borderColor: "#11abab",
    color: "#11abab",
};

export const LabelValue = (props) => {
    const dispatch = useDispatch();
    let { value, data, onValueClick, actPanel, name } = props;

    const valueSelected = useMemo(() => value.selected, [value.selected]);

    const [isValueSelected, setIsValueSelected] = useState(valueSelected);

    const valueStyle = useMemo(() => {
        if (isValueSelected || value.selected || data?.metric === value.name) {
            return selectedStyle;
        } else return {};
    }, [isValueSelected, value.selected, data.metric, value.name]);

    useEffect(() => {
        setIsValueSelected(value.selected);
    }, [value.selected]);

    const onValueSelected = () => {
        let isSelected = false;

        setIsValueSelected((prev) => {
            isSelected = !prev;
            return !prev
        });
        const newQuery = decodeQuery(
            data.expr || "",
            value.label || props.label,
            value.name,
            "=",
            value.type
        );

        const panel = [...actPanel];
        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.expr = newQuery;
                if (value.type === "metrics") {
                    query.metric = value.name;
                }
            }
        });

        dispatch(panelAction(name, panel));

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

export default function ValuesList(props) {
    const dispatch = useDispatch();
    const { name, data } = props;

    const { dataSourceId, dataSourceType } = data;
    const { start, stop } = useSelector((store) => store);
    const panelQuery = useSelector((store) => store[name]);

    const [filterState, setFilterState] = useState("");

    // get values hook

    const { response, controller, loading } = useLabelValues(
        dataSourceId,
        props.label,
        start,
        stop
    );

    // clone data helper

    const JSONClone = (arr) => {
        const arrToJSON = JSON.stringify(arr);
        const actArr = JSON.parse(arrToJSON);
        return actArr;
    };

    // values selection >

    const [valsSelection, setValsSelection] = useState([]);

    useEffect(() => {
        const panel = panelQuery.find(panel => panel.id === data.id);
        const label = panel?.labels?.find((label)=>label.name === props.label)
        const values = label?.values
        if (typeof values !== 'undefined') {
            setValsSelection(values)
        }
    },[panelQuery])

    const valuesFromProps = useMemo(() => {
        if (props?.data?.labels?.length < 1) {
            return [];
        }

        const actLabel = props.data.labels.find((f) => f.name === props.label);

        if (!actLabel) {
            return [];
        }

        return actLabel?.values;
    }, [props.data.labels]);

    const resp = useMemo(() => {
        if (response?.data?.data?.length > 0) {
            const panel = panelQuery.find(panel => panel.id === data.id);
            const label = panel?.labels?.find((label)=>label.name === props.label)
            const values = label?.values;
            const valuesMap = new Map();
            values?.forEach((value)=>{
                valuesMap.set(value.name, value);
            })
            return response?.data?.data?.map((val) => ({
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

            let modValues = [];

            clonedValues.forEach((value) => {
                if (valuesFromProps.some((s) => s.name === value.name)) {
                    const valueFound = valuesFromProps.find(
                        (f) => f.name === value.name
                    );

                    modValues.push({ ...valueFound });
                } else {
                    modValues.push(value);
                }
            });

            setValuesState(modValues);
        }
    }, [valuesFromProps, resp, setValuesState]);

    const onClear = (label) => {
        const newQuery = decodeQuery(
            data.expr || "",
            label || props.label,
            null,
            "=",
            'value'
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

    const onValueFilter = (val, selection) => {
        if (selection.some((s) => s.id === val.id)) {
            const filtered = selection.filter((f) => f.id !== val.id);
            return filtered;
        }

        if (!selection.some((s) => s.id === val.id)) {
            return [...selection, { ...val }];
        }
    };

    const onValueClick = (val, isAll = false) => {
        let initialValues = [];
        if(isAll) {
            setValsSelection([]);
        }
        if (valsSelection.length > 0) {
            initialValues = onValueFilter(val, valsSelection);

            if (val.type === "metrics") {
                setValuesState((prev) => {
                    const found = prev.some((s) => s.id === val.id);

                    if (found) {
                        return prev.map((m) => {
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
            if (propsLabels.some((s) => s.name === props.label)) {
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
            setFilterState((prev) => value);

            if (e !== "") {
                setFilterValuesState((prev) =>
                    valuesState.filter((f) =>
                        f.name.toLowerCase().includes(value.toLowerCase())
                    )
                );
            } else {
                setFilterValuesState((prev) => valuesState);
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
                    filterValuesState?.map((value, key) => (
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
}) {

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
            <span
                className={"close-column"}
                onClick={(e) => onClear(label)}
            >
                clear
            </span>
        </>
    );
}
