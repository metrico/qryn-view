import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-md";

export const QueryBar = (props) => {
    const [query, setQuery] = useState(props.query);
    const [browserActive, setBrowserActive] = useState(props.browserActive)
    const queryText = useCallback(() => query, [query]);

    useEffect(() => {
        setQuery(props.query);
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
        setQuery(qr);
    };
    const onBrowserActive = () => {
        return !browserActive ? ({
            'borderColor':'#11abab'
        }) : ({})
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
// an input as a query bar
// a search query button
// a search query history select
// ! create a button from own library
// TODO: research about creating libraries on react
