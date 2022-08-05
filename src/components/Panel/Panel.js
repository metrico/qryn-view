import QueriesContainer from "../QueriesContainer/QueriesContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { setRightPanel } from "../../actions/setRightPanel";
import { setLeftPanel } from "../../actions/setLeftPanel";
import DataViews from "../DataView/DataViews";

const PanelCont = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: ${(props) => (props.isSplit ? "50%" : "100%")};
`;

export default function Panel(props) {
    const dispatch = useDispatch();
    const { name } = props;
    const left = useSelector((store) => store.left);
    const right = useSelector((store) => store.right);

    const isSplit = useSelector((store) => store.isSplit);
    const { hash } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(hash.replace("#", ""));



        const urlLeft = params.get("left");
        const urlRight = params.get("right");
        let leftQueries = [];
        let rightQueries = [];

        if (urlLeft) {
            leftQueries = JSON.parse(decodeURIComponent(urlLeft));
        }

        if (urlRight) {
            rightQueries = JSON.parse(decodeURIComponent(urlRight));
        }

        if (props.name === "right" && rightQueries.length > 0) {
            dispatch(setRightPanel(rightQueries));
        }

        if (props.name === "left" && leftQueries.length > 0) {
            dispatch(setLeftPanel(leftQueries));
        }
    }, []);

    // CHECK ALSO THAT DATAVIEWS IS AN ARRAY 

    


    const panelData = useMemo(() => {
        if (name === "left") {
            return left;
        } else {
            return right;
        }
    }, [left, right,name]);

    return (
        <>
            <PanelCont isSplit={isSplit}>
                <QueriesContainer {...props} queries={panelData} />
                <DataViews {...props}/>
            </PanelCont>
        </>
    );
}
