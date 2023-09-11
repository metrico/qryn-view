import React, { useState } from "react";
import {
    ClearHistoryButton,
    DialogCancelButton,
    DialogConfirmButton,
} from "../queryhistory/styled";
 import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import styled from "@emotion/styled";
import { DialogStyles } from "../settingsdialog/SettingsDialog";
import useTheme from "../../theme/useTheme";

const AlertCont = styled.div`
    background: ${({ theme }: any) => theme.shadow};
    #alert-dialog-title {
        color: ${({ theme }: any) => theme.contrast};
        span  {
           color: ${({ theme }: any) => theme.primary};
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
    }
    #alert-dialog-description {
        color: ${({ theme }: any) => theme.lightContrast};
        font-weight: normal;
    }
`;

export type CardinalityDialogProps = {
    clearFingerPrints: () => void;
    label: string;
    value: number;
    source: string;
};

export default function CardinalityDialog({
    clearFingerPrints,
    label,
    value,
    source,
}: CardinalityDialogProps) {
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleClearFingerprints() {
        clearFingerPrints();
        setOpen(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Tooltip title={`Delete fingerprints for ${label}`}>
                    <ClearHistoryButton onClick={handleClickOpen}>
                   < DeleteOutlineOutlinedIcon fontSize={"small"} />
                    </ClearHistoryButton>
                </Tooltip>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        classes: {
                            root: DialogStyles,
                        },
                    }}
                >
                    <AlertCont>
                        <DialogTitle id="alert-dialog-title">
                            Are you sure you want to clear the <span>{value}</span> fingerprints with label <span>{label}</span> from <span>{source}</span>?
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Click <em>Delete Fingerprints</em> to delete your{" "}
                                fingerprints permanently
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancelButton onClick={handleClose}>
                                Cancel
                            </DialogCancelButton>
                            <DialogConfirmButton
                                onClick={handleClearFingerprints}
                                autoFocus
                            >
                                Delete Fingerprints
                            </DialogConfirmButton>
                        </DialogActions>
                    </AlertCont>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
