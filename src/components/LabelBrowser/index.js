import { useSelector } from "react-redux";
import { QueryBar } from "./components/QueryBar";
import { ValuesList } from "./components/ValuesList";

export default function LabelBrowser(props) {
    const {data:{dataSourceType}} = props
    const isEmbed = useSelector((store) => store.isEmbed);
    return (
        <div style={{ margin: "3px 0px" }}>

            <QueryBar {...props} className={"query-bar-placeholder"} />

            {!isEmbed && dataSourceType === 'logs' && <ValuesList {...props} />}
        </div>
    );
}
