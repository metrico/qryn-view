import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsSubmit, setQuery } from "../../actions";
import loadLogs from "../../actions/loadLogs";
import setLoading from "../../actions/setLoading";
import { setLabelsBrowserOpen } from "../../actions/setLabelsBrowserOpen";
import localService from "../../services/localService";
import setQueryHistory from "../../actions/setQueryHistory";
import HistoryIcon from "@mui/icons-material/History";
import styled from "@emotion/styled";
import setHistoryOpen from "../../actions/setHistoryOpen";
import { Tooltip } from "@mui/material";

const HistoryButton = styled.button`
    background: none;
    color: #ddd;
    font-size: 14px;
    border: none;
    cursor: pointer;
`;
export const QueryBar = () => {
    //const [query, setQuery] = useState(props.query);

    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen);
    const debug = useSelector((store) => store.debug);
    const query = useSelector((store) => store.query);
    const isSubmit = useSelector((store) => store.isSubmit);
    const historyOpen = useSelector((store) => store.historyOpen)
    const [queryInput, setQueryInput] = useState(query);
    const [queryValid, setQueryValid] = useState(false);
    
    const SHOW_LOGS = "Show Logs";
    const LOG_BROWSER = "Log Browser";
    const queryHistory = useSelector((store) => store.queryHistory)
    const [historyItems, setHistoryItems] = useState(queryHistory.length>0)

    useEffect(()=>{
        setHistoryItems(queryHistory.length>0)
    },[queryHistory])

    const onQueryValid = (query) => {
        return query !== "{" && query !== "}" && query !== "{}" && query !== ""; // TODO: make a proper query validation
    };

    useEffect(() => {
        // force a query to be run after load of component
        if (debug)
            console.log("🚧 LOGIC/QueryBar/", typeof query, query.length);

        if (onQueryValid(query && isSubmit === "true")) {
            if (debug)
                console.log(
                    "🚧 LOGIC/QueryBar/ dispatch ",
                    query !== "{}",
                    query.length > 0,
                    query !== "{}" || query.length > 1
                );
            // here
            dispatch(setLoading(true));

            dispatch(loadLogs());

            setTimeout(() => {
                dispatch(setIsSubmit(false));
            }, 200);
        } else if (!onQueryValid(query) && isSubmit === "true") {
            dispatch(setIsSubmit(false));
        }
    }, []);

    useEffect(() => {
        setQueryInput(query);
        setQueryValid(onQueryValid(query));
    }, [query, queryInput]);

    const onValueDisplay = (e) => {
        e.preventDefault();
        const isOpen = labelsBrowserOpen ? false : true;
        dispatch(setLabelsBrowserOpen(isOpen));
    };

    const handleChange = (e) => {
        const qr = e.target.value;
        setQueryInput(qr);
        dispatch(setQuery(qr));
    };

    const onBrowserActive = () => {
        return !labelsBrowserOpen
            ? {
                  borderColor: "#11abab",
              }
            : {};
    };

    const handleInputKeyDown = (e) => {
        if (e.code === "Enter" && e.ctrlKey) {
            onSubmit(e);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(setQuery(queryInput));

        if (onQueryValid(query)) {
            try {
                const historyUpdated = historyService.add({
                    data: query,
                    url: window.location.hash,
                });
                dispatch(setQueryHistory(historyUpdated));
                dispatch(setLabelsBrowserOpen(false));
                dispatch(loadLogs());
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("Please make a log query", query);
        }
    };
    function handleHistoryClick(e){
        dispatch((setHistoryOpen(!historyOpen)))
    }
    return (
        <div className={"query-bar-container"}>
            <span
                style={onBrowserActive()}
                className={"show-log-browser"}
                onClick={onValueDisplay}
            >
                {LOG_BROWSER}
            </span>

            <input
                className={"query-bar-input"}
                placeholder={"Enter a cLoki Query"}
                onChange={handleChange}
                value={queryInput}
                tabIndex="0"
                onKeyDown={handleInputKeyDown}
            />
            <Tooltip title={'Query History('+queryHistory.length+')'}>

           
            <HistoryButton
            style={{
                color: historyItems ? 'orange': '#ddd'
            }}
            onClick={e => handleHistoryClick(e)}
            >
                <HistoryIcon fontSize={"small"}/>
            </HistoryButton>
            </Tooltip>
            <button
                disabled={!queryValid}
                type="submit"
                onClick={onSubmit}
                className="show-logs"
            >
                {SHOW_LOGS}
            </button>
        </div>
    );
};
