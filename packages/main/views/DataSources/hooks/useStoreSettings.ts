import { useDispatch } from "react-redux";
import setDataSources from "../store/setDataSources";
import { create } from "zustand";
import store from "@ui/store/store";

export type SettingsStoreType = {
    settings: any;
    setSettings: (settings: any) => void;
};
const initialData = {
    settings: store.getState().dataSources,
};

const settingsStore = create<SettingsStoreType>((set) => ({
    ...initialData,
    setSettings: (newSettings: any) => set(() => ({ settings: newSettings })),
}));

export const useStoreSettings = () => {
    const dispatch: any = useDispatch();

    const { settings, setSettings } = settingsStore();

    const storeDataSources = () => {
        localStorage.setItem("dataSources", JSON.stringify(settings));
        dispatch(setDataSources(settings));
    };

    const storeSettings = (newSetting) => {
        setSettings(newSetting);
    };

    return {
        settings,
        setSettings,
        storeSettings,
        storeDataSources,
    };
};
