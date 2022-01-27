import React, { useState, useEffect, useCallback } from "react";
export const QueryBar = (props) => {
    const [query, setQuery] = useState(props.query);
    const [browserActive, setBrowserActive] = useState(props.browserActive)
    const queryText = useCallback(() => query, [query]);
    const [queryValid, setQueryValid] = useState(false)
// validate query after submit
    useEffect(() => {
        setQuery(props.query);
        setQueryValid(onQueryValid(props.query))
    }, [props.query]);
    useEffect(() => {
        setBrowserActive(props.browserActive)
        return () => {
            
        };
    }, [props.browserActive]);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(query);
        props.onSubmit(query);
    };
    const valueDisplay = (e) => {
        props.onValuesDisplay(e);
    };
    const handleChange = (e) => {
        const qr = e.target.value;
        setQueryValid(onQueryValid(qr))
        setQuery(qr);
    };
    const onBrowserActive = () => {
        return !browserActive ? ({
            'borderColor':'#11abab'
        }) : ({})
    }
    const onQueryValid = (query) => {
       return query !== '{' && query !== '}' && query !== '{}' && query !== ''
    }
    return (
        <div className="query-bar-container">
            <span 
            style={onBrowserActive()}
            className={"show-log-browser"} onClick={(e) => valueDisplay(e)}>
                log browser
            </span>

            <input
               
                className="query-bar-input"
                placeholder="Enter a cLoki Query"

                onChange={handleChange}
                value={query}
            />
            <button
               disabled={!queryValid}
                type="submit"
                onClick={(e) => onSubmit(e)}
                className="show-logs"
            >
                Show Logs
            </button>
        </div>
    );
};

// this should have:
//! a search query history select

