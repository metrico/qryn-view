import { createAlert } from "../../../../actions/createAlert";
import { useDispatch, useSelector } from "react-redux";
import setLinksHistory from "../../../../actions/setLinksHistory";
import { setIsSubmit } from "../../../../actions/setIsSubmit";
import { DatePickerButton, UrlCopyButton } from "../../styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Checkbox, FormControlLabel, FormGroup, MenuItem, Tooltip } from "@mui/material";
import { storedUrl } from "./helpers";
import { StyledMenu } from "../daterangepicker";
import { useState } from "react";
import { themes } from "../../../../theme/themes";
import { Label } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { cloneDeep } from "lodash";

export default function CopyLinkButton() {
    const LINK_COPIED = "Link Copied To Clipboard";
  
    const dispatch = useDispatch();
    const storeTheme = useSelector((store) => store.theme);
    const qrynTheme = themes[storeTheme];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isRelative, setIsRelative] = useState(false);

    const label = useSelector(({label}) => label);
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
    function shareDefaultLink(copyText) {
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
    function shareDomLink(copyText) {
        let textArea = document.createElement("textarea");
        textArea.value = copyText;
        textArea.style = {
            position: "fixed",
            left: "-999999px",
            top: "-999999px",
        };

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((res, rej) => {
           
                storeHistory();
          
            alertSuccess();
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
    const setTitle = "Copy Link";

    const setActive = true

    const { hash } = useLocation();
    function copyLink(e) {
        e.preventDefault();
        setSubmitted();
        const params = new URLSearchParams(hash.replace("#", ""))
        params.set('label', label)
        for (let [key, value] of params.entries()) {
            console.log(key, value)
        }
        const locationWithLabel = new URL(window.location.href);
        locationWithLabel.hash = `#${params.toString()}`;
        const copyText = isRelative && label ? locationWithLabel : window.location.href;
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                shareDefaultLink(copyText);
            } else {
                shareDomLink(copyText);
            }
        }, 200);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e, direction,  option) => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
      setIsRelative(event.target.checked);
    };
  
    return (
        <>
            <Tooltip title={setTitle}>
                <>
                <UrlCopyButton attachedSide={'r'} onClick={copyLink} isActive={setActive}>
                    <ContentCopyIcon fontSize={"15px"} />

                    <span>{"Copy Link"}</span>
                </UrlCopyButton>
                <DatePickerButton attachedSide={'l'} 
                    onClick={handleClick}
                    size={'small'}
                    className={"date-time-selector"}
                    aria-controls={open ? 'backward-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    isActive={setActive}>
                    <KeyboardArrowDownOutlinedIcon fontSize={"12px"} />
                </DatePickerButton>
                <StyledMenu
                id='backward-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                qryntheme={qrynTheme}
            >
                <MenuItem key={`relativeTime`}>
                    <FormGroup>
                        <FormControlLabel checked={isRelative} onChange={handleChange} control={<Checkbox 
                            style={{cursor: label ? "not-allowed" : 'default'}}
                            disabled={!label} />} label="Copy link with relative timestamp" />
                    </FormGroup>
                </MenuItem>
            </StyledMenu>
                </>
            </Tooltip>
        </>
    );
}
