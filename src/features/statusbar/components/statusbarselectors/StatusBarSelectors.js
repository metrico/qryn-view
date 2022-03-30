import { isDate } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { UpdateStateFromQueryParams } from "../../../../components/UpdateStateFromQueryParams";
import {
    createAlert,
    setIsSubmit,
    setQueryLimit,
    setQueryStep,
    setStartTime,
    setStopTime,
    setTimeRangeLabel,
} from "../../../../actions";
import { findRangeByLabel } from "../daterangepicker/utils";
import setLinksHistory from "../../../../actions/setLinksHistory";
import { notificationTypes } from "../../../../plugins/notifications/consts";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { StatusBarInput } from "../statusbarinput/StatusBarInput";
import localUrl from "../../../../services/localUrl";

import { Tooltip } from "@mui/material";
import { DateRangePicker } from "../daterangepicker";
import { DATE_TIME_RANGE } from "../daterangepicker/consts";

export function StatusBarSelectors() {
    const startTs = useSelector((store) => store.start);
    const stopTs = useSelector((store) => store.stop);
    const queryLimit = useSelector((store) => store.limit);
    const queryStep = useSelector((store) => store.step);
    const query = useSelector((store) => store.query);
    const [copied, setCopied] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState();
    const LINK_COPIED = "Link Copied To Clipboard";
    const saveUrl = localUrl();
    const initialDateRange = () => {
        try {
            const ls = JSON.parse(localStorage.getItem(DATE_TIME_RANGE));
            if (ls?.label !== "" && typeof ls.label !== "undefined") {
                const range = findRangeByLabel(ls?.label);
                ls.dateStart = range.dateStart;
                ls.dateEnd = range.dateEnd;
            } else {
                ls.dateStart = new Date(ls.dateStart);
                ls.dateEnd = new Date(ls.dateEnd);
            }

            UpdateStateFromQueryParams();
            return ls;
        } catch (e) {
            if (isDate(startTs) && isDate(stopTs)) {
                return { dateStart: startTs, dateEnd: stopTs };
            }
        }
    };
    const isOpen = (e) => {
        e?.preventDefault();
        setOpen(!open);
    };
    const shareLink = (e) => {
        e.preventDefault();
        const setSubmit = dispatch(setIsSubmit(true));
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(window.location.href).then(
                    function () {
                        if (query.length > 0) {
                            const storedUrl = saveUrl.add({
                                data: window.location.href,
                                description: "From Shared URL",
                            });
                            dispatch(setLinksHistory(storedUrl));
                        }

                        dispatch(
                            createAlert({
                                type: notificationTypes.success,
                                message: LINK_COPIED,
                            })
                        );
                    },
                    function (err) {
                        console.err("error on copy", err);
                    }
                );
            } else {
                let textArea = document.createElement("textarea");
                textArea.value = window.location.href;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((res, rej) => {
                    if (query.length > 0) {
                        const storedUrl = saveUrl.add({
                            data: window.location.href,
                            description: "From Shared URL",
                        });
                        dispatch(setLinksHistory(storedUrl));
                    }
                    dispatch(
                        createAlert({
                            type: notificationTypes.success,
                            message: LINK_COPIED,
                        })
                    );
                    document.execCommand("copy") ? res() : rej();
                    textArea.remove();
                });
            }
        }, 200);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={"status-options"}>
                <div className={"status-selectors"}>
                    {copied && (
                        <span className={"copied-warning"}>{LINK_COPIED}</span>
                    )}
                    <Tooltip
                        title={
                            query.length < 1
                                ? "Please add a query for sharing link"
                                : "Copy Link"
                        }
                    >
                        <button
                            className={"url-copy"}
                            onClick={shareLink}
                            disabled={query.length < 1}
                        >
                            <ContentCopyIcon fontSize={"15px"} />

                            <span>{"Copy Link"}</span>
                        </button>
                    </Tooltip>

                    <StatusBarInput
                        label={"Limit"}
                        value={queryLimit}
                        dispatchAction={setQueryLimit}
                        type={"limit"}
                    />
                    <StatusBarInput
                        label={"Step"}
                        value={queryStep}
                        dispatchAction={setQueryStep}
                        type={"limit"}
                    />
                </div>

                <DateRangePicker
                    open={open}
                    isOpen={isOpen}
                    initialDateRange={initialDateRange()}
                    onChange={({ dateStart, dateEnd, label }) => {
                        const isStart = isDate(dateStart);
                        const isEnd = isDate(dateEnd);
                        const isLabel = typeof label !== "undefined";
                        if (isStart) dispatch(setStartTime(dateStart));
                        if (isEnd) dispatch(setStopTime(dateEnd));
                        if (isLabel) dispatch(setTimeRangeLabel(label));
                    }}
                />
            </div>
        </LocalizationProvider>
    );
}
