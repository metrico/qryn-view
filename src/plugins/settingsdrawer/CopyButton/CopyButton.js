import { useSelector, useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createAlert, setIsSubmit } from "../../../actions";
import { notificationTypes } from "../../notifications/consts";
import localUrl from "../../../services/localUrl";
import setLinksHistory from "../../../actions/setLinksHistory";
import { MenuButton, MenuButtonCont } from "../styled";

export default function CopyButton() {
    const dispatch = useDispatch();
    const query = useSelector((store) => store.query);
    const saveUrl = localUrl();
    const LINK_COPIED = "Link Copied To Clipboard";
    function shareLink() {
        const setSubmit = dispatch(setIsSubmit(true));
        setTimeout(() => {
            navigator.clipboard.writeText(window.location.href).then(
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
        }, 200);
    }
    return (
        <MenuButtonCont>
            <MenuButton
              
                onClick={shareLink}
                disabled={query.length < 1}
            >
                {" "}
                <ContentCopyIcon fontSize={"15px"} />
                <span>{"Copy Link"}</span>
            </MenuButton>
        </MenuButtonCont>
    );
}
