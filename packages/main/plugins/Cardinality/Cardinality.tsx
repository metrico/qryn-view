import Configurator from "./Configurator";
import { setIsCardinality } from "./store/setIsCardinality";
import { useDispatch, useSelector } from "react-redux";
import { useCardinalityData } from "./api/useCardinalityData";
import { useEffect, useState } from "react";
import useTheme from "@ui/theme/useTheme";
import CardinalitySeries from "./CardinalitySeries";
import useCardinalityHistory from "./history/useCardinalityHistory";
import CardinalityTotals from "./TotalsPanel/CardinalityTotals";

export const setLocalTabsState = (value: number) => {
    try {
        const localTabs = JSON.parse(
            localStorage.getItem("localCardinalityTabsState") || "{}"
        );

        localTabs["value"] = value;

        localStorage.setItem("localTabsState", JSON.stringify(localTabs));
    } catch (e) {
        console.log(e);
    }
};

export const getLocalTabsState = () => {
    try {
        const tabsState = JSON.parse(
            localStorage.getItem("localCardinalityTabsState") || "{}"
        );

        return tabsState.value || 0;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

export const Cardinality = () => {
    const dispatch: any = useDispatch();
    const theme = useTheme();
    const isCardinality = useSelector((store: any) => store.isCardinality);

    const [activeTab, setActiveTab] = useState(getLocalTabsState());

    const onTabChange = (event: any, newValue: any) => {
        //   console.log(tab)
        setActiveTab(() => newValue);
        setLocalTabsState(newValue);
    };

    useEffect(() => {
        dispatch(setIsCardinality(true));
        return () => {
            dispatch(setIsCardinality(false));
        };
    }, []);

    const {
        setHistoryItem,
        focusLabelItems,
        timeSeriesSelectorItems,
        limitEntriesItems,
        historyManager,
    } = useCardinalityHistory();

    const { totalSeries, formattedSeries, isLoading } = useCardinalityData(
        historyManager,
        setHistoryItem
    );

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Configurator
                theme={theme}
                total={totalSeries}
                setHistoryItem={setHistoryItem}
                focusLabelItems={focusLabelItems}
                timeSeriesSelectorItems={timeSeriesSelectorItems}
                limitEntriesItems={limitEntriesItems}
                onTabChange={onTabChange}
                activeTab={activeTab}
                percent={35}
            />
            {!isLoading && (
                <CardinalityDashboardContainer
                    formattedSeries={formattedSeries}
                    isCardinality={isCardinality}
                    isLoading={isLoading}
                    activeTab={activeTab}
                />
            )}
        </div>
    );
};

export type DarboardContainerProps = {
    formattedSeries: any;
    isCardinality: boolean;
    isLoading: boolean;
    activeTab: number;
};

export const CardinalityDashboardContainer = ({
    formattedSeries,
    isCardinality,
    isLoading,
    activeTab,
}: DarboardContainerProps) => {
    return (
        <>
            {activeTab === 0 && (
                <CardinalitySeries
                    formattedSeries={formattedSeries}
                    isCardinality={isCardinality}
                    isLoading={isLoading}
                />
            )}
            {activeTab === 1 && <CardinalityTotals isLoading={isLoading} />}
        </>
    );
};
