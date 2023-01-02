import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createAlert, setIsSubmit } from "../../../actions";
import localUrl from "../../../services/localUrl";
import setLinksHistory from "../../../actions/setLinksHistory";
import { MenuItem } from "@mui/material";
import { notificationTypes } from "../../../qryn-ui/notifications/consts";

export default function CopyButton() {
    const dispatch = useDispatch();
    const saveUrl = localUrl();
    const LINK_COPIED = "Link Copied To Clipboard";
    function shareLink() {
        dispatch(setIsSubmit(true));
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                navigator?.clipboard?.writeText(window.location.href).then(
                    function () {
                      
                            const storedUrl = saveUrl.add({
                                data: window.location.href,
                                description: "From Shared URL",
                            }, 10);
                            dispatch(setLinksHistory(storedUrl));
                        

                        dispatch(
                            createAlert({
                                type: notificationTypes.success,
                                message: LINK_COPIED,
                            })
                        );
                    },
                    function (err) {
                        console.log("error on copy", err);
                    }
                );
            } else {
                let textArea = document.createElement("textarea");
                textArea.value = window.location.href;

                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
              
                return new Promise((res, rej) => {
               
                        const storedUrl = saveUrl.add({
                            data: window.location.href,
                            description: "From Shared URL",
                        }, 10);
                        dispatch(setLinksHistory(storedUrl));
                 
              
                    document.execCommand("copy") ? res() : rej();
                    textArea.remove();
                    dispatch(
                        createAlert({
                            type: notificationTypes.success,
                            message: LINK_COPIED,
                        })
                    );
                });
            }
        }, 200);
    }
    return (
        <MenuItem onClick={shareLink} disabled={false}>
            {" "}
            <ContentCopyIcon fontSize={"15px"} />
            <span>{"Copy Link"}</span>
        </MenuItem>
    );
}
