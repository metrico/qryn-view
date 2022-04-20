import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";
import { useSelector } from "react-redux";
export default function LabelBrowser() {
    const labelsBrowserOpen = useSelector(store => store.labelsBrowserOpen)

    return (
        <div>
            <QueryBar className={"query-bar-placeholder"} />
            {labelsBrowserOpen && (
                <ValuesList />
            )}

        </div>
    );
}
