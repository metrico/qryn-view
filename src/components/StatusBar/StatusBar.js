import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./assets/cloki-logo.png";
import LinkIcon from '@mui/icons-material/Link';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { setIsSubmit, setQueryLimit, setQueryStep, setStartTime, setStopTime, setTimeRangeLabel } from "../../actions";
import isDate from "date-fns/isDate";
import { setApiUrl } from "../../actions/setApiUrl";
import { DateRangePicker } from "../../plugins/daterangepicker";
import { DATE_TIME_RANGE } from '../../plugins/daterangepicker/consts';
import {  findRangeByLabel } from "../../plugins/daterangepicker/utils";


export default function StatusBar() {

    return (
        <div className="status-bar">
            <div className="logo-section">
                <img src={Logo} alt={"cLoki View"} height={"28px"} className={"logo"} />
                <ApiSelector />
            </div>

            <div className={"date-selector"}>
                <StatusBarSelectors />
            </div>
        </div>
    );
};

export function StatusBarInput(props) {

    const { label, value, dispatchAction, type } = props
    const dispatch = useDispatch()
    const handleStatusInputChange = (e) => {
        dispatch(dispatchAction(e.target.value))
    }

    return (
        <div className="selector">
            <span className="label">{label}</span>
            <input
                className={type}
                value={value}
                onChange={handleStatusInputChange}
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
    const [isError, setIsError] = useState(true)

    useEffect(() => {
        setEditedUrl(apiUrl)
    }, [])

    useEffect(() => {
        setEditedUrl(apiUrl)

    }, [apiUrl])


    useEffect(() => {
        if (isError) {
            setApiSelectorOpen(true)
        } else {
            setApiSelectorOpen(false)
            setIsError(false)
        }

    }, [isError]);

    useEffect(() => {
        if (apiError.length > 0) {
            setIsError(true)
            setApiSelectorOpen(true)

        }

    }, [apiError])

    const handleApiUrlOpen = (e) => {
        e.preventDefault()
        apiSelectorOpen ? setApiSelectorOpen(false) : setApiSelectorOpen(true)
    }

    const handleIntputChange = (e) => {
        e.preventDefault()
        setEditedUrl(e.target.value)
    }
    const onUrlSubmit = (e) => {
        console.log(apiUrl, "API URL CHANGE")

        dispatch(setApiUrl(editedUrl))
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
    const [copied, setCopied] = useState(false)
    const dispatch = useDispatch();
    const [open, setOpen] = useState()

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
    const shareLink = (e) => {
        e.preventDefault()
       const setSubmit = dispatch(setIsSubmit(true)) 
      setTimeout(()=>{
        navigator.clipboard.writeText(window.location.href).then(function () {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
                dispatch(setIsSubmit(false))
            }, 1500)
        }, function (err) {
            console.log('error on copy', err)
        })
      },200)
            
        

    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="status-options">


                <div className="status-selectors">
                    {copied && (
                        <span className="copied-warning">Link Copied To Clipboard</span>
                    )}

                    <button
                        className="url-copy"
                        title="Copy Link"
                        onClick={shareLink}
                    >
                        <LinkIcon
                            fontSize="small"
                        />

                        <span>Copy Link</span>

                    </button>

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
