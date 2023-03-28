import { cx } from "@emotion/css";
import { useTheme } from "../../theme";
import QueryItem from "./QueryItem";
import { QueriesContainer } from "./styles";
import PluginRenderer from "../../plugins/PluginsRenderer";
const Queries = (props: any) => {
    const { queries } = props;
    const theme = useTheme();
    if (queries && Array.isArray(queries) && queries?.length > 0) {
        return (
            <div className={cx(QueriesContainer(theme))}>
                {queries?.map((query: any, idx: number) => (
                    <QueryItem {...props} data={query} key={idx} />
                ))}
                <PluginRenderer section={'Queries'} localProps={{queries,theme}} /> 
            </div>
        );
    }
    return null;
};

export default Queries;
