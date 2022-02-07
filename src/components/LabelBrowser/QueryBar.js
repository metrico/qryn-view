import React, { useState, useEffect, useCallback } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { setLabelsBrowserOpen } from "../../actions/setLabelsBrowserOpen";

export const QueryBar = (props) => {
    const [query, setQuery] = useState(props.query);
    const [queryValid, setQueryValid] = useState(false)
    const dispatch = useDispatch()
    const labelsBrowserOpen = useSelector(( state ) => state.labelsBrowserOpen)


// validate query after submit
    useEffect(() => {
        setQuery(props.query);
        setQueryValid(onQueryValid(props.query))
    }, [props.query]);

    const onSubmit = (e) => {
        dispatch(setLabelsBrowserOpen(false))
        e.preventDefault();
        props.onSubmit(query);
    };

    const onValueDisplay = (e) => {
        e.preventDefault()
        const isOpen = labelsBrowserOpen ? false : true;
        dispatch(setLabelsBrowserOpen(isOpen))
    };
    
    const handleChange = (e) => {
        const qr = e.target.value;
        setQueryValid(onQueryValid(qr))
        setQuery(qr);
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
                value={query}
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

