import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DataViews from "@ui/main/components/DataViews";
import Queries from "../Queries";
import { panelDispatch } from "./helpers";
import { PanelCont } from "./styles";
import PluginRenderer from "@ui/plugins/PluginsRenderer";
interface PanelProps {
    name: string;
}

const Panel = (props: PanelProps) => {
    // props
    const { name } = props;

    // store
    const dispatch: any = useDispatch();
    const isSplit = useSelector((store: any) => store.isSplit);
    const panel = useSelector((store: any) => store[name]);

    // hooks
    const { hash } = useLocation();

    //local state
    const ref: any = useRef(null);
    const [width, setWidth] = useState(0);

    // effects
    //Init
    useEffect(() => {
        //  panels from url query params
        const params = new URLSearchParams(hash.replace(/#/, ""));
        const panelUrlData = params.get(name);
        let panelQueries = [];
        if (panelUrlData) {
            panelQueries = JSON.parse(decodeURIComponent(panelUrlData));
        }

        if (panelQueries?.length > 0) {
            dispatch(panelDispatch(name, panelQueries));
        }
        // Resize query container on window resize
        const onWindowResize = () => {
            setWidth(ref.current.clientWidth);
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };

        
    }, []);

    // set queries container with proportional to client width
    useEffect(() => {
        if (typeof ref?.current?.clientWidth === "number") {
            setWidth(ref.current.clientWidth);
        }
    }, [ref?.current?.clientWidth]);

    return (
        <>
            <PanelCont isSplit={isSplit} ref={ref}>
                <Queries {...props} width={width} queries={panel} />
                <PluginRenderer
                    section={"Panel"}
                    localProps={{ props, panel, width }}
                />
                <DataViews {...props} splitted={isSplit} />
            </PanelCont>
        </>
    );
};

export default Panel;
