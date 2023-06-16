import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ExtensionIcon from "@mui/icons-material/Extension";
import { useTheme } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorageIcon from "@mui/icons-material/Storage";
import CopyButton from "./CopyButton/CopyButton";
import Avatar from "react-avatar";
import { MenuStyles } from "./styled";

export type USER_ROLES = "admin" | "superAdmin" | "user" | "guest";

export const hasAccess = (userType: USER_ROLES, accessType: USER_ROLES) => {};

export default function MainMenu() {
    const showDs = useSelector((store: any) => store.showDataSourceSetting);
    const currentUser = useSelector((store: any) => store.currentUser);
    const currentUserRole = useSelector((store: any) => store.currentUser.role);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [userType, setUserType] = useState(currentUserRole || "superAdmin");

    useEffect(() => {
        setUserType(currentUserRole);
    }, [currentUserRole]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSettingsOpen = () => {
        dispatch(setSettingsDialogOpen(true));
        handleClose();
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
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, color: `${theme.textColor}` }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar
                            name={currentUser.name}
                            size={"30px"}
                            round={"3px"}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: MenuStyles(theme),
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <CopyButton c={"icon"} />
                <Divider />
                <MenuItem onClick={handleSettingsOpen} className={"item"}>
                    <DisplaySettingsIcon className="icon" /> General Settings
                </MenuItem>
                <Divider />

                <Link to="/">
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

                {showDs && (userType === "admin"|| userType === "superAdmin") && (
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
