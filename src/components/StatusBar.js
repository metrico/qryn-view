import LinkIcon from '@mui/icons-material/Link';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import isDate from "date-fns/isDate";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQueryLimit, setQueryStep, setStartTime, setStopTime, setTimeRangeLabel } from "../actions";
import loadLabels from "../actions/LoadLabels";
import { setApiError } from "../actions/setApiError";
import { setApiUrl } from "../actions/setApiUrl";
import Logo from "../assets/cloki-logo.png";
import { DateRangePicker } from "../plugins/daterangepicker";
import { DATE_TIME_RANGE } from '../plugins/daterangepicker/consts';
import {  findRangeByLabel } from "../plugins/daterangepicker/utils";

export const StatusBar = () => {

    return (
        <div className="status-bar">
            <div className="logo-section">
                <img src={Logo} height="28px" className="logo" />
                <ApiSelector />
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
    const apiError = useSelector((store) => store.apiErrors)
    const [editedUrl, setEditedUrl] = useState(apiUrl)
    const [apiSelectorOpen, setApiSelectorOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(apiError){
            dispatch(setApiError('API URL Error, please adjust API URL'))
        }
        
    }, [dispatch, apiError]);
   

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

    return (
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
                {apiSelectorOpen || apiError !== '' ? (
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
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)

    const initialDateRange = () => {
        try {
            const ls = JSON.parse(localStorage.getItem(DATE_TIME_RANGE));
            if (ls?.label !== "" && typeof ls.label !== 'undefined') {
                const range = findRangeByLabel(ls?.label)
                ls.dateStart = range.dateStart;
                ls.dateEnd = range.dateEnd;
            }else {
                ls.dateStart = new Date(ls.dateStart);
                ls.dateEnd = new Date(ls.dateEnd);

            }
            return ls;            
        } catch (e) {
            if (isDate(startTs) && isDate(stopTs)) {
                return { dateStart: startTs, dateEnd: stopTs }
            }
        } 
    }
    const isOpen = (e) => {
        e?.preventDefault()
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
                    onChange={({ dateStart, dateEnd, label }) => {
                        const isStart = isDate(dateStart);
                        const isEnd = isDate(dateEnd)
                        const isLabel = typeof label !== 'undefined';
                        if (isStart) dispatch(setStartTime(dateStart))
                        if (isEnd) dispatch(setStopTime(dateEnd))
                        if (isLabel) dispatch(setTimeRangeLabel(label))
                    }}
                    // here
                />
            </div>
        </LocalizationProvider>
    );
}
