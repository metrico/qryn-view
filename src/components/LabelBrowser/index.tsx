import { useSelector } from "react-redux";
import { Stats } from "../DataViews/components/Stats/Stats";
import { QueryBar } from "./components/QueryBar";
import { ValuesList } from "./components/ValuesList";

export default function LabelBrowser(props: any) {
    const {
        data: { dataSourceType, isShowStats },
    } = props;
    const isEmbed = useSelector((store: any) => store.isEmbed);
    return (
        <div style={{ margin: "3px 0px" }}>
            <QueryBar {...props} className={"query-bar-placeholder"} />

            {!isEmbed && dataSourceType === "logs" && <ValuesList {...props} />}
            {isShowStats && <Stats {...props} />}
        </div>
    );
}
