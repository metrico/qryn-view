import { cx, css } from "@emotion/css";
import { QrynTheme } from "@ui/theme/types";
import useTheme from "@ui/theme/useTheme";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";

const CustomMenuButtonStyles = (theme: QrynTheme) => css`
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    align-items: center;
    background: ${theme.neutral};
    border: 1px solid ${theme.accentNeutral};
    color: ${theme.contrast};
    border-radius: 3px;
    height: 26px;
    margin: 0px 1px;
    padding: 3px 5px;
    span {
        margin-left: 5px;
    }
    svg {
        font-size: 1.15em;
        margin: 0px 2px;
    }
    &:hover {
        color: orange;
    }
    .tooltip {
        background-color: red;
        display: flex;
        align-items: center;
        justify-items: center;
    }
`;

export type CustomMenuProps = {
    theme: QrynTheme;
    id: string;
    open: boolean;
    anchorEl: null | HTMLElement;

    handleClose: (
        event: React.MouseEvent<HTMLElement>,
        reason: "backdropClick" | "escapeKeyDown" | "forward",
        value: string
    ) => void;
} & any;

export const CustomMenu: React.FC<CustomMenuProps> = ({
    theme,
    id,
    ...rest
}) => {
    return (
        <Menu
            id={id}
            elevation={0}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            PaperProps={{
                sx: {
                    background: theme.neutral,
                    color: theme.contrast,
                },
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            {...rest}
        />
    );
};

export type CardinalityCustomMenuProps = {
    handleClick?: (event: React.MouseEvent<HTMLElement>) => void;
    menuItems: (string | number)[];
    handleClose?: (event: any) => void;
    id: string;
};

export const CardinalityCustomMenu: React.FC<CardinalityCustomMenuProps> = ({
    id,
    //handleClick,
     handleClose,
    menuItems,
}) => {
    const theme = useTheme() as QrynTheme;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  

    const handleClick = (event: any) => {
        setAnchorEl(() => event.currentTarget);
    };
    const handleCloseMenu = (e: any) => {
        setAnchorEl(null);
        if(e.target.innerText){
        handleClose(e);
        }
        //console.log(e.target.innerText);
    };

    return (
        <>
            <button
                onClick={handleClick}
                id={`custom-menu-button-${id}`}
                className={cx(CustomMenuButtonStyles(theme))}
                aria-controls={open ? `custom-menu${id}` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <RestoreIcon fontSize="small" />
            </button>

            <CustomMenu
                id={`custom-menu-${id}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                theme={theme}
            >
                {menuItems?.map((option,key) => (
                    <MenuItem
                        key={`${option}-${key} r`}
                        sx={{ "&.MuiMenuItem-root": { fontSize: 12 } }}
                        onClick={handleCloseMenu}
                    >
                        {option}
                    </MenuItem>
                ))}
            </CustomMenu>
        </>
    );
};
