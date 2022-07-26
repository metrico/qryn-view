import { useMemo } from "react";

function LabelItem(props) {
    const isSelected = useMemo(() => props.selected, [props.selected]);
    return (
        <small
            style={
                isSelected ? { borderColor: "#11abab", color: "#11abab" } : {}
            }
            onClick={(e) => props.onClick(props.label)}
        >
            {props.label}
        </small>
    );
}

export default function LabelsList(props) {
    const onLabelSelected = (label) => {
        props.onLabelSelected(label);
    };

    const onClick = (e) => {
        onLabelSelected(e);
    };

    const lsList = useMemo(() => props.labels, [props.labels]);

    return (
        <div className="valuelist-content">
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
