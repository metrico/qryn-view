import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import { useDispatch } from "react-redux";

import CopyButton from "./CopyButton/CopyButton";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";

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
        color: "#ddd",
        backgroundColor: "#333",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: "#222",
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
    return (
        <div>
            <Button
                style={{ color: "#ddd" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
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
                    <DisplaySettingsIcon style={{ color: "#ddd" }} /> Query
                    Settings
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
