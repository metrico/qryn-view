import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Stats } from "../DataViews/components/Stats/Stats";
import { QueryBar } from "./components/QueryBar";
import { ValuesList } from "./components/ValuesList";

export default function LabelBrowser(props: any) {
    const {
        data: { dataSourceType, isShowStats, isBuilder },
    } = props;
    const isEmbed = useSelector((store:any) => store.isEmbed);

    const isLabelBrowser = useMemo(()=>{
        return !isBuilder
    },[isBuilder])
 
    return (
        <div style={{ margin: "3px 0px" }}>
            <QueryBar {...props} className={"query-bar-placeholder"} />

            {!isEmbed && dataSourceType === "logs"&& !isBuilder && <ValuesList {...props} />}
            {isShowStats && isLabelBrowser && <Stats {...props} />}
        </div>
    );
}
