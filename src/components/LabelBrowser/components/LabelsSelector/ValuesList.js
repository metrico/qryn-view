import { useEffect, useState, useMemo } from "react";

import useLabelValues from "./useLabelValues";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    decodeQuery,
} from "../../../../components/LabelBrowser/helpers/querybuilder";



import { nanoid } from "nanoid";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";

export const LoaderCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%;
`;

export const Loader = styled(CircularProgress)`
    width: 30px;
    height: 30px;
`;

export default function ValuesList(props) {
    const dispatch = useDispatch();

    const { start, stop } = useSelector((store) => store);
    const left = useSelector((store)=> store.left)
    const right = useSelector((store)=> store.right)
    // get values hook
    const { response, signal, loading } = useLabelValues(
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

            return response?.data?.data?.map((val) => ({
                label: props.label,
                name: val,
                selected: false,
                inverted: false,
                id: nanoid(),
            }));

        } else {
            return [];
        }
    }, [response]);

    const [valuesState, setValuesState] = useState(resp);

    useEffect(() => {
        setValuesState(resp);
    }, [resp, setValuesState]);

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

    const onLabelOpen = (e) => {
        signal.abort();
        props.onLabelOpen(e);
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

    const onValueClick = (val) => {
        let initialValues = [];

        if (valsSelection.length > 0) {
            initialValues = onValueFilter(val, valsSelection);
        } else {
            initialValues = [...initialValues, { ...val }];
        }

        let labelsCP = JSONClone(props.data.labels) || [];

        let labelsMod = [];

        if (labelsCP?.length < 1) {
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
            if (labelsCP.some((s) => s.name === props.label)) {
                for (let LCP of labelsCP) {
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
                    ...labelsCP,
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

        if(props.name === 'left') {
            const leftC = [...left]
            leftC.forEach(query => {
                if(query.id === props.data.id) {
                    query.labels = filtered
                }
            })
            dispatch(setLeftPanel(leftC))
        }

        if(props.name === 'right') {
            const rightC = [...right]
            rightC.forEach(query => {
                if(query.id === props.data.id) {
                    query.labels = filtered
                }
            })
            dispatch(setRightPanel(rightC))
        }
  

        setValsSelection(initialValues);
    };

    return (
        <div className="values-column">
            <div className="values-column-title">
                <span>
                    {props.label} {resp?.length}
                </span>
                <span
                    className={"close-column"}
                    onClick={(e) => onLabelOpen(props.label)}
                >
                    clear
                </span>
            </div>
            <div className="valuelist-content column">
                {loading && (
                    <LoaderCont>
                        <Loader />
                    </LoaderCont>
                )}
                {valuesState?.length > 0 &&
                    valuesState?.map((value, key) => (
                        <LabelValue
                            {...props}
                            key={key}
                            value={value}
                            onValueClick={onValueClick}
                        />
                    ))}
            </div>
        </div>
    );
}

export const LabelValue = (props) => {
    const dispatch = useDispatch();
    let { value, data, onValueClick } = props;
    const left = useSelector((store)=> store.left)
    const right = useSelector((store)=> store.right)

    const setValueStyle = (selected) =>
        selected
            ? {
                  borderColor: "#11abab",
                  color: "#11abab",
              }
            : {};

    const valueSelected = useMemo(() => value.selected, [value.selected]);

    const [valSelected, setValSelected] = useState(valueSelected);

    useEffect(() => {
        setValSelected(value.selected);
    }, [value.selected]);

    const onValueSelected = () => {
        let isSelected = false;

        setValSelected((prev) => {
            if (prev === true) {
                isSelected = false;
                return false;
            } else {
                isSelected = true;
                return true;
            }
        });

        const newQuery = decodeQuery(
            data.expr || "",
            value.label,
            value.name,
            "="
        );


        if(props.name === 'left') {
            const leftC = [...left]
            leftC.forEach(query => {
                if(query.id === props.data.id) {
                    query.expr = newQuery
                }
            })
            dispatch(setLeftPanel(leftC))
        }

        if(props.name === 'right') {
            const rightC = [...right]
            rightC.forEach(query => {
                if(query.id === props.data.id) {
                    query.expr = newQuery
                }
            })
            dispatch(setRightPanel(rightC))
        }


        const valueUpdated = { ...value, selected: isSelected };

        onValueClick(valueUpdated);
    };

    return (
        <small
            className="label-value"
            style={setValueStyle(valSelected)}
            onClick={onValueSelected}
        >
            {value.name}
        </small>
    );
};
