import { Dialog, Switch, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    setTheme,
    setAutoTheme
} from "../../actions";

import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen.js";

import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info"
import {
    InputGroup,
    SettingCont,
    SettingHeader,
    SettingCloseBtn,
    SettingsInputContainer,
    SettingLabel,
    EmbedArea,
} from "./styled";

import setDebugMode from "../../actions/setDebugMode";

export default function SettingsDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const autoTheme = useSelector((store) => store.autoTheme)
    const debugMode = useSelector((store) => store.debugMode);

  

    const [embedEdited, setEmbedEdited] = useState(
        getEmbed(window.location.href)
    );

    const [themeSet, setThemeSet] = useState(theme);
    const [autoThemeLocal, setLocalAutoTheme] = useState(autoTheme);
    useEffect(() => {
        setLocalAutoTheme(autoTheme)
    }, [autoTheme, setLocalAutoTheme])
    function getEmbed(url) {
        return url + "&isEmbed=true";
    }

    useEffect(() => {
        setEmbedEdited(getEmbed(window.location.href));
    }, [window.location.href]);

    useEffect(() => {
        setThemeSet(theme);
    }, [theme, setThemeSet]);


    function handleThemeSwitch() {
        dispatch(setTheme(themeSet === "light" ? "dark" : "light"));
        setThemeSet(theme);
        localStorage.setItem("theme", JSON.stringify({ theme }));
    }
    const handleAutoTheme = (val) => {
        dispatch(setAutoTheme(!autoThemeLocal))
        setLocalAutoTheme(autoTheme);
    }
    function handleClose() {
        dispatch(setSettingsDialogOpen(false));
    }

    function handleEmbedChange(e) {
        setEmbedEdited(e.target.value);
    }
    
    function handleDebugSwitch() {
        dispatch(setDebugMode(debugMode ? false : true));
        localStorage.setItem(
            "isDebug",
            JSON.stringify({ isActive: debugMode ? false : true })
        );
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
                        <SettingLabel>Theme: {theme}</SettingLabel>
                        <Switch
                            size={'small'}
                            checked={themeSet === "dark"}
                            onChange={handleThemeSwitch}
                            disabled={autoThemeLocal}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                        <Tooltip title="Theme determined by your system preferenes">
                            <SettingLabel>Automatic theme detection <InfoIcon fontSize={'inherit'}/> </SettingLabel>
                        </Tooltip>
                        <Switch
                            size={'small'}
                            checked={autoThemeLocal}
                            onChange={handleAutoTheme}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <SettingLabel>Set Debug Mode</SettingLabel>
                        <Switch
                        size={'small'}
                            checked={debugMode}
                            onChange={handleDebugSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <SettingLabel>Embed View</SettingLabel>
                        <EmbedArea
                            rows="8"
                            value={embedEdited}
                            onChange={handleEmbedChange}
                        ></EmbedArea>
                    </InputGroup>
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
}
