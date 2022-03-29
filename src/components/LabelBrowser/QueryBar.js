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
import { decodeQuery } from "../UpdateStateFromQueryParams";
import localUrl from "../../services/localUrl";
import setLinksHistory from "../../actions/setLinksHistory";
import QueryEditor from "../../plugins/queryeditor";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import loadLabels from "../../actions/LoadLabels";
import { ThemeProvider } from "@mui/styles";


const HistoryButtonStyled = styled.button`
    background: none;
    color: #ddd;
    font-size: 14px;
    border: none;
    cursor: pointer;

    height: 22px;
    margin: 3px;
`;
const $dark_quoise = "#208989";
const $dark_quoise_hover = "#14b8b8";
const HistoryIconStyled = styled(HistoryIcon)`
    color: ${(props) => props.color};
`;
const QueryBarContainer = styled.div`
    display: flex;
    padding: 3px 6px;

    margin: 5px 0px;
    margin-left: 0px;
    background: #8a8a8a22;
    flex-wrap:wrap;

    border-radius: 3px;
`;
const ShowLogsButton = styled.button`
    background: ${$dark_quoise};
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    margin: 3px;
    transition: 0.25s all;
    height: 23px;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    &:hover {
        background: ${$dark_quoise_hover};
    }
    &:disabled {
        background: rgb(67, 67, 67);
        cursor: not-allowed;
    }
`;
const ShowLabelsBtn = styled.button`
    margin: 3px;

    border-radius: 3px;
    background: ${(props) => (props.browserActive ? "#7b7b7b3b" : "#7b7b7b55")};

    font-size: 0.85em;
    display: flex;
    cursor: pointer;
    align-items: center;
    text-overflow: ellipsis;
    border: 1px solid transparent;
    transition: 0.25s all;
    width: 80px;
    height: 22px;
    white-space: nowrap;
    justify-content: flex-start;
    color: #ddd;
    &:hover {
        background: #7b7b7b3b;
    }
`;

function ShowLabelsButton({onValueDisplay,labelsBrowserOpen}){
    const LOG_BROWSER = "Labels";
    
    return(     <ShowLabelsBtn
        onClick={onValueDisplay}
        browserActive={labelsBrowserOpen}
    >
        {labelsBrowserOpen ? (
            <KeyboardArrowDownIcon fontSize={"small"} />
        ) : (
            <KeyboardArrowRightIcon fontSize={"small"} />
        )}{" "}
        {LOG_BROWSER}
    </ShowLabelsBtn>)
}

function HistoryButton({ queryLength, handleHistoryClick }) {
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        if (queryLength > 0) {
            setButtonState(true);
        } else {
            setButtonState(false);
        }
    }, [queryLength]);
    return (
        <Tooltip title={"Query History (" + queryLength + ")"}>
            <HistoryButtonStyled onClick={handleHistoryClick}>
                <HistoryIconStyled color={buttonState ? "orange" : "#ddd"} />
            </HistoryButtonStyled>
        </Tooltip>
    );
}

export const QueryBar = () => {
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen);
    const debug = useSelector((store) => store.debug);
    const query = useSelector((store) => store.query);
    const apiUrl = useSelector((store) => store.apiUrl);
    const isSubmit = useSelector((store) => store.isSubmit);
    const historyOpen = useSelector((store) => store.historyOpen);

    const [queryInput, setQueryInput] = useState(query);
    const [queryValid, setQueryValid] = useState(false);

    const [queryValue, setQueryValue] = useState(
        query.split(/[  ]+/).map((m) => ({
            type: "code-line",
            children: [
                {
                    text: m,
                },
            ],
        })) || [
            {
                type: "code-line",
                children: [
                    {
                        text: "Enter a cLoki Query",
                    },
                ],
            },
        ]
    );
    const SHOW_LOGS = "Show Logs";
    
    const queryHistory = useSelector((store) => store.queryHistory);
    const [historyItems, setHistoryItems] = useState(queryHistory.length > 0);
    const saveUrl = localUrl();
    useEffect(() => {
        setHistoryItems(queryHistory.length > 0);
    }, [queryHistory]);

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
        setQueryValue([{ children: [{ text: query }] }]);
        setQueryValid(onQueryValid(query));
    }, [query]);

    const onValueDisplay = (e) => {
        e.preventDefault();
        const isOpen = labelsBrowserOpen ? false : true;
        if (isOpen) dispatch(loadLabels(apiUrl));
        dispatch(setLabelsBrowserOpen(isOpen));
    };

    function handleQueryChange(e) {
        setQueryValue(e);

        const multiline = e.map((text) => text.children[0].text).join("\n");
        dispatch(setQuery(multiline));
    }

    const handleInputKeyDown = (e) => {
        if (e.code === "Enter" && e.ctrlKey) {
            dispatch(setLoading(true));
            onSubmit(e);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(setQuery(queryInput));

        if (onQueryValid(queryInput)) {
            try {
                const historyUpdated = historyService.add({
                    data: queryInput,
                    url: window.location.hash,
                });
                dispatch(setQueryHistory(historyUpdated));
                dispatch(setLabelsBrowserOpen(false));
                decodeQuery(query, apiUrl);
                dispatch(setLoading(true));
                dispatch(loadLogs());
                const storedUrl = saveUrl.add({
                    data: window.location.href,
                    description: "From Query Submit",
                });
                dispatch(setLinksHistory(storedUrl));
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("Please make a log query", query);
        }
    };
    function handleHistoryClick(e) {
        dispatch(setHistoryOpen(!historyOpen));
    }
    return (
        <QueryBarContainer>
            <ShowLabelsButton
            onValueDisplay={onValueDisplay}
            labelsBrowserOpen={labelsBrowserOpen}
            />

            <QueryEditor
                onQueryChange={handleQueryChange}
                value={queryValue}
                onKeyDown={handleInputKeyDown}
            />

            <HistoryButton
                queryLength={queryHistory.length}
                handleHistoryClick={handleHistoryClick}
            />
            <ShowLogsButton
                disabled={!queryValid}
                type="submit"
                onClick={onSubmit}
            >
                {SHOW_LOGS}
            </ShowLogsButton>
        </QueryBarContainer>
    );
};
