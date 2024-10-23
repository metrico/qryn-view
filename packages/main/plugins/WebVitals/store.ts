import { create } from "zustand";


// init as true if VITE_WEB_VITALS == true 

export type WebVitalsStoreType = {
    webVitalsActive: boolean;
    httpPerformanceActive: boolean;
    apiUrl: string | null;
    setWebVitalsActive: (active: boolean) => void;
    setHttpPerformanceActive: (active: boolean) => void;
    setApiUrl: (apiUrl: string) => void;
    qrynInstance: string;
    setQrynInstance: (qrynInstance) => void;
};

const initialState = {
    webVitalsActive:
        JSON.parse(localStorage.getItem("webVitalsActive") ?? "false") ?? false,
    httpPerformanceActive:
        JSON.parse(localStorage.getItem("httpPerformanceActive") ?? "false") ??
        false,
    qrynInstance:
        JSON.parse(localStorage.getItem("qrynInstance") ?? "false") ?? false,
    apiUrl: null,
};
export const WebVitalsStore = create<WebVitalsStoreType>((set) => ({
    ...initialState,
    setWebVitalsActive: (active) => {
        localStorage.setItem("webVitalsActive", JSON.stringify(!active));
        return set({ webVitalsActive: !active });
    },
    setHttpPerformanceActive: (active) => {
        localStorage.setItem("httpPerformanceActive", JSON.stringify(!active));
        return set({ webVitalsActive: !active });
    },
    setQrynInstance: (qrynInstance) => {
        localStorage.setItem("qrynInstance", JSON.stringify(qrynInstance));

        return set({ qrynInstance });
    },
    setApiUrl: (url) => set({ apiUrl: url }),
}));
