import { Dialog, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setApiUrl, setQueryLimit, setQueryStep } from "../../actions";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen.js";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
    InputGroup,
    SettingCont,
    SettingHeader,
    SettingCloseBtn,
    SettingsInputContainer,
    InlineGroup,
    SettingInput,
    SettingLabel,
    SettingButton,
    EmbedArea,
} from "./styled";
import setDebugMode from "../../actions/setDebugMode";

export default function SettingsDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const apiUrl = useSelector((store) => store.apiUrl);
    const limit = useSelector((store) => store.limit);
    const step = useSelector((store) => store.step);
    const from = useSelector((store) => store.from);
    const to = useSelector((store) => store.to);
    const debugMode = useSelector((store) => store.debugMode);
    //const theme = useSelector((store) => store.theme);

    const [apiEdited, setApiEdited] = useState(apiUrl);

    const url = window.location.href;
    const submitUrl = url + "&isEmbed=true";
    const [embedEdited, setEmbedEdited] = useState(submitUrl);
    const urlParams = new URLSearchParams(window.location.hash);

    function getFromTime() {
        return urlParams.get("start");
    }

    function getToTime() {
        return urlParams.get("stop");
    }
    function removeStart() {
        urlParams.delete("start");
    }

    function removeStop() {
        urlParams.delete("stop");
    }

    function appendFrom() {
        urlParams.append("from", from);
    }
    function appendTo() {
        urlParams.append("to", to);
    }

    function setFromTime() {
        const fromTime = getFromTime();
        dispatch(setFromTime(fromTime));
    }

    function setToTime() {
        const toTime = getToTime();
        dispatch(setToTime(toTime));
    }

    function updateExternalTime() {
        setToTime();
        setFromTime();
    }

    function externalGenerator() {
        // update from - to
        updateExternalTime();
        // remove start and stop
        removeStart();
        removeStop();
        // add from and to
        appendFrom();
        appendTo();
    }

    function handleApiChange(e) {
        const value = e.target.value;
        setApiEdited(value);
    }

    function handleApiClick() {
        dispatch(setApiUrl(apiEdited));
    }

    function handleStepChange(e) {
        const value = e.target.value;
        dispatch(setQueryStep(value));
    }

    function handleLimitChange(e) {
        const value = e.target.value;
        dispatch(setQueryLimit(value));
    }

    function handleClose() {
        dispatch(setSettingsDialogOpen(false));
    }

    function handleEmbedChange(e) {
        setEmbedEdited(e.target.value);
    }
    function handleDebugSwitch() {
        dispatch(setDebugMode(debugMode ? false : true));
    }
    const label = {
        onChange: { handleDebugSwitch },
        checked: { debugMode },
        inputProps: { "aria-label": "Set Debug Mode" },
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <SettingCont>
                <SettingHeader>
                    <h3>Settings</h3>
                    <SettingCloseBtn onClick={handleClose}>
                        {" "}
                        <CloseIcon />{" "}
                    </SettingCloseBtn>
                </SettingHeader>

                <SettingsInputContainer>
                    <InputGroup>
                        <SettingLabel>API URL</SettingLabel>
                        <InlineGroup>
                            <SettingInput
                                value={apiEdited}
                                onChange={handleApiChange}
                            />
                            <SettingButton onClick={handleApiClick}>
                                save
                            </SettingButton>
                        </InlineGroup>
                    </InputGroup>

                    <InputGroup>
                        <SettingLabel>Step</SettingLabel>

                        <SettingInput
                            value={step}
                            onChange={handleStepChange}
                        />
                    </InputGroup>

                    <InputGroup>
                        <SettingLabel>Limit</SettingLabel>
                        <SettingInput
                            value={limit}
                            onChange={handleLimitChange}
                        />
                    </InputGroup>
                    <InputGroup>
                        <SettingLabel>Set Debug Mode</SettingLabel>
                        <Switch 
                        checked={debugMode}
                        onChange={handleDebugSwitch}
                        inputProps={{'aria-label':'controlled'}}

                         />
                    </InputGroup>
                    <InputGroup>
                        <SettingLabel>Embed View</SettingLabel>
                        <EmbedArea
                            rows="10"
                            value={embedEdited}
                            onChange={handleEmbedChange}
                        ></EmbedArea>
                    </InputGroup>
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
}
