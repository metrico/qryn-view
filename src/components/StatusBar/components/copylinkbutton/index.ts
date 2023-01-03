import localUrl from "../../../../services/localUrl";

export function storedUrl() {
    return localUrl().add(
        {
            data: window.location.href,
            description: "From Shared URL",
        },
        10
    );
}
interface HTMLGhostTextArea extends HTMLTextAreaElement {
    style: any;
}
export const handleShareDomLink = (
    copyText: any,
    storeHistory: any,
    alertSuccess: any
) => {
    let textArea: HTMLGhostTextArea = document.createElement("textarea");
    textArea.value = copyText;
    textArea.style = {
        position: "fixed",
        left: "-999999px",
        top: "-999999px",
    };

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((resolve: any, reject: any) => {
        storeHistory();

        alertSuccess();
        document.execCommand("copy") ? resolve() : reject();
        textArea.remove();
    });
};

export const handleCopyLink = (
    e: any,
    setSubmitted: any,
    hash: any,
    label: any,
    isRelative: any,
    shareDefaultLink: any,
    shareDomLink: any
) => {
    e.preventDefault();
    setSubmitted();
    const params = new URLSearchParams(hash.replace("#", ""));
    params.set("label", label);
    const locationWithLabel = new URL(window.location.href);
    locationWithLabel.hash = `#${params.toString()}`;

    const copyText = setCopyText(isRelative, label, locationWithLabel);

    setTimeout(() => {
        shareLinkAction(shareDefaultLink, shareDomLink, copyText);
    }, 200);
};

export const handleAlertSuccess = (dispatch: any, createAlert: any) => {
    dispatch(
        createAlert({
            type: "success",
            message: "Link Copied To Clipboard",
        })
    );
};

export const handleShareDefaultLink = (
    storeHistory: any,
    alertSuccess: any,
    copyText: any
) => {
    navigator.clipboard.writeText(copyText).then(
        function () {
            storeHistory();
            alertSuccess();
        },
        function (err) {
            console.log("error on copy", err);
        }
    );
};

export const setCopyText = (
    isRelative: any,
    label: any,
    locationWithLabel: any
) => {
    if (isRelative && label) {
        return locationWithLabel;
    }
    return window.location.href;
};

export const shareLinkAction = (
    shareDefaultLink: any,
    shareDomLink: any,
    copyText: any
) => {
    if (navigator?.clipboard && window.isSecureContext) {
        shareDefaultLink(copyText);
    } else {
        shareDomLink(copyText);
    }
};
