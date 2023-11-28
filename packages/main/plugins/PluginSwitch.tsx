import { LocalPluginsManagement } from "./PluginManagerFactory";
import { Switch } from "@mui/material";
import React, { useState } from "react";

export type PluginSwitchProps = {
    name: string;
    active: boolean;
    section: string;
};

export const PluginSwitch: React.FC<PluginSwitchProps> = (props) => {
    const { name, active, section } = props;

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
        <>
            <Switch
                size={"small"}
                checked={isActive}
                onChange={() => handlePluginSwitch(section, name, isActive)}
                inputProps={{
                    "aria-label": "controlled",
                }}
            />
        </>
    );
};
