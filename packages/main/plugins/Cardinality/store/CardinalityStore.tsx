import { create } from "zustand";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../consts";


type CardinalityTotal = {
    amount: number;
    prev: number;
    diff: number;
};

type TimeRange = {
    start: number;
    end: number;
};

export const toTimeSeconds = (time: Date) => {
    return dayjs(time).unix();
};

export const timeMinusOneDay = (time: Date) => {
    return dayjs(time).subtract(1, "day").unix();
};

type CardinalityState = {
    total: CardinalityTotal;
    timeRange: TimeRange; // this should be calculated in seconds from actual date 
    timeSeriesSelector: string;
    focusLabel: string;
    limitEntries: number;
    date: string;
    setDate: (day: string) => void;
    setTotal: (t: CardinalityTotal) => void;
    setTimeSeriesSelector: (text: string) => void;
    setTimeRange: (timeRange: TimeRange) => void;
    setFocusLabel: (text: string) => void;
    setLimitEntries: (amount: number) => void;
    reset: () => void;
};

const initialData = {
    total: { amount: 0, prev: 0, diff: 0 },

    date: dayjs().format(DATE_FORMAT),

    timeRange: {
        end: toTimeSeconds(new Date()),
        start: timeMinusOneDay(new Date()),
    },
    
    timeSeriesSelector: "",
    focusLabel: "",
    limitEntries: 10,
};

const useCardinalityStore =  create<CardinalityState>((set) => ({
    ...initialData,
    setTotal: (t: CardinalityTotal) => set(() => ({ total: t })),
    setTimeSeriesSelector: (text: string) =>
        set(() => ({ timeSeriesSelector: text })),
    setTimeRange: (timeRange: TimeRange) => set(() => ({ timeRange })),
    setFocusLabel: (text: string) => set(() => ({ focusLabel: text })),
    setLimitEntries: (amount: number) => set(() => ({ limitEntries: amount })),
    setDate: (day: string) => set(() => ({ date: day })),
    reset: () => set(() => ({ ...initialData })),
}));

export default useCardinalityStore;
