import { useMemo } from "react";
import styled from "@emotion/styled";


export const EmptyLabels = (props: any) => {

    const EmptyCont = styled.div`
        color: ${({ theme }: any) => theme.textColor};
        padding: 10px;
    `;

    return <EmptyCont>No labels available, please adjust API</EmptyCont>;
};

// split labels for metrics and labels for logs


function LabelItem(props: any) {

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


export default function LabelsList(props: any) {
    const { labels, data } = props;
    const { dataSourceType } = data;


    const onClick = (e: any) => {
        if (e === "Select Metric") {
            props.onLabelSelected("__name__");
        }
        props.onLabelSelected(e);
    };

    const lsList = useMemo(() => {
        if (dataSourceType !== "metrics") {
            return labels;
        }

        return labels?.filter((f: any) => f.name !== "__name__");
    }, [dataSourceType, labels]);

    return (
        <div className="valuelist-content">
            {lsList && (
                <>
                    {lsList.map((label: any, key: any) => (
                        <LabelItem
                            key={key}
                            label={label.name}
                            selected={label.selected}
                            onClick={onClick}
                        />
                    ))}
                </>
            )}

            {!lsList && <EmptyLabels {...props} />}
        </div>
    );
}
