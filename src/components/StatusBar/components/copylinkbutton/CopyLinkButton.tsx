import { createAlert } from "../../../../actions/createAlert";
import { useDispatch, useSelector } from "react-redux";
import setLinksHistory from "../../../../actions/setLinksHistory";
import { setIsSubmit } from "../../../../actions/setIsSubmit";
import { UrlCopyButton } from "../../styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";
import { storedUrl } from "./helpers";

export default function CopyLinkButton() {
  const LINK_COPIED = "Link Copied To Clipboard";

  const dispatch = useDispatch();

  function alertSuccess() {
    dispatch(
      createAlert({
        type: "success",
        message: LINK_COPIED,
      })
    );
  }

  function storeHistory() {
    dispatch(setLinksHistory(storedUrl()));
  }
  function shareDefaultLink() {
    navigator.clipboard.writeText(window.location.href).then(
      function () {
        storeHistory();
        alertSuccess();
      },
      function (err) {
        console.log("error on copy", err);
      }
    );
  }
  function setSubmitted() {
    dispatch(setIsSubmit(true));
  }
  function shareDomLink() {
    let textArea: any = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style = {
      position: "fixed",
      left: "-999999px",
      top: "-999999px",
    };

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((res: Function, rej: Function) => {
      storeHistory();

      alertSuccess();
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
  const setTitle = "Copy Link";

  const setActive = true;

  function copyLink(e: any) {
    e.preventDefault();
    setSubmitted();
    setTimeout(() => {
      if (navigator?.clipboard && window.isSecureContext) {
        shareDefaultLink();
      } else {
        shareDomLink();
      }
    }, 200);
  }
  return (
    <>
      <Tooltip title={setTitle + ''}>
        <UrlCopyButton onClick={copyLink} isActive={setActive}>
          <ContentCopyIcon fontSize="small" />
          Copy Link
        </UrlCopyButton>
      </Tooltip>
    </>
  );
}
