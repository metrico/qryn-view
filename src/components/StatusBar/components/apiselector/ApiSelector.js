import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { setLabelsBrowserOpen } from "../../../../actions/setLabelsBrowserOpen";
import setMatrixData from "../../../../actions/setMatrixData";
import loadLogs from "../../../../actions/loadLogs";
import { setApiUrl } from "../../../../actions";
import LinkIcon from "@mui/icons-material/Link";
import setLogs from "../../../../actions/setLogs";
import {
    ApiSelectorButton,
    ApiSelectorInput,
    ApiSelectorStyled,
} from "../../styled";
import loadLabels from "../../../../actions/loadLabels";

export function ApiSelector() {
    const apiUrl = useSelector((store) => store.apiUrl);
    const apiError = useSelector((store) => store.apiErrors);
    const [editedUrl, setEditedUrl] = useState(apiUrl);
    const [apiSelectorOpen, setApiSelectorOpen] = useState(false);
    const dispatch = useDispatch();
    const API_URL = "API URL";
    
    useEffect(() => {
        setEditedUrl(apiUrl);
    }, []);

    useEffect(() => {
        setEditedUrl(apiUrl);

        dispatch(loadLabels(apiUrl));
    }, [apiUrl]);

    useEffect(() => {
        if (apiError.length > 0) {
            setApiSelectorOpen(true);
            dispatch(setLogs([]));
            dispatch(setMatrixData([]));
        } else {
            setApiSelectorOpen(false);
            dispatch(loadLogs());
        }
    }, [apiError]);

    const handleApiUrlOpen = (e = null) => {
        e?.preventDefault();
        apiSelectorOpen ? setApiSelectorOpen(false) : setApiSelectorOpen(true);
    };

    const handleIntputChange = (e) => {
        e.preventDefault();
        setEditedUrl(e.target.value);
    };

    const onUrlSubmit = (e) => {
        dispatch(setApiUrl(editedUrl));

        setEditedUrl(editedUrl);

        dispatch(loadLabels(editedUrl));

        dispatch(setLabelsBrowserOpen(false));
    };

    return (
        <ApiSelectorStyled>
            <ApiSelectorButton title={"Set API URL"} onClick={handleApiUrlOpen}>
                <LinkIcon fontSize={"small"} />
                <span
                    style={{
                        color: apiError ? "orangered" : "green",
                    }}
                >
                    ●
                </span>
            </ApiSelectorButton>
            {apiSelectorOpen ? (
                <div className={"selector"}>
                    <span className={"label"}>{API_URL}</span>
                    <ApiSelectorInput
                        value={editedUrl}
                        onChange={handleIntputChange}
                    />
                    <ApiSelectorButton onClick={onUrlSubmit}>
                        {"Save"}
                    </ApiSelectorButton>
                </div>
            ) : null}
        </ApiSelectorStyled>
    );
}
