import { ThemeProvider } from "@emotion/react";
import {
    /*useCallback,*/ useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import LabelsList from "./LabelsList";
import ValuesSelector from "./ValuesSelector";
import useLabels from "./useLabels";
import ValuesListStyled from "./ValuesListStyled";
import labelHelpers from "./helpers";
import { useTheme } from "../../../../theme";
import { useDispatch } from "react-redux";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";

const panelAction = (side: "left" | "right", data: any) => {
    if (side === "left") {
        return setLeftPanel(data);
    }
    return setRightPanel(data);
};

export default function LabelsSelector(props: any) {
    const { data, name, queries } = props;
    const dispatch = useDispatch();
    const {
        dataSourceId,
        labels: propsLabels,
        start: startTs,
        stop: stopTs,
        id,
    } = data;

    const { updateLabelSelected } = labelHelpers;
    const [labelsResponse, setLabelsResponse]: any = useState([]);
    const [labelsSelected, setLabelsSelected]: any = useState([]);

    const theme = useTheme();

    const { response, loading }: any = useLabels(
        dataSourceId,
        "",
        startTs,
        stopTs
    ); //  set URL from props

    const labelsFromProps = useMemo(() => {
        if (propsLabels?.length > 0) {
            return propsLabels.map(({ name, selected }: any) => ({
                name,
                selected,
            }));
        } else return [];
    }, [propsLabels]);

    useEffect(() => {
        if (response?.data?.data) {
            setLabelsResponse(response?.data?.data);
        }
    }, [response, setLabelsResponse]);

    // memoize and format labels response

    const labelsFromResponse = useMemo(() => {
        if (labelsResponse?.length > 0) {
            return labelsResponse?.map((label: any) => ({
                name: label,
                selected: false,
            }));
        }
    }, [labelsResponse]);

    // set labels state from memoized and formatted labels

    useEffect(() => {
        if (labelsFromResponse) {
            setLabelsState(labelsFromResponse);
        }
    }, [labelsFromResponse]);

    const [labelsState, setLabelsState] = useState(labelsFromResponse);

    // memoize currently selected labels

    // match labels from query state with new labels from request to API

    useEffect(() => {
        if (labelsFromResponse && labelsFromProps) {
            let clonedLabels = JSON.parse(JSON.stringify(labelsFromResponse));

            const modLabels: any[] = clonedLabels.map((label: any) => {
                const foundLabel = labelsFromProps.find(
                    (f: any) => f.name === label.name
                );
                return foundLabel ? { ...foundLabel } : label;
            });

            const selectedLabels: any[] = modLabels
                .filter((label: any) => label.selected)
                .map((label: any) => label.name);

            setLabelsSelected(selectedLabels);

            setLabelsState(modLabels);
        }
    }, [labelsFromProps, labelsFromResponse, setLabelsState]);

    const updateLabels = (prev: any, e: any) => {
        let newL: any = [];

        for (let label of prev) {
            if (label.name === e) {
                newL.push({
                    ...label,
                    selected: label.selected ? false : true,
                });
            } else {
                newL.push(label);
            }
        }

        return newL;
    };

    const updateLabelsFromProps = (
        labelsState: any,
        propsLbl: any,
        e: string
    ) => {
        const labelsCp = [...propsLbl];

        const newLabels = propsLbl?.filter((filterLabel: any) => {
            const found = labelsState?.find(
                (f: any) => f.name === filterLabel.name
            );
            return found?.selected;
        });

        if (labelsCp?.length > 0 && propsLbl?.some((s: any) => s.name === e)) {
            const queriesCp = [...queries];
            const mapped = queriesCp?.map((qr) => {
                return qr.id === id ? { ...qr, labels: newLabels } : qr;
            });

            dispatch(panelAction(name, mapped));
        }
    };

    const onLabelSelected = useCallback(
        (e: any) => {
            let labelsStateUpd = updateLabels(labelsState, e);
            let selUpdated = updateLabelSelected(labelsSelected, e);
            updateLabelsFromProps(labelsStateUpd, propsLabels, e);
            setLabelsState(labelsStateUpd);
            setLabelsSelected(selUpdated);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [labelsState, labelsSelected, propsLabels]
    );

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

                        <ValuesSelector
                            {...props}
                            labelsSelected={labelsSelected}
                        />
                    </div>
                </ValuesListStyled>
            </ThemeProvider>
        );
    }
    return null;
}
