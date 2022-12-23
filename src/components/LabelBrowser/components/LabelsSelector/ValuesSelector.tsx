import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ValuesList from "./ValuesList";

export default function ValuesSelector(props: any) {
    const { data, name } = props;
    const { dataSourceType, id } = data;
    const panel = useSelector((store: any) => store[name])
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

    useEffect(() => {
        setLabels(props.labelsSelected);
    }, [props.labelsSelected, setLabels]);

    return (
        <div className="values-container">
            <div className="values-container-column">
                {metricsSelection !== null && labels.length > 0 && (
                    <ValuesList {...props} label={"__name__"} type={'metrics'} />
                )}
                {labels &&
                    labelsFiltered?.map((label: any, key: any) => (
                        <ValuesList {...props} label={label} key={key} type={'logs'} />
                    ))}
            </div>
        </div>
    );
}
