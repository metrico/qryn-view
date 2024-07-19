import * as React from "react";
import { Button } from "./ui";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DOMPurify from "isomorphic-dompurify";
import useTheme from "@ui/theme/useTheme";

export type ConfirmDialogProps = {
    saveDataSource: () => void;
    changed: boolean;
};

export default function ConfirmDialog({
    saveDataSource,
    changed,
}: ConfirmDialogProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveDataSource();
        handleClose();
    };

    const handleCancel = () => {
        handleClose();
    };

    return (
        <React.Fragment>
            <Button
                primary={changed}
                value={DOMPurify.sanitize("Save")}
                onClick={handleClickOpen}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{ background: theme.shadow, color: theme.contrast }}
                >
                    {"Save DataSource Settings"}
                </DialogTitle>
                <DialogContent style={{ background: theme.shadow }}>
                    <DialogContentText
                        style={{ color: theme.contrast }}
                        id="alert-dialog-description"
                    >
                        Are you sure you want to store and modify current
                        DataSource settings?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ background: theme.shadow }}>
                    <Button
                        onClick={handleCancel}
                        value={DOMPurify.sanitize("Cancel")}
                        primary={false}
                    />
                    <Button
                        value={DOMPurify.sanitize("Save")}
                        onClick={handleSave}
                        primary={changed}
                        autoFocus
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
