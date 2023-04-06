import { Dialog, Switch, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "isomorphic-dompurify";
import { setTheme, setAutoTheme } from "../../actions";

import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";

import React, { useEffect, useMemo, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
    InputGroup,
    SettingCont,
    SettingHeader,
    SettingCloseBtn,
    SettingsInputContainer,
    SettingLabel,
    SettingLabelSection,
    EmbedArea,
} from "./styled";

import setDebugMode from "../../actions/setDebugMode";
import { css } from "@emotion/css";
import { LocalPluginsManagement } from "../PluginManagerFactory";
//import { PluginManager } from "../PluginManagerFactory";

export const DialogStyles = css`
    background-color: transparent !important;
`;

// let plugins = PluginManager.getAllPlugins()

type PluginSwitchProps = {
    name: string;
    active: boolean;
    section: string;
    description: string;
};

export const PluginSwitch: React.FC<PluginSwitchProps> = (props) => {
    const { name, active, section, description } = props;

    const pl = LocalPluginsManagement();

    const [isActive, setIsActive] = useState(active);

    const handlePluginSwitch = (
        section: string,
        name: string,
        active: boolean
    ) => {
        setIsActive(() => !active);
        pl.togglePlugin(section, name, !active);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <SettingLabel>
                {name}
                <Tooltip title={description}>
                    <InfoIcon
                        style={{ marginLeft: "1px" }}
                        fontSize={"inherit"}
                    />
                </Tooltip>
            </SettingLabel>
            <Switch
                size={"small"}
                checked={isActive}
                onChange={(e) => handlePluginSwitch(section, name, isActive)}
                inputProps={{
                    "aria-label": "controlled",
                }}
            />
        </div>
    );
};

export const PluginsSwitches = () => {
    const pl = LocalPluginsManagement();
    const [local] = useState(pl.getAll());
    const plugins: any = useMemo(() => {
        if (Object.keys(local)?.length > 0) {
            return Object.entries(local);
        }
        return [];

        //  return pl.getAll()
    }, [local]);

    return (
        <div style={{ marginTop: "6px" }}>
            <InputGroup>
                {plugins?.length > 0 &&
                    plugins?.map(
                        ([section, components]: any, index: number) => (
                            <div style={{ marginTop: "4px" }} key={index}>
                                <SettingLabelSection>
                                    {section}
                                </SettingLabelSection>
                                <div>
                                    {components?.length > 0 &&
                                        components?.map(
                                            (component: any, k: number) => (
                                                <PluginSwitch
                                                    name={component.name}
                                                    active={component.active}
                                                    section={section}
                                                    description={
                                                        component.description
                                                    }
                                                />
                                            )
                                        )}
                                </div>
                            </div>
                        )
                    )}
            </InputGroup>
        </div>
    );
};

export default function SettingsDialog({ open, onClose }: any) {
    const dispatch = useDispatch();
    const theme = useSelector((store: any) => store.theme);
    const autoTheme = useSelector((store: any) => store.autoTheme);
    const debugMode = useSelector((store: any) => store.debugMode);

    const [embedEdited, setEmbedEdited] = useState(
        getEmbed(window.location.href)
    );

    const [themeSet, setThemeSet] = useState(theme);
    const [autoThemeLocal, setLocalAutoTheme] = useState(autoTheme);
    useEffect(() => {
        setLocalAutoTheme(autoTheme);
    }, [autoTheme, setLocalAutoTheme]);
    function getEmbed(url: string) {
        return url + "&isEmbed=true";
    }

    useEffect(() => {
        setEmbedEdited(getEmbed(window.location.href));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.href]);

    useEffect(() => {
        setThemeSet(theme);
    }, [theme, setThemeSet]);

    function handleThemeSwitch() {
        const switchedTheme = themeSet === "light" ? "dark" : "light";
        dispatch(setTheme(switchedTheme));
        setThemeSet(switchedTheme);
        localStorage.setItem(
            "theme",
            JSON.stringify({ theme: switchedTheme, auto: autoThemeLocal })
        );
    }

    const handleAutoTheme = (val: any) => {
        const switchedAutoTheme = !autoThemeLocal;
        dispatch(setAutoTheme(switchedAutoTheme));
        setLocalAutoTheme(switchedAutoTheme);
        localStorage.setItem(
            "theme",
            JSON.stringify({ theme: theme, auto: switchedAutoTheme })
        );
    };

    function handleClose() {
        dispatch(setSettingsDialogOpen(false));
    }

    function handleEmbedChange(e: any) {
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
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                classes: {
                    root: DialogStyles,
                },
            }}
        >
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
                            size={"small"}
                            checked={themeSet === "dark"}
                            onChange={handleThemeSwitch}
                            disabled={autoThemeLocal}
                            inputProps={{ "aria-label": "controlled" }}
                        />

                        <SettingLabel>
                            Automatic theme detection{" "}
                            <Tooltip title="Theme determined by your system preferenes">
                                <InfoIcon fontSize={"inherit"} />
                            </Tooltip>
                        </SettingLabel>

                        <Switch
                            size={"small"}
                            checked={autoThemeLocal}
                            onChange={handleAutoTheme}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <SettingLabel>Set Debug Mode</SettingLabel>
                        <Switch
                            size={"small"}
                            checked={debugMode}
                            onChange={handleDebugSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </InputGroup>
                    <InputGroup>
                        <SettingLabel>Embed View</SettingLabel>
                        <EmbedArea
                            rows="8"
                            value={DOMPurify.sanitize(embedEdited)}
                            onChange={handleEmbedChange}
                        ></EmbedArea>
                    </InputGroup>
                    <SettingLabel>Plugins: </SettingLabel>
                    <PluginsSwitches />
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
}
