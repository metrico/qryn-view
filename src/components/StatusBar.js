/**
 * STATUS BAR
 * - logo
 * - date range picker
 * - api status
 * - api selector
 */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/cloki-logo.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { setStopTime, setStartTime, setQueryLimit, setQueryStep } from "../actions";
import { DateRangePicker } from "../plugins/daterangepicker";
import isDate from "date-fns/isDate";
import { setApiUrl } from "../actions/setApiUrl";
import LinkIcon from '@mui/icons-material/Link';
import loadLabels from "../actions/LoadLabels";
export const StatusBar = (props) => {

    return (
        <div className="status-bar">
            <div className="logo-section">
            <img src={Logo} height="28px" className="logo" />
            <ApiSelector/>
            </div>

            <div className="date-selector">
                <StatusBarSelectors />
            </div>
        </div>
    );
};

export function StatusBarInput(props) {
    const { label, value, dispatchAction, type } = props
    const dispatch = useDispatch()
    return (
        <div className="selector">
            <span className="label">{label}</span>
            <input
            className={type}
                value={value}
                onChange={(newValue) => {
                    dispatch(dispatchAction(newValue.target.value));
                }}
            />

        </div>
    )
}
export function ApiSelector() {
    const apiUrl = useSelector((store) => store.apiUrl)
    const [editedUrl, setEditedUrl] = useState(apiUrl)
    const [apiSelectorOpen, setApiSelectorOpen] = useState(false)
    const dispatch = useDispatch()
    const handleApiUrlOpen = (e) => {
        e.preventDefault()
        apiSelectorOpen ? setApiSelectorOpen(false) : setApiSelectorOpen(true)
    }

    const handleIntputChange = (e) => {
        e.preventDefault()
        setEditedUrl(e.target.value)
    }
    const onUrlSubmit = (e) => {
        dispatch(setApiUrl(editedUrl))
        dispatch(loadLabels(editedUrl))
    }

    return(
        <div className="status-selectors">
        <div className="api-url-selector">
            <button
            title="Set API URL"
            className="api-url-selector-toggle"
            onClick={handleApiUrlOpen}
            >
                <LinkIcon
                fontSize="small"
                />
            </button>
            {apiSelectorOpen ? (
            <div className="selector">
                <span className="label">API URL</span>
                <input 
                className="url" 
                value={editedUrl}
                onChange={handleIntputChange} />
                <button
                
                onClick={onUrlSubmit}
                >save</button>
                </div>
                
            ) : null}
        </div>

        </div>

    )
    
}



export function StatusBarSelectors() {
    const startTs = useSelector((store) => store.start);
    const stopTs = useSelector((store) => store.stop);
    const queryLimit = useSelector((store) => store.limit);
    const queryStep = useSelector((store) => store.step);
    const apiUrl = useSelector((store) => store.apiUrl)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [direction, setDirection] = useState('backwards')
    const handleInputClick = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
    const handleInputChange = (e, type) => {
        e.preventDefault()
        const value = e.target.value
        if (isDate(value)) {
            dispatch([type](value))
        }
    }
    const initialDateRange = () => {
        if (isDate(startTs) && isDate(stopTs)) {
            return { dateStart: startTs, dateEnd: stopTs }
        }
    }

    const handleDirectionChange = (e) => {
        const direction = e.target.value;
        setDirection(direction)
    }

    const isOpen = (e) => {
        e.preventDefault()
        setOpen(!open)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="status-options">

            
            <div className="status-selectors">
                <StatusBarInput
                    label={'Limit'}
                    value={queryLimit}
                    dispatchAction={setQueryLimit}
                    type={'limit'}

                />

                <StatusBarInput
                    label={'Step'}
                    value={queryStep}
                    dispatchAction={setQueryStep}
                    type={'limit'}
                />
     
  
            

            </div>
     
            <DateRangePicker
                open={open}
                isOpen={isOpen}
                initialDateRange={initialDateRange()}
                onChange={({ dateStart, dateEnd }) => {
                    if (isDate(dateStart)) dispatch(setStartTime(dateStart))
                    if (isDate(dateEnd)) dispatch(setStopTime(dateEnd))
                }}
            />
            </div>
        </LocalizationProvider>
    );
}
