import { useMemo } from "react";
import { useSelector } from "react-redux";

const useDataSources = (type:any) => {
    let dataSources = useSelector((store: any) => store.dataSources);

    const dsSelect = useMemo(() => {
        return dataSources?.reduce((a: any, b: any) => {
            return { ...a, [b.type]: b };
        }, {});
    }, [dataSources]);

    return dsSelect[type];
};
export default useDataSources;
