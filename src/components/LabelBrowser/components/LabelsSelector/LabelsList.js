import { useMemo } from "react";
import styled from "@emotion/styled";

export const EmptyLabels = (props) => {
    
    const EmptyCont = styled.div`
        color: ${({ theme }) => theme.textColor};
        padding: 10px;
    `;

    return <EmptyCont>No labels available, please adjust API</EmptyCont>;
};

// split labels for metrics and labels for logs


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

    const onMetricOptionsClick = (e) => {

        console.log(e)
    }

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
            {/* {metricLabel !== null && lsList && dataSourceType === 'metrics' && (
                <LabelItem
                    type={"metric"}
                 
                    label={"Select Metric"}
                    selected={metricLabel?.selected}
                    onClick={onMetricOptionsClick}
                 //   onClick={onClick}
                />
            )} */}

            {lsList &&
                lsList.map((label, key) => (
                    <LabelItem
                        key={key}
                        label={label.name}
                        selected={label.selected}
                        onClick={onClick}
                    />
                ))}
            {!lsList && <EmptyLabels {...props} />}
        </div>
    );
}
