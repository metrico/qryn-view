import { IconButton, Snackbar } from "@mui/material";
import { CloseIcon } from '@mui/icons-material/CloseIcon';
import React from "react";

export default function NotificationSnackbar(props) {
    const [open,setOpen] =  useState(false)
    useEffect(()=> {
        setOpen(prop.open)
    },[props.open])
    const handleClick = () => {
        setOpen(true)
    };
    const handleClose = (event, reason) => {
            if(reason === 'clickaway') {
                return;
            }
            setOpen(false)
        }

    const action = (
        <React.Fragment>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            >
<CloseIcon fontSize="small">

</CloseIcon>
            </IconButton>
        </React.Fragment>
    )    

    return(
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.message}
        action={action}/>
    )

    }