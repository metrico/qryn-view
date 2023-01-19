import QueriesContainer from "../QueryItem/QueriesContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { setRightPanel } from "../../actions/setRightPanel";
import { setLeftPanel } from "../../actions/setLeftPanel";
import DataViews from "../DataViews";

const PanelCont: any = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    min-width:50%;
`;
// Panel should have injected data
export default function Panel(props: any) {
    const ref: any = useRef(null);
    const [width, setWidth] = useState(0);

    const dispatch = useDispatch();
    const { name } = props;

    const panelDispatch = (name: string, data: any) => {
        if (name === "left") return setLeftPanel(data);
        return setRightPanel(data);
    };

    const panel = useSelector((store: any) => store[name]);
    const isSplit = useSelector((store: any) => store.isSplit);
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

    useEffect(()=>{
        if (typeof ref.current.clientWidth === 'number'){
            setWidth(ref.current.clientWidth)
        }
    },[ref?.current?.clientWidth])
    // 
    useEffect(() => {
        const onWindowResize = () => {
            setWidth(ref.current.clientWidth);
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);
    // CHECK ALSO THAT DATAVIEWS IS AN ARRAY

    return (
        <>
            <PanelCont isSplit={isSplit} ref={ref}>
                <QueriesContainer {...props} width={width} queries={panel} />
                <DataViews {...props} />
            </PanelCont>
        </>
    );
}
