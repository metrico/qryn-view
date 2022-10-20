import { useSelector } from "react-redux";
import LabelSelectors from "../QueryBuilder/LabelSelectors";
import { QueryBar } from "./components/QueryBar";
import { ValuesList } from "./components/ValuesList";

export default function LabelBrowser(props) {
const isEmbed = useSelector(store=>store.isEmbed)
    return (
        <div style={{ margin: "3px 0px" }}>
            <QueryBar {...props} className={"query-bar-placeholder"} />
            {!isEmbed && <ValuesList {...props} />}
        </div>
    );
}
