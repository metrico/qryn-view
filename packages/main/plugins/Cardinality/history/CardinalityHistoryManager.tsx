const CARDINALITY_HISTORY = "cardinalityHistory";
const MAX_HISTORY = 10;
type TimeSeriesSelector = "timeSeriesSelector";
type FocusLabel = "focusLabel";
type LimitEntries = "limitEntries";

export type CardinalityHistoryItem = {
    type: TimeSeriesSelector | FocusLabel | LimitEntries;
    value: string | number;
};

type CardinalityHistory = CardinalityHistoryItem[] | [];

export class CardinalityHistoryManager {
    history: CardinalityHistory = [];
    maxHistory: number;
    constructor() {
        this.maxHistory = MAX_HISTORY;
    }

    setMaxHistory = (maxHistory: number) => {
        this.maxHistory = maxHistory;
    };

    getLocalHistory = () => {
        try {
            const historyElement = localStorage.getItem(CARDINALITY_HISTORY);

            if (historyElement && typeof historyElement === "string") {
                this.history =
                    (JSON.parse(historyElement) as CardinalityHistoryItem[]) ||
                    [];
            }
        } catch (e) {
            console.log("Error getting cardinality history", e);
        }

        return this.history;
    };

    setLocalHistoryItem = (
        name: CardinalityHistoryItem["type"],
        value: CardinalityHistoryItem["value"]
    ) => {
        const history = this.getLocalHistory() as CardinalityHistoryItem[];

        const historyFiltered =
            history.filter((item) => item.type !== name) || [];
        const historyFromType =
            history.filter((item) => item.type === name) || [];

        if (historyFromType.length === this.maxHistory) {
            historyFromType.shift();
        }

        const newHistory = [
            ...historyFiltered,
            ...historyFromType,
            { type: name, value: value },
        ];

        localStorage.setItem(CARDINALITY_HISTORY, JSON.stringify(newHistory));
    };

    getLocalHistoryItemsFromType = (name: CardinalityHistoryItem["type"]) => {
        const history = this.getLocalHistory() as CardinalityHistoryItem[];

        const items = history.filter((item) => item.type === name);
        return items;
    };
}
