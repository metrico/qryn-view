import { useEffect, useState } from "react";
import ValuesList from "./ValuesList";
export default function ValuesSelector(props) {
    const [labels, setLabels] = useState(props.labelsSelected);

    useEffect(() => {
        setLabels(props.labelsSelected);
    }, [props.labelsSelected, setLabels]);

    return (
        <div className="values-container">
            <div className="values-container-column">
                {labels &&
                    labels?.map((label, key) => (
                        <ValuesList {...props} label={label} key={key} />
                    ))}
            </div>
        </div>
    );
}
