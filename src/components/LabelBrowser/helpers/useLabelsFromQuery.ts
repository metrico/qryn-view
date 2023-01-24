import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useLabelsFromQuery() {
    const actualQuery = useSelector((store: any) => store.query);
    const [labels, setLabels] = useState([]);

    function getLabels(query: any) {
        return query.split(/[{}]/);
    }
    useEffect(() => {
        setLabels(getLabels(actualQuery));
    }, [actualQuery]);

    return labels;
}
