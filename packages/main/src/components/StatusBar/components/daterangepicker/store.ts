import { create } from "zustand";
// each time picker belongs to a different query, so it will be mostly a list of time-start time-end , query id and the label.
export type DateRangeItem = {
    id: string;
    label?: string;
    start: number;
    end: number;
    rangeOpen?: boolean;
}

export type DateRangePickerStore = {
rangeItems: DateRangeItem[];
addRangeItem: (rangeItem: DateRangeItem) => void;
removeRangeItem: (id: string) => void;
updateRangeItem: (id: string, rangeItem: DateRangeItem) => void;
selectRangeItem: (id: string) => void;
}

export const initialStore = {
    rangeItems: [
        {
            start: 0,
            end: 0,
            label: "Last 1 hour",
            rageOpen: false,
        }
    ],
};

export const dateRangePickerStore = create((set) => ({
...initialStore,
addRangeItem: (rangeItem: DateRangeItem) => set((state) => ({
    rangeItems: [...state.rangeItems, rangeItem]
})),
removeRangeItem: (id: string) => set((state) => ({
    rangeItems: state.rangeItems.filter((item) => item.id !== id)
})),
updateRangeItem: (id: string, rangeItem: DateRangeItem) => set((state) => ({
    rangeItems: state.rangeItems.map((item) => item.id === id ? rangeItem : item)
})),
selectRangeItem: (id: string) => set((state) => ({
    rangeItems: state.rangeItems.map((item) => item.id === id ? { ...item, rangeOpen: !item.rangeOpen } : item)
})),
}));