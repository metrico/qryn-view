import { ThemeProvider } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import LabelsList from "./LabelsList";
import ValuesSelector from "./ValuesSelector";
import useLabels from "./useLabels";
import ValuesListStyled from "./ValuesListStyled";
import labelHelpers from "./helpers";
import useTheme from "@ui/theme/useTheme";

export default function LabelsSelector(props: any) {
    const { data } = props;
    const { dataSourceId } = data;

    const { JSONClone, updateLabel, updateLabelSelected } = labelHelpers;
    const [labelsResponse, setLabelsResponse]: any = useState([]);
    const [labelsSelected, setLabelsSelected]: any = useState([]);

    const theme = useTheme();

    const { response, loading }: any = useLabels(
        dataSourceId,
        "",
        data?.start,
        data?.stop
    );

    const labelsFromProps = useMemo(() => {
        if (data?.labels?.length > 0) {
            return data?.labels.map(({ name, selected }: any) => ({
                name,
                selected,
            }));
        } else return [];
    }, [data?.labels]);

    useEffect(() => {
        if (response?.data?.data) {
            setLabelsResponse(response?.data?.data);
        }
    }, [response, setLabelsResponse]);

    const labels = useMemo(() => {
        if (labelsResponse?.length > 0) {
            return labelsResponse?.map((label: any) => ({
                name: label,
                selected: false,
            }));
        }
    }, [labelsResponse]);

    useEffect(() => {
        if (labels) {
            setLabelsState(labels);
        }
    }, [labels]);

    const [labelsState, setLabelsState] = useState(labels);

    const selected = useMemo(() => labelsSelected, [labelsSelected]);

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
        return (
            <ThemeProvider theme={theme}>
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
