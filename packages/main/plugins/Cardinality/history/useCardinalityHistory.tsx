// here we should have a hook that returns the history of the cardinality
import { CardinalityHistoryManager } from "./CardinalityHistoryManager";
import { useMemo } from "react";

const useCardinalityHistory = () => {
    const historyManager = new CardinalityHistoryManager();

    const focusLabelHistory = historyManager.getLocalHistoryItemsFromType("focusLabel");
    const limitEntriesHistory =
        historyManager.getLocalHistoryItemsFromType("limitEntries");

    const focusLabelItems = useMemo(() => {
        return focusLabelHistory.map((item) => item.value) 
    }, [focusLabelHistory]);

    const timeSeriesSelectorItems = useMemo(() => {
        const timeSeriesSelectorHistory =
        historyManager.getLocalHistoryItemsFromType("timeSeriesSelector");
        return timeSeriesSelectorHistory.map((item) => item.value);
    }, [ historyManager.getLocalHistoryItemsFromType("timeSeriesSelector")]);

    const limitEntriesItems = useMemo(() => {
        return limitEntriesHistory.map((item) => item.value);
    }, [limitEntriesHistory]);

    const getHistory = () => {
        return historyManager.getLocalHistory();
    };

    const setHistoryItem = (name, value) => {
        historyManager.setLocalHistoryItem(name, value);
    };

    return {
        historyManager,
        getHistory,
        setHistoryItem,
        focusLabelItems,
        timeSeriesSelectorItems,
        limitEntriesItems,
    };
};

export default useCardinalityHistory;
