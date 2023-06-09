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

    const { JSONClone, /* updateLabel, */ updateLabelSelected } = labelHelpers;
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

    const selected = useMemo(() => labelsSelected, [labelsSelected]);

    // match labels from query state with new labels from request to API

    useEffect(() => {
        if (labelsFromResponse && labelsFromProps) {
            let clonedLabels = JSONClone(labelsFromResponse);
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
    }, [labelsFromProps, labelsFromResponse, setLabelsState, JSONClone]);

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

    const updateLabelsFromProps = (labelsState: any, propsLbl: any) => {
        const labelsCp = [...propsLbl];
        const labelsFiltered = labelsCp.filter((f: any) => {
            if (
                labelsState?.some(
                    ({ name, selected }: any) => name === f.name && !selected
                )
            ) {
                return false;
            }
            return true;
        });

        const queriesCp = [...queries];
        let mapped = queriesCp?.map((qr: any) => {
            if (qr.id === id) {
                return { ...qr, labels: labelsFiltered };
            }
            return qr;
        });

        dispatch(panelAction(name, mapped));
    };

    const onLabelSelected = useCallback(
        (e: any) => {
            let labelsStateUpd = updateLabels(labelsState, e);
            let selUpdated = updateLabelSelected(labelsSelected, e);
            updateLabelsFromProps(labelsStateUpd, propsLabels);
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

                        <ValuesSelector {...props} labelsSelected={selected} />
                    </div>
                </ValuesListStyled>
            </ThemeProvider>
        );
    }
    return null;
}
