import { create } from "zustand";

export type WebVitalsStoreType = {
    active: boolean;
    setActive: (active: boolean) => void;
};

const initialState = {
    active:
        JSON.parse(localStorage.getItem("webVitalsActive") ?? "false") ?? false,
};
export const WebVitalsStore = create<WebVitalsStoreType>((set) => ({
    ...initialState,
    setActive: (active) => {
        localStorage.setItem("webVitalsActive", JSON.stringify(!active));
        return set({ active: !active });
    },
}));
