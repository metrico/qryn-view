import { Dialog, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setApiUrl, setQueryLimit, setQueryStep } from "../../actions";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen.js";
import { useEffect, useState } from "react";
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
import { themes } from "../../theme/themes";

export default function SettingsDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const apiUrl = useSelector((store) => store.apiUrl);
    const limit = useSelector((store) => store.limit);
    const step = useSelector((store) => store.step);
    const theme = useSelector((store) => store.theme);

    const debugMode = useSelector((store) => store.debugMode);
    
    const [apiEdited, setApiEdited] = useState(apiUrl);

    const [embedEdited, setEmbedEdited] = useState(
        getEmbed(window.location.href)
    );

    function getEmbed(url) {
        return url + "&isEmbed=true";
    }

    useEffect(() => {
        setEmbedEdited(getEmbed(window.location.href));
    }, [window.location.href]);

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
        localStorage.setItem("isDebug",JSON.stringify({isActive: debugMode ? false : true}))
    }

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
                            inputProps={{ "aria-label": "controlled" }}
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
