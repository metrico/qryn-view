import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import loadLabels from "../../../../actions/loadLabels";
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

export function ApiSelector() {
    const apiUrl = useSelector((store) => store.apiUrl);
    const apiError = useSelector((store) => store.apiErrors);
    const [editedUrl, setEditedUrl] = useState(apiUrl);
    const query = useSelector((store) => store.query);
    const [apiSelectorOpen, setApiSelectorOpen] = useState(false);
    const dispatch = useDispatch();
    const API_URL = "API URL";
    useEffect(() => {
        setEditedUrl(apiUrl);
    }, []);

    useEffect(() => {
        setEditedUrl(apiUrl);
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
        dispatch(loadLabels(editedUrl));
        if (query?.length > 3) {
            dispatch(setLabelsBrowserOpen(false));
        }
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
                        {"save"}
                    </ApiSelectorButton>
                </div>
            ) : null}
        </ApiSelectorStyled>
    );
}
