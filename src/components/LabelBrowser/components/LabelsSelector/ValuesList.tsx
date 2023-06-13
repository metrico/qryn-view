import { useEffect, useState, useMemo, useCallback } from "react";
import useLabelValues from "./useLabelValues";
import { useDispatch } from "react-redux";
import { decodeQuery } from "../../../../components/LabelBrowser/helpers/querybuilder";
import { nanoid } from "nanoid";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";
import { Loader, LoaderCont, SmallInput } from "./styled";

export function panelAction(name: any, value: any) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

type LabelValueItem = {
    label: string;
    name: string;
    selected: boolean;
    inverted: boolean;
    type: string;
    id: string;
};

type Label = {
    name: string;
    selected: boolean;
    values: LabelValueItem[];
};

type QueryData = {
    id: string;
    idRef: string;
    lastIdx: string;
    panel: string;
    queryType: string;
    dataSourceType: string;
    dataSourceURL: string;
    dataSourceId: string;
    limit: number;
    step: number;
    tableView: boolean;
    chartView: boolean;
    isShowTs: boolean;
    isBuilder: boolean;
    isLogsVolume: boolean;
    browserOpen: boolean;
    expr: string;
    labels: Label[];
    values: string[];
    response: any;
    open: boolean;
    start: Date;
    time: any;
    stop: Date;
    label: string;
    pickerOpen: boolean;
    loading: boolean;
    hasStats: boolean;
    statsData: any;
};

type ValuesListProps = {
    data: QueryData;
    label: string;
    labelsSelected: string[];
    name: string;
    queries: QueryData[];
    type: string;
    width: number;
};

const ValuesList: React.FC<ValuesListProps> = (props) => {
    const dispatch = useDispatch();

    const { name, data, labelsSelected, label, queries } = props;
    const { dataSourceId, start, stop } = data;

    const [filterState, setFilterState] = useState("");

    // get values hook
    const { response: labelValuesResponse, loading }: any = useLabelValues(
        dataSourceId,
        label,
        new Date(start),
        new Date(stop)
    );

    // get the values from selected label
    // clone data helper

    const JSONClone = (arr: any) => {
        const arrToJSON = JSON.stringify(arr);
        const actArr = JSON.parse(arrToJSON);
        return actArr;
    };

    // values selection >

    const [valsSelection, setValsSelection] = useState<LabelValueItem[]>([]);

    useEffect(() => {
        const currentLabel = data?.labels?.find(
            (label: any) => label.name === label
        );
        const currentLabelValues = currentLabel?.values;

        if (typeof currentLabelValues !== "undefined") {
            setValsSelection(currentLabelValues);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries]);

    const valuesFromProps = useMemo(() => {
        if (props?.data?.labels?.length < 1) {
            return [];
        }

        const actLabel = props.data.labels.find((f: any) => f.name === label);

        if (!actLabel) {
            return [];
        }

        return actLabel?.values;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data.labels]);

    const resp = useMemo(() => {
       

        if (labelValuesResponse?.data?.data?.length > 0) {
            const labelFromResponse = data?.labels?.find(
                (l: any) => l.name === label
            );
    
            const values = labelFromResponse?.values;
            const valuesMap = new Map(); 

            values?.forEach((value: any) => {
                valuesMap.set(value.name, {...value,label});
            });
   

            return labelValuesResponse?.data?.data?.map((val: any) => ({
                label,
                name: val,
                selected: valuesMap.get(val)?.selected || false,
                inverted: false,
                type: "value",
                id: valuesMap.get(val)?.id || nanoid(),
            }));
        } else {
            return [];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelValuesResponse]);

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

    const onClear = (labelName: any) => {
        const newQuery = decodeQuery(
            data.expr || "",
            labelName || label,
            null,
            "=",
            "value"
        );

        const panel = [...queries];
        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.expr = newQuery;
            }
        });

        dispatch(panelAction(name, panel));
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

        let labelsMod: any = [];

        if (propsLabels?.length < 1) {
            labelsMod = [
                {
                    name: label,
                    selected:
                        labelsSelected.includes(label) &&
                        initialValues.length > 0,

                    values: [...initialValues],
                },
            ];
        } else {
            if (propsLabels.some((s: any) => s.name === label)) {
                for (let LCP of propsLabels) {
                    if (LCP.name === label) {
                        LCP = {
                            name: label,
                            selected:
                                labelsSelected.includes(label) &&
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
                        name: label,
                        selected:
                            labelsSelected.includes(label) &&
                            initialValues.length > 0,
                        values: [...initialValues],
                    },
                ];
            }
        }

        const finalLabels = labelsSelected?.map((m: any) => {
            if (labelsMod.some((s: any) => s.name === m)) {
                let found = labelsMod.find((f: any) => f.name === m);
                return found;
            } else {
                return { name: m, selected: true, values: [] };
            }
        });

        const panel = [...queries];

        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.labels = finalLabels;
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
                setFilterValuesState((prev: any) =>
                    valuesState.filter((f: any) =>
                        f.name.toLowerCase().includes(value.toLowerCase())
                    )
                );
            } else {
                setFilterValuesState((prev: any) => valuesState);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterState]
    );

    return (
        <div className="values-column">
            <div className="values-column-title">
                <LabelHeader
                    resp={resp}
                    label={label}
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
                            actPanel={queries}
                            onValueClick={onValueClick}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ValuesList;

export type LabelHeaderProps = {
    resp: any[];
    label: string;
    filterState: string;
    onClear: (e: any) => void;
    onFilterChange: (e: any) => void;
};

export const LabelHeader: React.FC<LabelHeaderProps> = ({
    resp,
    label,
    onClear,
    filterState,
    onFilterChange,
}) => {
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
            <span className={"close-column"} onClick={(e) => onClear(label)}>
                clear
            </span>
        </>
    );
};
