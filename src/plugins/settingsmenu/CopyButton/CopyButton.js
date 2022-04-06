import { useSelector, useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createAlert, setIsSubmit } from "../../../actions";
import { notificationTypes } from "../../notifications/consts";
import localUrl from "../../../services/localUrl";
import setLinksHistory from "../../../actions/setLinksHistory";
import { MenuItem } from "@mui/material";

export default function CopyButton() {
    const dispatch = useDispatch();
    const query = useSelector((store) => store.query);
    const saveUrl = localUrl();
    const LINK_COPIED = "Link Copied To Clipboard";
    function shareLink() {
        dispatch(setIsSubmit(true));
        setTimeout(() => {
            if (navigator?.clipboard && window.isSecureContext) {
                navigator?.clipboard?.writeText(window.location.href).then(
                    function () {
                        if (query.length > 0) {
                            const storedUrl = saveUrl.add({
                                data: window.location.href,
                                description: "From Shared URL",
                            });
                            dispatch(setLinksHistory(storedUrl));
                        }

                        dispatch(
                            createAlert({
                                type: notificationTypes.success,
                                message: LINK_COPIED,
                            })
                        );
                    },
                    function (err) {
                        console.err("error on copy", err);
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
                    if (query.length > 0) {
                        const storedUrl = saveUrl.add({
                            data: window.location.href,
                            description: "From Shared URL",
                        });
                        dispatch(setLinksHistory(storedUrl));
                    }
              
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
        <MenuItem onClick={shareLink} disabled={query.length < 1}>
            {" "}
            <ContentCopyIcon style={{color:'#ddd'}} fontSize={"15px"} />
            <span>{"Copy Link"}</span>
        </MenuItem>
    );
}
