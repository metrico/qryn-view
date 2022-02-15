import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./assets/cloki-logo.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { setStopTime, setStartTime, setQueryLimit, setQueryStep, setIsSubmit } from "../../actions";
import { DateRangePicker } from "../../plugins/daterangepicker";
import isDate from "date-fns/isDate";
import { setApiUrl } from "../../actions/setApiUrl";
import LinkIcon from '@mui/icons-material/Link';
import Checkbox from '@mui/material/Checkbox';
// import loadLabels from "../../actions/LoadLabels";
import { setApiError } from "../../actions/setApiError";
import { useLocation } from "react-router-dom";
// import { updateStateFromQueryParams } from "./helpers/updateStateFromQueryParams";


export default function StatusBar() {

    // updateStateFromQueryParams()

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
    const [uriParams, setUriParams] = useState('')
    const { hash } = useLocation()

    useEffect(() => {
        setEditedUrl(apiUrl)
    }, [])

    useEffect(() => {
        setEditedUrl(apiUrl)

    }, [apiUrl])


    useEffect(() => {
        if (isError) {
            //   dispatch(setApiError('API URL Error, please adjust API URL'))
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
    const [copyOpen, setCopyOpen] = useState(false)
    const [isSubmit, setIsSubmit] = useState(true)


    const handleIsSubmitChange = () => {


        setIsSubmit(!isSubmit)
      //  console.log(isSubmit)
       // dispatch(setIsSubmit(!isSubmit))
    }
    const initialDateRange = () => {
        if (isDate(startTs) && isDate(stopTs)) {
            return { dateStart: startTs, dateEnd: stopTs }
        }
    }
    const isOpen = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
    const shareLink = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(window.location.href).then(function () {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 1500)
        }, function (err) {
            console.log('error on copy', err)
        })
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
                    <label>
                    <Checkbox 
          label="submit"
         value={isSubmit}
         onChange={handleIsSubmitChange}
         fontSize={'small'}
         defaultChecked
       /> submit
                    </label>

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
