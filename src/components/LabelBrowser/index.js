import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";

export default function LabelBrowser(props) {
    return (
        <div style={{ margin: "3px 0px" }}>
            <QueryBar {...props} className={"query-bar-placeholder"} />

            <ValuesList {...props} />
        </div>
    );
}
