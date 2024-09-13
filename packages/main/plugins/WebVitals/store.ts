import { create } from "zustand";

export type WebVitalsStoreType = {
    active: boolean;
    apiUrl: string | null;
    setActive: (active: boolean) => void;
    setApiUrl: (apiUrl:string) => void;
};

const initialState = {
    active:
        JSON.parse(localStorage.getItem("webVitalsActive") ?? "false") ?? false,
        apiUrl: null,
};
export const WebVitalsStore = create<WebVitalsStoreType>((set) => ({
    ...initialState,
    setActive: (active) => {
        localStorage.setItem("webVitalsActive", JSON.stringify(!active));
        return set({ active: !active });
    },
    setApiUrl:(url) => set({apiUrl:url}),
}));
