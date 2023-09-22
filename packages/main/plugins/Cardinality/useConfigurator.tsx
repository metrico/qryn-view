import  { useEffect, useState, ChangeEvent } from "react";
import useCardinalityStore from "./store/CardinalityStore";
import { useCardinalityRequest } from "./api/CardinalityRequest";


type useConfiguratorProps = {
    setHistoryItem: (key: string, value: string | number) => void;
}

const useConfigurator = ({setHistoryItem}:useConfiguratorProps) => {

    const {
        timeSeriesSelector,
        setTimeSeriesSelector,
        focusLabel,
        setFocusLabel,
        limitEntries,
        setLimitEntries,
        reset,
    } = useCardinalityStore();

    const { total: totalSeries } = useCardinalityStore();
const {handleCardinalityRequest} = useCardinalityRequest(); 
 
    

    const [query, setQuery] = useState(timeSeriesSelector);
    const [focus, setFocus] = useState(focusLabel);
    const [limit, setLimit] = useState(limitEntries);

    useEffect(() => {
        setQuery(timeSeriesSelector);
    }, [timeSeriesSelector]);

    useEffect(() => {
        setFocus(focusLabel);
    }, [focusLabel]);

    useEffect(() => {
        setLimit(limitEntries);
    }, [limitEntries]);

    const onTimeSeriesChange = (e: any) => {
        setQuery(() => e.target.value);
    };

    const onKeyDownTimeSeries = (e: any) => {
        if (e.keyCode === 13) {
            setTimeSeriesSelector(query);
            handleCardinalityRequest();
            setHistoryItem("timeSeriesSelector", query);
        }
    };

    const onFocusLabeChange = (e: any) => {
        setFocus(() => e.target.value);
    };

    const onKeyDownFocusLabel = (e: any) => {
        if (e.keyCode === 13) {
            setFocusLabel(focus);
            handleCardinalityRequest();
            setHistoryItem("focusLabel", focus);
        }
    };

    const onLimitEntriesChange = (e: any) => {
        setLimit(() => e.target.value);

    };

    const onKeyDownLimitEntries = (e: any) => {
        if (e.keyCode === 13) {
            setLimitEntries(Number(limit));
            handleCardinalityRequest();
            setHistoryItem("limitEntries", Number(limit));
            
        }
    };

    const onQueryHistoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setQuery(e.target.innerText);
        handleCardinalityRequest();
    };

    const onFocusHistoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setFocus(e.target.innerText);
        handleCardinalityRequest();
    }

    const onLimitHistoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
       
        setLimit(Number(e.target.innerText));
        handleCardinalityRequest();
    }   

    return {
        onTimeSeriesChange,
        onKeyDownTimeSeries,
        onFocusLabeChange,
        onKeyDownFocusLabel,
        onLimitEntriesChange,
        onKeyDownLimitEntries,
        onQueryHistoryChange,
        onFocusHistoryChange,
        onLimitHistoryChange,
        query,
        focus,
        limit,
        totalSeries,
        reset,
    }

}

export default useConfigurator;