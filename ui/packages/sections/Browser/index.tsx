import { useSelector } from "react-redux";
import ValuesList from "@ui/main/src/components/LabelsSelector/ValuesList";
import { Stats } from "@ui/main/src/components/Stats/Stats";
import { QueryBar } from "./QueryBar";

const Browser = (props: any) => {
    const {
        data: { dataSourceType, isShowStats, isBuilder },
    } = props;

    const isEmbed = useSelector((store: any) => store.isEmbed);

    return (
        <div style={{ margin: "3px 0px" }}>
            <QueryBar {...props} className={"query-bar-placeholder"} />

            {!isEmbed && dataSourceType === "logs" && !isBuilder && (
                <ValuesList {...props} />
            )}
            {isShowStats && !isBuilder && <Stats {...props} />}
        </div>
    );
};

export default Browser;
