import React from "react";

import { Box, IconButton, Tooltip } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Menu from "@mui/material/Menu";
import useTheme from "@ui/theme/useTheme";
import styled from "@emotion/styled";

import { format } from "date-fns";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import { DATE_FORMAT } from "./consts";
import "react-day-picker/dist/style.css";
import useCardinalityStore from "./store/CardinalityStore";

export const MenuButton = styled.button`
    border: none;
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    color: ${(props: any) => props.theme.contrast};
    padding: 3px 12px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 26px;
`;

export const MenuStyles = (theme: any) => ({
    color: `${theme.contrast}`,
    overflow: "visible",
    fontSize: "12px",
    background: `${theme.shadow}`,
    border: `1px solid ${theme.accentNeutral}`,
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
        borderLeft: `1px solid ${theme.accentNeutral}`,
        borderTop: `1px solid ${theme.accentNeutral}`,
        bgcolor: `${theme.shadow}`,
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
    },
    "& .icon": {
        fontSize: "16px",
        marginRight: "4px",
        color: `${theme.contrast}`,
    },
    "& .item": {
        fontSize: "12px",
        color: `${theme.contrast}`,
    },
    ".rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover":
        {
            background: `${theme.primary}`,
            color: `${theme.contrast}`,
        },
    "& .rdp-day_selected : hover": {
        background: `${theme.primary}`,
        color: `${theme.contrast}`,
    },
});

export default function PickerMenu() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const { date, setDate } = useCardinalityStore();
    const [selected, setSelected] = React.useState<Date>(new Date(date));

    const open = Boolean(anchorEl);

    let footer = <p>Please pick a day.</p>;

    if (selected) {
        footer = <p>You picked {format(selected, "PP")}.</p>;
    }

    const handleSelect = (dateSelected: Date) => {
        setSelected(() => dateSelected);
        setDate(dayjs(dateSelected).format(DATE_FORMAT));
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        // setAnchorEl(null);
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
                {selected && (
                    <p style={{ fontSize: ".8em" }}>
                        {dayjs(selected).format(DATE_FORMAT)}
                    </p>
                )}
                <Tooltip title="Select Day">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{
                            ml: 2,
                            color: `${theme.contrast}`,
                            background: `${theme.primaryAccent}`,
                            "&.MuiIconButton-root": {
                                border: `1px solid ${theme.primary}`,
                                borderRadius: "3px",
                            },
                        }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <CalendarMonthOutlinedIcon
                            style={{ height: "16px", width: "16px" }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                //  onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: MenuStyles(theme),
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={handleSelect}
                    footer={footer}
                />
            </Menu>
        </>
    );
}
