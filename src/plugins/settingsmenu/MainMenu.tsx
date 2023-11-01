import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
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
import MenuIcon from '@mui/icons-material/Menu';
import { MenuStyles } from "./styled";

export type USER_ROLES = "admin" | "superAdmin" | "user" | "guest";

export const hasAccess = (userType: USER_ROLES, accessType: USER_ROLES) => {};

export default function MainMenu() {
    const showDs = useSelector((store: any) => store.showDataSourceSetting);
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
                    <button
                        onClick={handleClick}
                       
                       style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        marginLeft: 2, paddingLeft:0, cursor:'pointer',paddingRight:0, width:'30px', height:'30px', background:'none', borderRadius:'3px',color: `${theme.textColor}`, border: `1px solid ${theme.buttonBorder}`}}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                       <MenuIcon style={{width:'14px', height:'14px'}}/>
                    </button>
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
