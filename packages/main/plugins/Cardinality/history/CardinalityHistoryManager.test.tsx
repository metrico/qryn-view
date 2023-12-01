import { CardinalityHistoryManager } from "./CardinalityHistoryManager";

import { test, expect, describe } from "vitest";

const manager = new CardinalityHistoryManager();
manager.setMaxHistory(10);

describe("CardinalityHistoryManager", () => {
    test("should get the local history as an empty array", () => {
        const history = manager.getLocalHistory();
        expect(history).toEqual([]);
    });

    test("should set a new item to the local history", () => {
        manager.setLocalHistoryItem("timeSeriesSelector", "test");
        const history = manager.getLocalHistory();
        expect(history).toEqual([
            { type: "timeSeriesSelector", value: "test" },
        ]);
    });

    test("should get the local history item", () => {
        const item = manager.getLocalHistoryItemsFromType("timeSeriesSelector");
        expect(item).toEqual({ type: "timeSeriesSelector", value: "test" });
    });

    test("should get the local history as an array with one item", () => {
        const history = manager.getLocalHistory();
        expect(history).toEqual([
            { type: "timeSeriesSelector", value: "test" },
        ]);
    });

    test("should set a new item to the local history", () => {
        manager.setLocalHistoryItem("focusLabel", "test");
        const history = manager.getLocalHistory();
        expect(history).toEqual([
            { type: "timeSeriesSelector", value: "test" },
            { type: "focusLabel", value: "test" },
        ]);
    });

    test("should get the local history item", () => {
        const item = manager.getLocalHistoryItemsFromType("focusLabel");
        expect(item).toEqual({ type: "focusLabel", value: "test" });
    });

    test("should remove last item from list when there are ten and add a new one", () => {
        manager.setLocalHistoryItem("limitEntries", 12);
        manager.setLocalHistoryItem("limitEntries", 2);
        manager.setLocalHistoryItem("limitEntries", 3);
        manager.setLocalHistoryItem("limitEntries", 5);
        manager.setLocalHistoryItem("limitEntries", 4);
        manager.setLocalHistoryItem("limitEntries", 1);
        manager.setLocalHistoryItem("limitEntries", 2);
        manager.setLocalHistoryItem("limitEntries", 4);
        manager.setLocalHistoryItem("limitEntries", 5);
        manager.setLocalHistoryItem("limitEntries", 6);
        manager.setLocalHistoryItem("limitEntries", 1);

        const history = manager.getLocalHistory();
        expect(history).toEqual([
            { type: "timeSeriesSelector", value: "test" },
            { type: "focusLabel", value: "test" },
            { type: "limitEntries", value: 2 },
            { type: "limitEntries", value: 3 },
            { type: "limitEntries", value: 5 },
            { type: "limitEntries", value: 4 },
            { type: "limitEntries", value: 1 },
            { type: "limitEntries", value: 2 },
            { type: "limitEntries", value: 4 },
            { type: "limitEntries", value: 5 },
            { type: "limitEntries", value: 6 },
            { type: "limitEntries", value: 1 },
        ]);
    });

    test("adding more values should remain order", () => {
        manager.setLocalHistoryItem("focusLabel", "terminal");
        manager.setLocalHistoryItem("timeSeriesSelector", '{type="terminal"}');

        const history = manager.getLocalHistory();

        expect(history).toEqual([
            { type: "limitEntries", value: 2 },
            { type: "limitEntries", value: 3 },
            { type: "limitEntries", value: 5 },
            { type: "limitEntries", value: 4 },
            { type: "limitEntries", value: 1 },
            { type: "limitEntries", value: 2 },
            { type: "limitEntries", value: 4 },
            { type: "limitEntries", value: 5 },
            { type: "limitEntries", value: 6 },
            { type: "limitEntries", value: 1 },
            { type: "focusLabel", value: "test" },
            { type: "focusLabel", value: "terminal" },
            { type: "timeSeriesSelector", value: "test" },
            { type: "timeSeriesSelector", value: '{type="terminal"}' },
        ]);
    });
});
