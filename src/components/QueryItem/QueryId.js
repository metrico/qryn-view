import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";

export function QueryId(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [idText, setIdText] = useState(props.data.idRef);
    const storeTheme = useSelector(({ theme }) => theme);
    const theme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);
    function onIdTextChange(e) {
        e.preventDefault();
        const txt = e.target.value;
        setIdText(txt);
    }

    function closeInput(e) {
        props.onIdRefUpdate(idText);
        setIsEditing(false);
    }

    function handleKeydown(e) {
        if (e.key === "Enter") {
            props.onIdRefUpdate(idText);
            setIsEditing(false);
        }
    }

    if (isEditing === true) {
        return (
            <>
                <input
                    style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: theme.textColor,
                    }}
                    value={idText}
                    placeholder={idText}
                    onChange={onIdTextChange}
                    onKeyDown={handleKeydown}
                    onBlur={closeInput}
                />
            </>
        );
    } else {
        return (
            <>
                <p className="query-id" onClick={(e) => setIsEditing(true)}>
                    {idText}
                </p>
            </>
        );
    }
}
