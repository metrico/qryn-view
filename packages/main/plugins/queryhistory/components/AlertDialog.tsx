import { useState } from "react";
import {
    ClearHistoryButton,
    DialogCancelButton,
    DialogConfirmButton,
} from "../styled";
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
import { DialogStyles } from "../../settingsdialog/SettingsDialog";
import useTheme from "@ui/theme/useTheme";
const AlertCont = styled.div`
    background: ${({ theme }: any) => theme.shadow};
    #alert-dialog-title {
        color: ${({ theme }: any) => theme.contrast};
        background: ${({theme}:any) => theme.deep};
    }
    #alert-dialog-description {
        color: ${({ theme }: any) => theme.lightContrast};
        font-weight: normal;
    }
`;
export default function AlertDialog({ clearHistory, dialogType }: any) {
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleClearHistory() {
        clearHistory();
        setOpen(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Tooltip title={"Clear Query History"}>
                    <ClearHistoryButton onClick={handleClickOpen}>
                        {"Clear History"}
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
                            Are you sure you want to clear the {dialogType}{" "}
                            History?
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Click ‘Clear History’ to delete your{" "}
                                {dialogType} history permanently
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancelButton onClick={handleClose}>
                                Cancel
                            </DialogCancelButton>
                            <DialogConfirmButton
                                active={true}
                                onClick={handleClearHistory}
                                autoFocus
                            >
                                Clear History
                            </DialogConfirmButton>
                        </DialogActions>
                    </AlertCont>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
