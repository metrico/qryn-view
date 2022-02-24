import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setIsSubmit, setQuery } from "../../actions";
import loadLogs from "../../actions/loadLogs"
import { setLabelsBrowserOpen } from "../../actions/setLabelsBrowserOpen";

export const QueryBar = () => {
    //const [query, setQuery] = useState(props.query);

    const dispatch = useDispatch()
    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen)
    const debug = useSelector(store => store.debug)
    const query = useSelector((store) => store.query)
    const isSubmit = useSelector(store => store.isSubmit)
    const [queryInput, setQueryInput] = useState(query)
    const [queryValid, setQueryValid] = useState(false)
    const SHOW_LOGS = "Show Logs"
    const LOG_BROWSER = "Log Browser"
    const onQueryValid = (query) => {
        return query !== '{' && query !== '}' && query !== '{}' && query !== '' // TODO: make a proper query validation
    }

 
    useEffect(()=>{
    // force a query to be run after load of component
    if (debug) console.log('🚧 LOGIC/QueryBar/', typeof query, query.length)

    if (onQueryValid(query && isSubmit === "true") ) {
        if (debug) console.log('🚧 LOGIC/QueryBar/ dispatch ', query !== "{}", query.length > 0, query !== "{}" || query.length > 1)
        // here
        dispatch(loadLogs())

        setTimeout(()=>{
            dispatch(setIsSubmit(false))
        },200)

    } else if( !onQueryValid(query) && isSubmit === "true") {
        dispatch(setIsSubmit(false))
    }

    },[])

    useEffect(() => {
        setQueryInput(query);
        setQueryValid(onQueryValid(query))
    }, [query, queryInput]);


    const onValueDisplay = (e) => {
        e.preventDefault()
        const isOpen = labelsBrowserOpen ? false : true;
        dispatch(setLabelsBrowserOpen(isOpen))
    };

    const handleChange = (e) => {
        const qr = e.target.value;
        setQueryInput(qr)
        dispatch(setQuery(qr))
    };

    const onBrowserActive = () => {
        return !labelsBrowserOpen ? ({
            'borderColor': '#11abab'
        }) : ({})
    }

    const handleInputKeyDown = (e) => {
        if (e.code === 'Enter' && e.ctrlKey) {
            onSubmit(e)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        dispatch(setQuery(queryInput))

        if (onQueryValid(query)) {
            dispatch(setLabelsBrowserOpen(false))
            dispatch(loadLogs())

        } else {

            console.log("Please make a log query", query);

        }
    };



    return (
        <div className={"query-bar-container"}>
            <span
                style={onBrowserActive()}
                className={"show-log-browser"} onClick={onValueDisplay}>
                {LOG_BROWSER}
            </span>

            <input
                className={"query-bar-input"}
                placeholder={"Enter a cLoki Query"}
                onChange={handleChange}
                value={queryInput}
                tabIndex='0'
                onKeyDown={handleInputKeyDown}
            />

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
