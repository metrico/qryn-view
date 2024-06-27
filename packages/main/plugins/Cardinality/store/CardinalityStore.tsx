import { create } from "zustand";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../consts";

type CardinalityTotal = {
    amount: number;
    prev: number;
    diff: number;
    quota: number;
};

type TimeRange = {
    start: number;
    end: number;
};

export enum ResponseEnum {
    GO = "GO",
    NODE = "NODE",
}

export type ResponseType = ResponseEnum.GO | ResponseEnum.NODE;

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
    responseType: ResponseType;
    date: string | Date;
    setDate: (day: string) => void;
    setTotal: (t: CardinalityTotal) => void;
    setTimeSeriesSelector: (text: string) => void;
    setTimeRange: (timeRange: TimeRange) => void;
    setFocusLabel: (text: string) => void;
    setLimitEntries: (amount: number) => void;
    deletedQueries: string[];
    setDeletedQueries: (query: string) => void;
    reset: () => void;
    setResponseType: (responseType: ResponseType) => void;
    isUpdating: boolean;
    setIsUpdating: (isUpdating: boolean) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    error: any;
    setError: (error: any) => void;
    tsdbStatus: any;
    setTsdbStatus: (tsdbStatus: any) => void;
};

const prevData = () => {
    let timeSeriesSelector = "";
    let date = dayjs().format(DATE_FORMAT);
    try {
        const local = JSON.parse(localStorage.getItem("cardinalityHistory"));
        if (local && local?.length > 0) {
            timeSeriesSelector = local[local?.length - 1].value;
        }
    } catch (e) {
        timeSeriesSelector = "";
    }

    try {
        const localDate = JSON.parse(
            localStorage.getItem("currentCardinalityDate")
        );
        if (localDate && localDate.value) {
            date = localDate.value;
        }
    } catch (e) {
        date = dayjs().format(DATE_FORMAT);
    }

    return { timeSeriesSelector, date };
};

const initialData = {
    total: { amount: 0, prev: 0, diff: 0, quota: 0 },

    date: prevData()["date"],

    timeRange: {
        end: toTimeSeconds(new Date()),
        start: timeMinusOneDay(new Date()),
    },
    responseType: ResponseEnum.NODE,
    isUpdating: false,
    timeSeriesSelector: prevData()["timeSeriesSelector"],
    focusLabel: "",
    limitEntries: 10,
    deletedQueries: [],
    isLoading: false,
    error: "",
    tsdbStatus: {},
};

const initialParams = {
    topN: 10,
    timeSeriesSelector: "",
    focusLabel: "",
};

const useCardinalityStore = create<CardinalityState>((set) => ({
    ...initialData,

    setIsUpdating: (isUpdating: boolean) => set(() => ({ isUpdating })),
    setTotal: (t: CardinalityTotal) => set(() => ({ total: t })),

    setTimeSeriesSelector: (text: string) =>
        set(() => ({ timeSeriesSelector: text })),
    setTimeRange: (timeRange: TimeRange) => set(() => ({ timeRange })),
    setFocusLabel: (text: string) => set(() => ({ focusLabel: text })),
    setLimitEntries: (amount: number) => set(() => ({ limitEntries: amount })),
    setDate: (day: string) => set(() => ({ date: day })),
    setDeletedQueries: (query: string) =>
        set((state) => ({ deletedQueries: [...state.deletedQueries, query] })),
    reset: () => set(() => ({ ...initialParams })),
    setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
    setResponseType: (responseType: ResponseType) =>
        set(() => ({ responseType })),
    setError: (error: any) => set(() => ({ error })),
    setTsdbStatus: (tsdbStatus: any) => set(() => ({ tsdbStatus })),
}));

export default useCardinalityStore;
