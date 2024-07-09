import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setDataSources from "../store/setDataSources";

export const useStoreSettings = () => {
    const state = useSelector(({ dataSources }: any) => dataSources);
    const dispatch: any = useDispatch();

    const [settings, setSettings] = useState(state);
    const storeDataSources = () => {
        localStorage.setItem("dataSources", JSON.stringify(settings));
        dispatch(setDataSources(settings));
    }

    return {
        settings,
        setSettings,
        storeDataSources,
    };
};
