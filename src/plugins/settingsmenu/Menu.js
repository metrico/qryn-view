import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch, useSelector } from "react-redux";
import CopyButton from "./CopyButton/CopyButton";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";
import { MenuButton } from "./styled";
import { themes } from "../../theme/themes";
import { Link } from "react-router-dom";
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
))(({ theme, qryntheme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: qryntheme.textColor,
        border: `1px solid ${qryntheme.buttonBorder}`,
        backgroundColor: qryntheme.buttonDefault,
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            fontSize: 12,
            "& .MuiSvgIcon-root": {
                fontSize: 12,
                color: qryntheme.textColor,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: qryntheme.buttonDefault,
            },
        },
    },
}));

export default function ClokiMenu() {
    const dispatch = useDispatch();
    const showDs = useSelector((store) => store.showDataSourceSetting);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const storeTheme = useSelector((store) => store.theme);
    const qrynTheme = themes[storeTheme];

    const handleClick = (event) => {
        setAnchorEl(prev => event.currentTarget);
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
                theme={qrynTheme}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuIcon style={{ height: "16px", width: "16px" }} />
            </MenuButton>
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                qryntheme={qrynTheme}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <CopyButton />
                <MenuItem onClick={handleSettingsOpen}>
                    <DisplaySettingsIcon
                        style={{ color: qrynTheme.textColor }}
                    />{" "}
                    Query Settings
                </MenuItem>
                {showDs && (
                    <Link
                        to="datasources"
                        style={{ color: qrynTheme.textColor }}
                    >
                        <MenuItem>
                            <TuneIcon style={{ color: qrynTheme.textColor }} />
                            Datasources
                        </MenuItem>
                    </Link>
                )}
            </StyledMenu>
        </div>
    );
}
