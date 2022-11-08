import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "../ui";


export function List() {
    const ds = useSelector(({ dataSources }) => dataSources);

    if (ds?.length > 0) {
        return (
            <div>
                {ds.map((item, idx) => {
                    const { icon, id, name, type, url } = item;
                    return (
                        <div className="ds-cont" key={idx}>
                            <div className="ds-item">
                                <Icon icon={icon} />
                                <div className="ds-text">
                                    <Link to={id}>
                                        <div className="ds-type">{name}</div>
                                    </Link>
                                    <small>
                                        {type} | {url}{" "}
                                    </small>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    return (
        <div>
            <h1>No Data Sources Found.</h1>
        </div>
    );
}
