import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import { useDispatch, useSelector } from "react-redux";
import CopyButton from "./CopyButton/CopyButton";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";
import { themes } from "../../theme/themes";
import { MenuButton } from "./styled";

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
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.textColor,
        background: theme.mainBgColor,
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            fontSize:12,
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.textColor,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: theme.buttonHover,
            },
        },
    },
}));

export default function ClokiMenu() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
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
    const theme = useSelector(store => store.theme);
    return (
        <div>
            <MenuButton
                style={{ color: themes[theme].textColor, background: themes[theme].mainBgColor }}
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
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <CopyButton />
                <MenuItem onClick={handleSettingsOpen}>
                    <DisplaySettingsIcon /> Query Settings
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
