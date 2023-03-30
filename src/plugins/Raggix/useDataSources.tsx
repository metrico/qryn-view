import { useMemo } from "react";
import { useSelector } from "react-redux";

const useDataSources = () => {
    let dataSources = useSelector((store: any) => store.dataSources);

    const dsSelect = useMemo(() => {
        return dataSources?.reduce((a: any, b: any) => {
            return { ...a, [b.name]: b };
        }, {});
    }, [dataSources]);

    return dsSelect;
};
export default useDataSources;
