import { css, cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { useState } from "react";

const CustomSwitchStyles = (theme: any) => {
    return css`
        .switch {
            position: relative;
            display: inline-block;
            margin-right: 8px;
            margin-left: 8px;
            width: 28px;
            height: 12px;
            border-radius: 4px;
            display: flex;
            align-items: center;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 12px;
            width: 28px;
            display: flex;
            aligin-items: center;
            background-color: ${theme.shadow};
            border: 1px solid ${theme.neutral};
            -webkit-transition: 0.25s;
            transition: 0.25s;
            border-radius: 6px;
            &.active {
                background-color: ${theme.primaryAccent};
                border: 1px solid ${theme.primary};
                &:before {
                    background-color: ${theme.primaryLight};
                    border-left: 4px solid ${theme.primary};
                    left: 12px;
                    border-right: 0px;
                }
            }
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 12px;
            width: 12px;
            left: 0px;
            bottom: 0;
            background-color: ${theme.contrastNeutral};
            -webkit-transition: 0.25s;
            transition: 0.25s;
            border-radius: 6px;
            border-right: 4px solid ${theme.accentNeutral};
        }
    `;
};

type CustomSwitchProps = {
    defaultActive?: boolean;
    onChange?: (e: any) => void;
};

const CustomSwitch = ({ defaultActive, onChange }: CustomSwitchProps) => {
    const theme = useTheme();
    const classes = CustomSwitchStyles(theme);
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
