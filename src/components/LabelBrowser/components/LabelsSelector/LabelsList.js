import { useMemo } from "react";

function LabelItem(props) {

    const { selected, label, type } = props;
   
    const isSelected = useMemo(() => selected, [selected]);

    const selectedStyle = useMemo(() => {
        if (isSelected)
            return {
                borderColor: "#11abab",
                color: "#11abab",
            };
        else return {};
    }, [isSelected]);
    return (
        <small
            className={type}
            style={selectedStyle}
            onClick={(e) => props.onClick(label)}
        >
            {label}
        </small>
    );
}

export default function LabelsList(props) {
    const { labels, data } = props;
    const { dataSourceType } = data;

    const onClick = (e) => {
        if (e === "Select Metric") {
            props.onLabelSelected("__name__");
        }
        props.onLabelSelected(e);
    };

    const lsList = useMemo(() => {
        if (dataSourceType !== "metrics") {
            return labels;
        }

        return labels?.filter((f) => f.name !== "__name__");
    }, [dataSourceType, labels]);

    const metricLabel = useMemo(() => {
        if (dataSourceType !== "metrics") {
            return null;
        }
        return labels?.filter((f) => f.name === "__name__");
    }, [dataSourceType, labels]);

    return (
        <div className="valuelist-content">
            {metricLabel !== null && (
                <LabelItem
                    type={"metric"}
                    key={0}
                    label={"Select Metric"}
                    selected={metricLabel?.selected}
                    onClick={onClick}
                />
            )}

            {lsList &&
                lsList.map((label, key) => (
                    <LabelItem
                        key={key}
                        label={label.name}
                        selected={label.selected}
                        onClick={onClick}
                    />
                ))}
        </div>
    );
}
