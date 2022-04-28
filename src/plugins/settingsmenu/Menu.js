import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import { useDispatch, useSelector } from "react-redux";
import CopyButton from "./CopyButton/CopyButton";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";
import { MenuButton } from "./styled";
import {themes} from '../../theme/themes'
const StyledMenu = styled((props) => (
    
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme,clokitheme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:clokitheme.textColor,
        border: `1px solid ${clokitheme.buttonBorder}`,
        backgroundColor: clokitheme.buttonDefault,
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            fontSize:12,
            "& .MuiSvgIcon-root": {
                fontSize: 12,
                color: clokitheme.textColor,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: clokitheme.buttonDefault,
            },
        },
    },
}));

export default function ClokiMenu() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const storeTheme = useSelector( store => store.theme)
    const clokiTheme = themes[storeTheme]
  
    const handleClick = (event) => {
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
        <div>
            <MenuButton
               theme={clokiTheme}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuIcon style={{height:'16px',width:'16px'}} />
            </MenuButton>
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                clokitheme={clokiTheme}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <CopyButton />
                <MenuItem onClick={handleSettingsOpen}>
                    <DisplaySettingsIcon style={{ color:clokiTheme.textColor }} /> Query
                    Settings
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
