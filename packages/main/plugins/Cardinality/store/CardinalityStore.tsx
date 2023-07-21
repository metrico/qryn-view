import { create } from "zustand";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../consts";

type CardinalityTotal = {
    amount: number;
    prev: number;
    diff: number;
};

type CardinalityState = {
    total: CardinalityTotal;
    timeSeriesSelector: string;
    focusLabel: string;
    limitEntries: number;
    date: string;
    setDate: (day: string) => void;
    setTotal: (t: CardinalityTotal) => void;
    setTimeSeriesSelector: (text: string) => void;
    setFocusLabel: (text: string) => void;
    setLimitEntries: (amount: number) => void;
    reset: () => void;
};

const initialData = {
    total: { amount: 0, prev: 0, diff: 0 },
    timeSeriesSelector: "",
    focusLabel: "",
    limitEntries: 10,
};

const useCardinalityStore = create<CardinalityState>((set) => ({
    ...initialData,
    date: dayjs().format(DATE_FORMAT),
    setTotal: (t: CardinalityTotal) => set(() => ({ total: t })),
    setTimeSeriesSelector: (text: string) =>
        set(() => ({ timeSeriesSelector: text })),
    setFocusLabel: (text: string) => set(() => ({ focusLabel: text })),
    setLimitEntries: (amount: number) => set(() => ({ limitEntries: amount })),
    setDate: (day: string) => set(() => ({ date: day })),
    reset: () => set(() => ({ ...initialData })),
}));

export default useCardinalityStore;
