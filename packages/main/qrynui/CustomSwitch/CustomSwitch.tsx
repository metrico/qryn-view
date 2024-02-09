import {  cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { useState } from "react";

import CustomSwitchStyles from "./CustomSwitchStyles";

type CustomSwitchProps = {
    defaultActive?: boolean;
    onChange?: (e: any) => void;
    disabled?: boolean
};

const CustomSwitch = ({ defaultActive, onChange, disabled=false }: CustomSwitchProps) => {
    const theme = useTheme();
    const classes = CustomSwitchStyles(theme, disabled);
    const [active, setActive] = useState(defaultActive ?? false);
    const onSwitchChange = (e: any) => {
        if (onChange) onChange(e);
        setActive((active) => !active);
    };
    return (
        <div className={cx(classes)}>
            <label className={`switch ${active ? "active" : ""}`}>
                <input
                    checked={active}
                    onChange={onSwitchChange}
                    type="checkbox"
                />
                <span
                    className={`slider round ${active ? "active" : ""}`}
                ></span>
            </label>
        </div>
    );
};

export default CustomSwitch;
