import { ThemeProvider } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";
import LabelsList from "./LabelsList";
import ValuesSelector from "./ValuesSelector";
import useLabels from "./useLabels";
import ValuesListStyled from "./ValuesListStyled";
import labelHelpers from "./helpers";

export default function LabelsSelector(props: any) {
    const { data } = props;
    const { dataSourceId } = data;

    //const dataSourceURL = useSelector((store)=> store.dataSources.find(f => f.id === dataSourceId))

    const { JSONClone, updateLabel, updateLabelSelected } = labelHelpers;
    const [labelsResponse, setLabelsResponse]: any = useState([]);
    const [labelsSelected, setLabelsSelected]: any = useState([]);

    const { theme }: any = useSelector((store) => store);

    const { response, loading }: any = useLabels(dataSourceId); //  set URL from props

    // get previously selected labels

    const labelsFromProps = useMemo(() => {
        if (data?.labels?.length > 0) {
            return data?.labels.map(({ name, selected }: any) => ({
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
    }, [response, setLabelsResponse]);

    // memoize and format labels response

    const labels = useMemo(() => {
        if (labelsResponse?.length > 0) {
            return labelsResponse?.map((label: any) => ({
                name: label,
                selected: false,
            }));
        }
    }, [labelsResponse]);

    // set labels state from memoized and formatted labels

    useEffect(() => {
        if(labels) {
            setLabelsState(labels);
        }
    }, [labels]);

    const [labelsState, setLabelsState] = useState(labels);

    // memoize currently selected labels

    const selected = useMemo(() => labelsSelected, [labelsSelected]);

    // match labels from query state with new labels from request to API

    useEffect(() => {
        if (labels && labelsFromProps) {
            let clonedLabels = JSONClone(labels);
            let modLabels: any[] = [];

            clonedLabels.forEach((label: any) => {
                if (labelsFromProps.some((s: any) => s.name === label.name)) {
                    const labelFound = labelsFromProps.find(
                        (f: any) => f.name === label.name
                    );

                    modLabels.push({ ...labelFound });
                } else {
                    modLabels.push(label);
                }
            });

            let lSelected: any = modLabels
                .filter((f) => f.selected === true)
                .map((m) => m.name);

            setLabelsSelected(lSelected);

            setLabelsState(modLabels);
        }
    }, [labelsFromProps, labels, setLabelsState, JSONClone]);

    const onLabelSelected = (e: any) => {
        setLabelsState((prev: any) => {
            return updateLabel(prev, e);
        });

        setLabelsSelected((prev: any) => updateLabelSelected(prev, e));
    };
    if (data) {
        const _themes: any = themes;
        return (
            <ThemeProvider theme={_themes[theme]}>
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
    return null;
}
