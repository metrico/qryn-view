import React, { useState } from "react";
import {
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
import { queryUpdater } from "./helpers";
import useCardinalityStore from "./store/CardinalityStore";

const AlertCont = styled.div`
    background: ${({ theme }: any) => theme.shadow};
    #alert-dialog-title {
        color: ${({ theme }: any) => theme.contrast};
        span {
            color: ${({ theme }: any) => theme.primary};
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
    }
    #alert-dialog-description {
        color: ${({ theme }: any) => theme.lightContrast};
        font-weight: normal;
        em {
            color: ${({ theme }: any) => theme.contrast};
            font-variant: italic;
        }
    }
`;

export type CardinalityDialogProps = {
    clearFingerPrints: (query: string) => void;
    label: string;
    value: number;
    source: string;
    isLoading: boolean;
    isCustom?: boolean;
    query?: string;
};

export default function CardinalityDialog({
    clearFingerPrints,
    label,
    value,
    source,
    isLoading,
    isCustom = false,
    query = "",
}: CardinalityDialogProps) {
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const { focusLabel, timeSeriesSelector: match } = useCardinalityStore();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    async function handleClearFingerprints() {
        //

        let queryText = query ?? "";

        if (!isCustom) {
            queryText = queryUpdater[source]({
                query: label,
                focusLabel,
                match,
            });
        }

        await clearFingerPrints(queryText);

        // this should give a response from the server

        setOpen(false);

    }
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Tooltip title={`Delete fingerprints for ${label !== "" ? label : query}`}>
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <DeleteOutlineOutlinedIcon
                            onClick={handleClickOpen}
                            style={{
                                color: theme.contrast,
                                cursor: "pointer",
                                fontSize: "18px",
                            }}
                            fontSize={"small"}
                        />
                    </div>
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
                          {
                            isCustom ? (<>
                                 Are you sure you want to clear the{" "}
                            <span>{value}</span> fingerprints with query {query}?
                            </>) : (<>
                                Are you sure you want to clear the{" "}
                            <span>{value}</span> fingerprints with label{" "}
                            <span>{label}</span> from <span>{source}</span>?
                            </>)
                          }  
                          
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Click <em>Delete Fingerprints</em> to delete
                                your fingerprints permanently
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancelButton onClick={handleClose}>
                                Cancel
                            </DialogCancelButton>
                            <DialogConfirmButton
                                onClick={handleClearFingerprints}
                                active={!isLoading}
                                autoFocus
                            >
                                {!isLoading
                                    ? "Delete Fingerprints"
                                    : "Deleting..."}
                            </DialogConfirmButton>
                        </DialogActions>
                    </AlertCont>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
