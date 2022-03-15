import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import {Snackbar, Alert} from "@mui/material";

export function Notification() {  
    const { notifications } = useSelector(state =>  state);

    const [notification, setNotification] = useState({ type: "info", message: "" });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (notifications?.length > 0) {
          setNotification(notifications[notifications.length - 1]);
          setOpen(true);
        }
    }, [notifications]);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    severity={notification.type}
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </div>
    );
}