import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createAlert, setIsSubmit } from "@ui/store/actions";
import localUrl from "../../../services/localUrl";
import setLinksHistory from "@ui/store/actions/setLinksHistory";
import { MenuItem } from "@mui/material";
import { notificationTypes } from "@ui/qrynui/notifications/consts";
import { useLocation } from "react-router-dom";

export default function CopyButton(props:any) {
    const{c} = props
    const dispatch: any = useDispatch();
    const saveUrl = localUrl();
    const {hash} = useLocation()
    const LINK_COPIED = "Link Copied To Clipboard";
    function shareLink() {
        dispatch(setIsSubmit(true));
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                navigator?.clipboard?.writeText(window.location.href).then(
                    function () {
                      
                            const storedUrl = saveUrl.add(hash, {
                                data: {href:window.location.href},
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
              
                return new Promise((res:any, rej:any) => {
               
                        const storedUrl = saveUrl.add(hash,{
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
        <MenuItem onClick={shareLink} disabled={false} style={{fontSize:'12px'}}>
            {" "}
            <ContentCopyIcon fontSize={"small"} className={c} />
            <span>{"Copy Link"}</span>
        </MenuItem>
    );
}
