import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ExtensionIcon from '@mui/icons-material/Extension';
import { useTheme } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import CopyButton from "./CopyButton/CopyButton";
import Avatar from "react-avatar";
export default function MainMenu() {
    const showDs = useSelector((store: any) => store.showDataSourceSetting);
    const currentUser = useSelector((store:any) => store.currentUser);
    const userType = useSelector((store: any) => store.userType);
    const dispatch = useDispatch();
    
    const theme = useTheme();
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
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
        <React.Fragment>
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
                        
                        sx={{ ml: 2 , color: `${theme.textColor}`,}}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar name={currentUser.name} size={"30px"} round={"3px"} />
                       {/* <MenuIcon style={{ height: "16px", width: "16px" }} /> */}
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
                    sx: {
                        color: `${theme.textColor}`,
                        overflow: "visible",
                        fontSize: "12px",
                        background: `${theme.widgetContainer}`,
                        border: `1px solid ${theme.buttonBorder}`,
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },

                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            borderLeft: `1px solid ${theme.buttonBorder}`,
                            borderTop: `1px solid ${theme.buttonBorder}`,
                            bgcolor: `${theme.widgetContainer}`,
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                        "& .icon" : {
                          fontSize:'16px',
                          marginRight:'4px',
                          color: `${theme.textColor}`
                        },
                        "& .item" : {
                          fontSize:'12px',
                          color: `${theme.textColor}`
                        }
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <CopyButton c={'icon'} />
                <Divider />
                <MenuItem
                    onClick={handleSettingsOpen}
                    className={'item'}
                >
                    <DisplaySettingsIcon  className="icon"/> General Settings
                </MenuItem>
                <Divider />

                <Link to="/">
                    <MenuItem className={'item'}>
                        <TravelExploreIcon className="icon" />
                        Search
                    </MenuItem>
                </Link>

                <Link to="/plugins">
                    <MenuItem className={'item'}>
                        <ExtensionIcon className="icon" />
                        Plugins
                    </MenuItem>
                </Link>

                <Link to="/users">
                        <MenuItem className={'item'}>
                            <PersonOutlineOutlinedIcon  className="icon"/>
                            Users
                        </MenuItem>
                    </Link>

                {showDs && userType === "admin" && (
                    <Link to="datasources">
                        <MenuItem className={'item'}>
                            <StorageIcon  className="icon"/>
                            Datasources
                        </MenuItem>
                    </Link>
                )}
            </Menu>
        </React.Fragment>
    );
}
