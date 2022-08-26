import QueriesContainer from "../QueriesContainer/QueriesContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { setRightPanel } from "../../actions/setRightPanel";
import { setLeftPanel } from "../../actions/setLeftPanel";
import DataViews from "../DataViews";

const PanelCont = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: ${(props) => (props.isSplit ? "50%" : "100%")};
`;
// Panel should have injected data
export default function Panel(props) {
    const dispatch = useDispatch();
    const { name } = props;

    const panelDispatch = (name, data) => {
        if (name === "left") return setLeftPanel(data);
        return setRightPanel(data);
    };

    const panel = useSelector((store) => store[name]);
    const isSplit = useSelector((store) => store.isSplit);
    const { hash } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(hash.replace("#", ""));
        const panelUrlData = params.get(name);
        let panelQueries = [];
        if (panelUrlData) {
            panelQueries = JSON.parse(decodeURIComponent(panelUrlData));
        }

        if (panelQueries?.length > 0) {
            dispatch(panelDispatch(name, panelQueries));
        }
    }, []);

    // CHECK ALSO THAT DATAVIEWS IS AN ARRAY

    const panelData = useMemo(() => panel, [panel]);

    return (
        <>
            <PanelCont isSplit={isSplit}>
                <QueriesContainer {...props} queries={panelData} />
                <DataViews {...props} />
            </PanelCont>
        </>
    );
}
