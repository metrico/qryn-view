import { useState } from "react";

import DOMPurify from "isomorphic-dompurify";
import { css, cx } from "@emotion/css";
import { Tooltip } from "@mui/material";
import useTheme from "@ui/theme/useTheme"

export const QueryTitleStyles = (theme: any) => css`
    margin-left: 20px;
    font-family: monospace;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100px;
    color: ${theme.contrast};
    background: transparent;
    border: none;
    outline: none;
`;

export function QueryId(props: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [idText, setIdText] = useState(props.idRef);

    const theme = useTheme();
    function onIdTextChange(e: any) {
        e.preventDefault();
        const txt = e.target.value;
        setIdText(txt);
    }

    function closeInput(e: any) {
        props.onIdRefUpdate(idText);
        setIsEditing(false);
    }

    function handleKeydown(e: any) {
        if (e.key === "Enter") {
            props.onIdRefUpdate(idText);
            setIsEditing(false);
        }
    }

    if (isEditing === true) {
        return (
            <>
                <Tooltip title={idText}>
                    <input
                        className={cx(QueryTitleStyles(theme))}
                        value={DOMPurify.sanitize(idText)}
                        placeholder={idText}
                        onChange={onIdTextChange}
                        onKeyDown={handleKeydown}
                        onBlur={closeInput}
                    />
                </Tooltip>
            </>
        );
    } else {
        return (
            <>
                {" "}
                <Tooltip title={idText}>
                    <p
                        className={cx(QueryTitleStyles(theme))}
                        onClick={(e) => setIsEditing(true)}
                    >
                        {idText}
                    </p>
                </Tooltip>
            </>
        );
    }
}
