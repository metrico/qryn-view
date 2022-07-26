import StatusBar from "../StatusBar";
import DataView from "../DataView/DataView";
import QueriesContainer from "../QueriesContainer/QueriesContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setPanelsData } from "../../actions/setPanelsData";
import { nanoid } from "nanoid";

import styled from "@emotion/styled";

const PanelCont = styled.div`
display: flex;
flex-direction: column;
flex:1; 
width: ${(props) => (props.isSplit ? "50%" : "100%")};
`;

export default function Panel(props) {
    const dispatch = useDispatch();
    const panels = useSelector((store) => store.panels);
    const isSplit = useSelector((store) => store.isSplit);

    useEffect(() => {
        if (props.name === "right") {
            const leftClone = JSON.stringify(panels.left);
            let leftCloned = JSON.parse(leftClone);
            const indexed = leftCloned.queries.map((m) => ({
                ...m,
                id: nanoid(),
            }));
            leftCloned["queries"] = indexed;
            dispatch(
                setPanelsData({
                    left: { ...panels?.left },
                    right: { ...leftCloned },
                })
            );
        }
    }, []);

    const panelsData = useMemo(() => {
        return panels?.[props.name]?.queries;
    }, [panels, props?.name]);

    return (
        <>
            <PanelCont isSplit={isSplit}>
                <QueriesContainer {...props} queries={panelsData} />

                <DataView {...props} />
            </PanelCont>
        </>
    );
}
