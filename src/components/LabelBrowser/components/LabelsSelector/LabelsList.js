import { useMemo } from "react";

function LabelItem(props) {
    const { selected, label } = props;
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
        <small style={selectedStyle} onClick={(e) => props.onClick(label)}>
            {label}
        </small>
    );
}

export default function LabelsList(props) {

    const { labels } = props;

    const onClick = (e) => {
        props.onLabelSelected(e);
    };

    const lsList = useMemo(() => labels, [labels]);

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
