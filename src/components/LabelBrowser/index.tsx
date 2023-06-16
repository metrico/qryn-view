import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Stats } from "../Stats/Stats";
import QueryBar from "./components/QueryBar";
import { ValuesList } from "./components/ValuesList";

export type LabelBrowserProps = {
    data: any; // current query
    queries: any; // qyeries list 
    name: string; // panel name 
    launchQuery: string; 
    width: number;
};

const LabelBrowser: React.FC<LabelBrowserProps> = (props) => {

    const {
        data: { dataSourceType, isShowStats, isBuilder },
        launchQuery,
    } = props;

    const isEmbed = useSelector((store: any) => store.isEmbed);

    // display valuesList only if it's a logs datasource
    const valuesListRenderer = (
        isEmbed: boolean,
        dataSourceType: string,
        isBuilder: boolean
    ) => {
        return (
            !isEmbed &&
            dataSourceType === "logs" &&
            !isBuilder && <ValuesList {...props} />
        );
    };

    const statsRenderer = (isShowStats: boolean, isLabelBrowser: boolean) => {
        return isShowStats && isLabelBrowser && <Stats {...props} />;
    };

    const isLabelBrowser = useMemo(() => {
        return !isBuilder;
    }, [isBuilder]);

    return (
        <div style={{ margin: "3px 0px" }}>
            <QueryBar {...props} launchQuery={launchQuery} />
            {valuesListRenderer(isEmbed, dataSourceType, isBuilder)}
            {statsRenderer(isShowStats, isLabelBrowser)}
        </div>
    );
};

export default LabelBrowser;
