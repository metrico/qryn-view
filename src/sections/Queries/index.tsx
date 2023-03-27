import { cx } from "@emotion/css";
import QueryItem from "../../components/QueryItem/QueryItem";
import { QueriesContainer } from "./styles";

const Queries = (props: any) => {
    const { queries, theme } = props;

    if (queries && Array.isArray(queries) && queries?.length > 0) {
        return (
            <div className={cx(QueriesContainer(theme))}>
                {queries?.map((query: any, idx: number) => (
                    <QueryItem {...props} data={query} key={idx} />
                ))}
            </div>
        );
    }
    return null;
};

export default Queries;
