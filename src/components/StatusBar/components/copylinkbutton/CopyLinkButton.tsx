import { useDispatch } from "react-redux";
import setLinksHistory from "../../../../actions/setLinksHistory";
import { setIsSubmit } from "../../../../actions/setIsSubmit";
import { DatePickerButton } from "../../styled";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Tooltip } from "@mui/material";
import {
    handleAlertSuccess,
    handleShareDefaultLink,
    handleShareDomLink,
    handleCopyLink,
    storedUrl,
} from "./helpers";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTimeLabel, useTheme } from "./hooks";
import { RelativeTimeMenu } from "./components/RelativeTimeMenu";
import { CopyButton } from "./components/CopyButton";
import { createAlert } from "../../../../actions";

export default function CopyLinkButton() {
    const dispatch = useDispatch();
    const qrynTheme = useTheme();
    const { hash } = useLocation();
    const label = useTimeLabel();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isRelative, setIsRelative] = useState(false);

    function alertSuccess() {
        handleAlertSuccess(dispatch, createAlert);
    }

    function storeHistory() {
        dispatch(setLinksHistory(storedUrl()));
    }

    function shareDefaultLink(copyText: any) {
        handleShareDefaultLink(storeHistory, alertSuccess, copyText);
    }
    function setSubmitted() {
        dispatch(setIsSubmit(true));
    }
    function shareDomLink(copyText: any) {
        handleShareDomLink(copyText, storeHistory, alertSuccess);
    }

    function copyLink(e: any) {
        e.stopPropagation();
        handleCopyLink(
            e,
            setSubmitted,
            hash,
            label,
            isRelative,
            shareDefaultLink,
            shareDomLink
        );
    }
    const handleClick = (event: any) => {
        copyLink(event);
        setAnchorEl(event.currentTarget);
        setIsRelative(isRelative && label?.length > 0);
    };
    const handleClose = (e: any, direction: any, option: any) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const handleChange = (event: any) => {
        setIsRelative(prev => Boolean(event.target.checked));
    };

    return (
        <>
            <Tooltip title={"Copy Link"}>
                <>
                    <DatePickerButton
                       
                        className={"date-time-selector"}
                        aria-controls={open ? "backward-menu" : undefined}
                        aria-haspopup={true}
                        aria-expanded={open ? true : undefined}
                        onClick={handleClick}
                    >
                        <CopyButton onClick={copyLink} />

                        <KeyboardArrowDownOutlinedIcon
                            fontSize={"small"}
                            style={{ marginLeft: "3px" }}
                           
                        />
                    </DatePickerButton>
                    <RelativeTimeMenu
                        anchorEl={anchorEl}
                        open={open}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        label={label}
                        isRelative={isRelative||false}
                        qrynTheme={qrynTheme}
                    />
                </>
            </Tooltip>
        </>
    );
}
