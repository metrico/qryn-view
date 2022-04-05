
import { useState } from 'react';
import { ClearHistoryButton, DialogCancelButton, DialogConfirmButton } from '../../styled';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';


  export default  function AlertDialog({ clearHistory, dialogType }) {
        const [open, setOpen] = useState(false);
    
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
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to clear the {dialogType} History?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Click ‘Clear History’ to delete your {dialogType}{" "}
                            history permanently
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <DialogCancelButton onClick={handleClose}>
                            Cancel
                        </DialogCancelButton>
                        <DialogConfirmButton onClick={handleClearHistory} autoFocus>
                            Clear History
                        </DialogConfirmButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
