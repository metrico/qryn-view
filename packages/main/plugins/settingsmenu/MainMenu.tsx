import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { useMemo } from "react";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ExtensionIcon from "@mui/icons-material/Extension";
import useTheme from "@ui/theme/useTheme";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorageIcon from "@mui/icons-material/Storage";
import CopyButton from "./CopyButton/CopyButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuStyles } from "./styled";
import setSettingsDialogOpen from "@ui/store/actions/setSettingsDialogOpen";
import Fade from "@mui/material/Fade";
import { QrynTheme } from "@ui/theme/types";
export type USER_ROLES = "admin" | "superAdmin" | "user" | "guest";

export const ButtonMenuStyles = (theme: QrynTheme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
    paddingLeft: 0,
    cursor: "pointer",
    paddingRight: 0,
    width: "30px",
    height: "30px",
    background: "none",
    borderRadius: "3px",
    color: `${theme.accentNeutral}`,
    border: `1px solid ${theme.accentNeutral}`,
});

export default function MainMenu() {
    const { key } = useLocation();
    const showDs = useSelector((store: any) => store.showDataSourceSetting);
    const currentUserRole = useSelector((store: any) => store.currentUser.role);
    const dispatch: any = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const [userType, setUserType] = useState(currentUserRole || "superAdmin");

    useEffect(() => {
        setUserType(currentUserRole);
    }, [currentUserRole]);

    useEffect(() => {
        handleClose();
    }, [key]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(() => event.currentTarget);
    };

    const handleClose = (event?: any) => {
        event?.stopPropagation();
        event?.preventDefault();
        setAnchorEl(() => undefined);
    };

    const handleSettingsOpen = () => {
        handleClose();
        dispatch(setSettingsDialogOpen(true));
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="Settings">
                    <button
                        onClick={handleClick}
                        style={ButtonMenuStyles(theme)}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <MenuIcon style={{ width: "14px", height: "14px" }} />
                    </button>
                </Tooltip>
            </Box>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClick}
                PaperProps={{
                    elevation: 0,
                    sx: MenuStyles(theme),
                }}
                TransitionComponent={Fade}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
                <CopyButton c={"icon"} />
                <Divider />
                <MenuItem onClick={handleSettingsOpen} className={"item"}>
                    <DisplaySettingsIcon className="icon" /> General Settings
                </MenuItem>
                <Divider />

                <Link to="">
                    <MenuItem className={"item"}>
                        <TravelExploreIcon className="icon" />
                        Search
                    </MenuItem>
                </Link>

                <Link to="/plugins">
                    <MenuItem className={"item"}>
                        <ExtensionIcon className="icon" />
                        Plugins
                    </MenuItem>
                </Link>

                <Link to="/users">
                    <MenuItem className={"item"}>
                        <PersonOutlineOutlinedIcon className="icon" />
                        Users
                    </MenuItem>
                </Link>

                {showDs &&
                    (userType === "admin" || userType === "superAdmin") && (
                        <Link to="datasources">
                            <MenuItem className={"item"}>
                                <StorageIcon className="icon" />
                                Datasources
                            </MenuItem>
                        </Link>
                    )}
            </Menu>
        </>
    );
}
