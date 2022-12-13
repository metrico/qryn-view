import { ThemeProvider } from "@emotion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";
import LabelsList from "./LabelsList";
import ValuesSelector from "./ValuesSelector";
import useLabels from "./useLabels";
import ValuesListStyled from "./ValuesListStyled";
import labelHelpers from "./helpers";

export default function LabelsSelector(props) {
    const { data } = props;
    const { dataSourceId} = data;

    //const dataSourceURL = useSelector((store)=> store.dataSources.find(f => f.id === dataSourceId)) 

    const { JSONClone, updateLabel, updateLabelSelected } = labelHelpers;
    const [labelsResponse, setLabelsResponse] = useState([]);
    const [labelsSelected, setLabelsSelected] = useState([]);

    const { theme } = useSelector((store) => store);

    const { response, loading } = useLabels(dataSourceId); //  set URL from props

    // get previously selected labels

    const labelsFromProps = useMemo(() => {
        if (data?.labels?.length > 0) {
            return data?.labels.map(({ name, selected }) => ({
                name,
                selected,
            }));
        } else return [];
    }, [data?.labels]);

    // get response from useLabels hook

    useEffect(() => {
        if (response?.data?.data) {
            setLabelsResponse(response?.data?.data);
        }
        if(!data) {
            return ()=> null
        }
    }, [response, setLabelsResponse]);

    // memoize and format labels response

    const labels = useMemo(() => {
        if (labelsResponse.length > 0) {
            return labelsResponse?.map((label) => ({
                name: label,
                selected: false,
            }));
        }
    }, [labelsResponse]);

    // set labels state from memoized and formatted labels

    useEffect(() => {
        setLabelsState(labels);
        if(!data) {
            return ()=> null
        }
    }, [labels]);

    const [labelsState, setLabelsState] = useState(labels);

    // memoize currently selected labels

    const selected = useMemo(() => labelsSelected, [labelsSelected]);

    // match labels from query state with new labels from request to API

    useEffect(() => {
        if (labels && labelsFromProps) {
            let clonedLabels = JSONClone(labels);
            let modLabels = [];

            clonedLabels.forEach((label) => {
                if (labelsFromProps.some((s) => s.name === label.name)) {
                    const labelFound = labelsFromProps.find(
                        (f) => f.name === label.name
                    );

                    modLabels.push({ ...labelFound });
                } else {
                    modLabels.push(label);
                }
            });

            let lSelected = modLabels
                .filter((f) => f.selected === true)
                .map((m) => m.name);

            setLabelsSelected(lSelected);

            setLabelsState(modLabels);
        }
    }, [labelsFromProps, labels, setLabelsState, JSONClone]);

    const onLabelSelected = useCallback((e) => {
        setLabelsState((prev) => {
            return updateLabel(prev, e);
        });

        setLabelsSelected((prev) => updateLabelSelected(prev, e));
    },[labels, setLabelsState, setLabelsSelected]);
    if(data) {
        return (
            <ThemeProvider theme={themes[theme]}>
                <ValuesListStyled>
                    <div className="valuesList">
                        <div className={"valuelist-title"}>
                            {!loading && (
                                <LabelsList
                                    {...props}
                                    labels={labelsState}
                                    onLabelSelected={onLabelSelected}
                                />
                            )}
                        </div>
    
                        <ValuesSelector {...props} labelsSelected={selected} />
                    </div>
                </ValuesListStyled>
            </ThemeProvider>
        );
    }
    return null

}
