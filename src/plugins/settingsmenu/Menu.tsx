import {useState} from "react";
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
import { Link } from "react-router-dom";
import { useTheme } from "../../components/DataViews/components/QueryBuilder/hooks";


const StyledMenu = styled((props: any) => (
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
))((props: any) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: props.theme.spacing(1),
        minWidth: 180,
        color: props.qryntheme.textColor,
        border: `1px solid ${props.qryntheme.buttonBorder}`,
        backgroundColor: props.qryntheme.buttonDefault,
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            fontSize: 12,
            "& .MuiSvgIcon-root": {
                fontSize: 12,
                color: props.qryntheme.textColor,
                marginRight: props.theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: props.qryntheme.buttonDefault,
            },
        },
    },
}));

export default function ClokiMenu() {
    const dispatch = useDispatch();
    const showDs = useSelector((store: any) => store.showDataSourceSetting);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const qrynTheme = useTheme();

    const handleClick = (event: any) => {
        setAnchorEl((prev) => event.currentTarget);
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
