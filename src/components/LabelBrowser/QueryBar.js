import React, { useState, useEffect,/* useCallback */ } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { setQuery  } from "../../actions";
import loadLogs from "../../actions/loadLogs"
import { setLabelsBrowserOpen } from "../../actions/setLabelsBrowserOpen";

export const QueryBar = () => {
    //const [query, setQuery] = useState(props.query);

    const dispatch = useDispatch()
    const labelsBrowserOpen = useSelector(( store ) => store.labelsBrowserOpen)
    const debug = useSelector(store => store.debug)
    const stop = useSelector(store => store.stop)
    const start = useSelector(store => store.start)
    const limit = useSelector(store => store.limit)
    const step = useSelector(store => store.step)
    const apiUrl = useSelector( store => store.apiUrl)
    const query = useSelector( (store) => store.query)
    const [queryInput, setQueryInput] = useState(query)
    const [queryValid, setQueryValid] = useState(false)


      // force a query to be run after load of component
    if (debug) console.log('🚧 LOGIC/QueryBar/', typeof query, query.length)
    if (query.length > 1) {
      if (debug) console.log('🚧 LOGIC/QueryBar/ dispatch ', query !== "{}", query.length > 0, query !== "{}" || query.length > 1)
        dispatch(loadLogs( query, [start, stop], limit, step, apiUrl ))
    }



    useEffect(() => {
        setQueryInput(query);
        setQueryValid(onQueryValid(query))
    }, [query,queryInput]);


    const onValueDisplay = (e) => {
        e.preventDefault()
        const isOpen = labelsBrowserOpen ? false : true;
        dispatch(setLabelsBrowserOpen(isOpen))
    };

    const handleChange = (e) => {
        const qr = e.target.value;
    //    setQueryValid(onQueryValid(qr))
      //  setQueryInput(qr);
      setQueryInput(qr)
        dispatch(setQuery(qr))
    };

    const onBrowserActive = () => {
        return !labelsBrowserOpen ? ({
            'borderColor':'#11abab'
        }) : ({})
    }

    const handleInputKeyDown = (e) => {
        if(e.code === 'Enter' && e.ctrlKey ){
            onSubmit(e)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setLabelsBrowserOpen(false))
        dispatch(setQuery(queryInput))

        if (query !== "{}" || query !== "") {
            dispatch(loadLogs( query, [start, stop], limit, step, apiUrl ))

        } else {

            console.log("Please make a log query", query);

        }
    };

    const onQueryValid = (query) => {
       return query !== '{' && query !== '}' && query !== '{}' && query !== '' // TODO: make a proper query validation
    }

    return (
        <div className="query-bar-container">
            <span
            style={onBrowserActive()}
            className={"show-log-browser"} onClick={onValueDisplay}>
                log browser
            </span>

            <input
                className="query-bar-input"
                placeholder="Enter a cLoki Query"
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
                Show Logs
            </button>
        </div>
    );
};
