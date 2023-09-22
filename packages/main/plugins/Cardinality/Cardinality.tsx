import Configurator from "./Configurator";
import { setIsCardinality } from "./store/setIsCardinality";
import { useDispatch, useSelector } from "react-redux";
import { useCardinalityData } from "./api/useCardinalityData";
import { useEffect } from "react";
import useTheme from "@ui/theme/useTheme";
import CardinalitySeries from "./CardinalitySeries";
import useCardinalityHistory from "./history/useCardinalityHistory";

export const Cardinality = () => {
    const dispatch: any = useDispatch();
    const theme = useTheme();
    const isCardinality = useSelector((store: any) => store.isCardinality);

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
                percent={35}
            />
            {!isLoading && (
                <CardinalitySeries
                    formattedSeries={formattedSeries}
                    isCardinality={isCardinality}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};
