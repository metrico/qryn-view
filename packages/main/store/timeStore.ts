import create from "zustand";
import { persist } from "zustand/middleware";
export type TimeState = {
    rangeLabel: string;
    isTimeLookup: boolean;
    setRangeLabel: (rl: string) => void;
    setIsTimeLookup: (tl: boolean) => void;
};

export const timeStore = create(
    persist(
        (set): TimeState => ({
            rangeLabel: "Last 1 hour",
            isTimeLookup: true,
            setRangeLabel: (rl: string) => set({ rangeLabel: rl }),
            setIsTimeLookup: (tl: boolean) => set({ isTimeLookup: tl }),
        }),
        { name: "time-lookup" }
    )
);
