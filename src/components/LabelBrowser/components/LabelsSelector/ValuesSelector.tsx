import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";
import { queryBuilder } from "../../helpers/querybuilder";
import ShowLogsButton from "../Buttons/ShowLogsButton";
import ValuesList from "./ValuesList";


function panelAction(name: string, value: any) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}

export default function ValuesSelector(props: any) {
    const { data, name } = props;
    const { dataSourceType, id } = data;
    const dispatch = useDispatch();
    const panelQuery = useSelector((store: any) => store[name]);
    const [labels, setLabels] = useState(props.labelsSelected);

    const labelsFiltered = useMemo(() => {
        if (dataSourceType === "metrics") {
            return labels.filter((f: any) => f.name !== "__name__");
        }
        return labels;
    }, [labels, dataSourceType]);

    const metricsSelection = useMemo(() => {
        if (dataSourceType === "metrics") {
            return labels.filter((f: any) => f.name === "__name__");
        }
        return null;
    }, [labels, dataSourceType]);

    const useQuery = () => {
        const qu = queryBuilder(data.labels, data.expr);
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.expr = qu;
                query.labels = data.labels;
            }
        });
        dispatch(panelAction(name, panel));
    };
    useEffect(() => {
        setLabels(props.labelsSelected);
    }, [props.labelsSelected, setLabels]);

    return (
        <div className="values-container">
            <div className="values-container-column">
                {metricsSelection !== null && labels.length > 0 && (
                    <ValuesList
                        {...props}
                        label={"__name__"}
                        type={"metrics"}
                    />
                )}
                {labels &&
                    labelsFiltered?.map((label: any, key: any) => (
                        <ValuesList
                            {...props}
                            label={label}
                            key={key}
                            type={"logs"}
                        />
                    ))}
            </div>
            <div style={{ margin: "3px", marginBottom: "6px" }}>
                <ShowLogsButton
                    onClick={useQuery}
                    isMobile={false}
                    alterText={"Use Query"}
                    loading={false}
                />
            </div>
        </div>
    );
}
