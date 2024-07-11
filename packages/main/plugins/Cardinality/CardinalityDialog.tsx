import React, { useState, useEffect } from "react";
import {
    DialogCancelButton,
    DialogConfirmButton,
} from "../queryhistory/styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Tooltip,
} from "@mui/material";

import { ThemeProvider } from "@mui/styles";
import styled from "@emotion/styled";
import { DialogStyles } from "../settingsdialog/SettingsDialog";
import useTheme from "../../theme/useTheme";
import { queryUpdater } from "./helpers";
import useCardinalityStore from "./store/CardinalityStore";
import { QrynTheme } from "@ui/theme/types";

const AlertCont = styled.div<{theme?:QrynTheme}>`
    background: ${({ theme }) => theme.shadow};
    #alert-dialog-title {
        color: ${({ theme }) => theme.contrast};
        span {
            color: ${({ theme }) => theme.primary};
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
        code {
            color: ${({ theme }) => theme.contrast};
            font-family: monospace;
            max-width: 100%;
            font-size: 0.8em;
            background: ${({ theme }) => theme.background};
            display: flex;
            flex:1;
            padding: 0.5em;
            word-wrap: break-word;
            border-radius: 4px;

        }
    }
    #alert-dialog-description {
        color: ${({ theme }) => theme.lightContrast};
        font-weight: normal;
        code {
            color: ${({ theme }) => theme.contrast};
            font-family: monospace;
            max-width: 100%;
            font-size: 0.8em;
        }
        em {
            color: ${({ theme }) => theme.contrast};
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
    labelsRelated?: string[];
};

export type LabelRelatedProps = {
    label: string;
    theme: QrynTheme;
};
export function LabelRelated({ label, theme }: LabelRelatedProps) {
    return (
        <p
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "3px 10px",
                borderRadius: "3px",
                margin: "2px",
                fontWeight: "bold",
                color: theme.primary,
                background: theme.deep,
            }}
        >
            {label}
        </p>
    );
}

export function CheckboxWithLabel({
    label,
    checked,
    handleChange,
    theme,
    text,
}) {
    return (
        <FormGroup>
            <FormControlLabel
                style={{
                    padding: "0",
                    marginRight: 0,
                    cursor: !label ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                }}
                checked={checked}
                onChange={handleChange}
                control={
                    <Checkbox
                        style={{
                            paddingRight: "0px",
                            marginRight: "3px",
                        }}
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: 18,
                            },
                        }}
                        disabled={!label}
                    />
                }
                label={
                    <span
                        style={{
                            fontSize: "14px",
                            color: theme.contrast,
                        }}
                    >
                        {text}
                    </span>
                }
            />
        </FormGroup>
    );
}

export default function CardinalityDialog({
    clearFingerPrints,
    label,
    value,
    source,
    isLoading,
    isCustom = false,
    query = "",
   // labelsRelated = [],
}: CardinalityDialogProps) {
    const [open, setOpen] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState(false);
    const [queryMatchText, setQueryMatchText] = useState("");
    const theme = useTheme();
    const { focusLabel, timeSeriesSelector: match } = useCardinalityStore();

    useEffect(() => {
        if (open) {
            if(queryUpdater[source]) {
                const matchText = queryUpdater[source]({ query: label, match, isDialog:true });
                const commaspaced = matchText.replace(/[,]/g,", ")
                setQueryMatchText(commaspaced);
            }
          
        }
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setConfirmRemove((prev) => !prev);
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
                <Tooltip
                    title={`Delete fingerprints for ${
                        label !== "" ? label : query
                    }`}
                >
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
                            {isCustom ? (
                                <>
                                    Are you sure you want to clear the{" "}
                                    <span>{value}</span> fingerprints with query{" "}
                                    <code>{query}</code>?
                                </>
                            ) : (
                                // this is the one that should match the query
                                <>
                                    Are you sure you want to clear the{" "}
                                    <span>{value}</span> fingerprints with{" "}
                                    <code>{queryMatchText}</code>
                                    request?
                                </>
                            )}
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <span style={{ marginTop: "10px" }}>
                                    Click <em>Delete Fingerprints</em> to delete
                                    your fingerprints permanently
                                </span>
                                <br />
                                <span style={{ margin: "6px" }}>
                                    <em>
                                        Note that you will also be removing all
                                        fingerprints with labels related.
                                    </em>
                                </span>

                                <CheckboxWithLabel
                                    checked={confirmRemove}
                                    handleChange={handleConfirm}
                                    theme={theme}
                                    label={true}
                                    text={
                                        "I want to remove all fingerprints related to this labels in selected time range."
                                    }
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancelButton onClick={handleClose}>
                                Cancel
                            </DialogCancelButton>
                            <DialogConfirmButton
                                onClick={handleClearFingerprints}
                                active={!isLoading && confirmRemove}
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
