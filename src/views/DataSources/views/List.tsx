import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "../ui";


export function List() {
    const ds = useSelector(({ dataSources }: any) => dataSources);

    if (ds?.length > 0) {
        return (
            <div style={{margin:'10px'}}>
                {ds.map((item: any, idx: any) => {
                    const { icon, id, name, type, url } = item;
                    return (
                        <div className="ds-cont" key={idx}>
                            <Link to={id}>
                                <div className="ds-item">
                                    <Icon icon={icon} />
                                    <div className="ds-text">
                                        
                                            <div className="ds-type">{name}</div>
                                        <span>
                                            <small>
                                            {type} | {" "}
                                            </small>
                                            <small style={{userSelect: 'all'}}>
                                                {url}
                                            </small>
                                        </span>
                                        
                                    </div>
                                </div>
                            </Link>
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
