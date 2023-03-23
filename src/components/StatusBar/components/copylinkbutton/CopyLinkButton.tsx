import { createAlert } from "../../../../actions/createAlert";
import { useDispatch, useSelector } from "react-redux";
import setLinksHistory from "../../../../actions/setLinksHistory";
import { setIsSubmit } from "../../../../actions/setIsSubmit";
import { DatePickerButton, UrlCopyButton } from "../../styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";

import { CustomMenu } from "../daterangepicker";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { storedUrl } from ".";
import { useTheme } from "../../../../theme";

export default function CopyLinkButton() {
    const LINK_COPIED = "Link Copied To Clipboard";
    const theme = useTheme();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isRelative, setIsRelative] = useState(false);

    const label = useSelector(({ label }: any) => label);
    function alertSuccess() {
        dispatch(
            createAlert({
                type: "success",
                message: LINK_COPIED,
            })
        );
    }

    function storeHistory() {
        dispatch(setLinksHistory(storedUrl()));
    }
    function shareDefaultLink(copyText: any) {
        navigator.clipboard.writeText(copyText).then(
            function () {
                storeHistory();
                alertSuccess();
            },
            function (err) {
                console.log("error on copy", err);
            }
        );
    }
    function setSubmitted() {
        dispatch(setIsSubmit(true));
    }
    function shareDomLink(copyText: any) {
        let textArea: any = document.createElement("textarea");
        textArea.value = copyText;
        textArea.style = {
            position: "fixed",
            left: "-999999px",
            top: "-999999px",
        };

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((res: any, rej: any) => {
            storeHistory();

            alertSuccess();
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
    const setTitle = "Copy Link";

    const setActive = true;

    const { hash } = useLocation();
    function copyLink(e: any) {
        e.preventDefault();
        setSubmitted();
        const params = new URLSearchParams(hash.replace(/#/, ""));
        params.set("label", label);
        const locationWithLabel = new URL(window.location.href);
        locationWithLabel.hash = `#${params.toString()}`;
        const copyText =
            isRelative && label ? locationWithLabel : window.location.href;
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                shareDefaultLink(copyText);
            } else {
                shareDomLink(copyText);
            }
        }, 200);
    }
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        setIsRelative(isRelative && label);
    };
    const handleClose = (e: any, direction: any, option: any) => {
        setAnchorEl(null);
    };

    const handleChange = (event: any) => {
        setIsRelative(event.target.checked);
    };

    return (
        <>
            <Tooltip title={setTitle}>
                <>
                    <UrlCopyButton
                        attachedSide={"r"}
                        onClick={copyLink}
                        isActive={setActive}
                    >
                        <ContentCopyIcon
                            style={{ height: "14px", width: "14px" }}
                        />

                        <span>{"Copy Link"}</span>
                    </UrlCopyButton>
                    <DatePickerButton
                        attachedSide={"l"}
                        onClick={handleClick}
                        size={"small"}
                        className={"date-time-selector"}
                        aria-controls={open ? "backward-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        isActive={setActive}
                    >
                        <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    </DatePickerButton>
                    <CustomMenu
                        id="backward-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        qryntheme={theme}
                        size={"small"}
                    >
                        <MenuItem
                            key={`relativeTime`}
                            style={{ background: theme.buttonDefault }}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    style={{
                                        padding: "0",
                                        marginRight: 0,
                                        cursor: !label
                                            ? "not-allowed"
                                            : "default",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    checked={isRelative}
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            style={{
                                                paddingRight: "0px",
                                                marginRight: "3px",
                                            }}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 14,
                                                },
                                            }}
                                            disabled={!label}
                                        />
                                    }
                                    label={
                                        <Typography
                                            style={{
                                                fontSize: "12px",
                                                color: theme.textColor,
                                            }}
                                        >
                                            Relative time
                                        </Typography>
                                    }
                                />
                            </FormGroup>
                        </MenuItem>
                    </CustomMenu>
                </>
            </Tooltip>
        </>
    );
}
