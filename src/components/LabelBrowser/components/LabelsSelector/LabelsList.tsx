import { useMemo } from "react";
import styled from "@emotion/styled";
import ShowLogsButton from "../Buttons/ShowLogsButton";
import { queryBuilder } from "../../helpers/querybuilder";
import { useDispatch, useSelector } from "react-redux";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";
import store from "../../../../store/store";

function panelAction(name: any, value: any) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}
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
    const dispatch = useDispatch();
    const { labels, data, name } = props;
    const { dataSourceType } = data;
    const panelQuery = useSelector((store: any) => store[name]);

    const onClick = (e: any) => {
        if (e === "Select Metric") {
            props.onLabelSelected("__name__");
        }
        props.onLabelSelected(e);
    };

    const onMetricOptionsClick = (e: any) => {

        console.log(e)
    }

    const lsList = useMemo(() => {
        if (dataSourceType !== "metrics") {
            return labels;
        }

        return labels?.filter((f: any) => f.name !== "__name__");
    }, [dataSourceType, labels]);

    const useQuery = () => {
        const qu = queryBuilder(data.labels, data.expr)
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === props.data.id) {
                query.expr = qu;
                query.labels = data.labels
            }
        });
        dispatch(panelAction(name, panel));
    }
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
                <>
                    {lsList.map((label: any, key: any) => (
                        <LabelItem
                            key={key}
                            label={label.name}
                            selected={label.selected}
                            onClick={onClick}
                        />
                    ))}
                    <ShowLogsButton
                        onClick={useQuery}
                        isMobile={false}
                        alterText={"Use Query"}
                        loading={false}
                    />
                </>
            }
                
            {!lsList && <EmptyLabels {...props} />}
        </div>
    );
}
