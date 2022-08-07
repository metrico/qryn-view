import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import setMatrixData from "../../../../actions/setMatrixData";
import { setApiUrl } from "../../../../actions";
import LinkIcon from "@mui/icons-material/Link";
import setLogs from "../../../../actions/setLogs";
import {
    ApiSelectorButton,
    ApiSelectorInput,
    ApiSelectorStyled,
} from "../../styled";
import loadLabels from "../../../../actions/loadLabels";
import onQueryValid from "../../../LabelBrowser/helpers/onQueryValid";

export function ApiSelector() {
    const { apiUrl, apiError, query, start, stop } = useSelector(
        (store) => store
    );
    const [editedUrl, setEditedUrl] = useState(apiUrl);
    const [apiSelectorOpen, setApiSelectorOpen] = useState(false);
    const dispatch = useDispatch();
    const API_URL = "API URL";

    useEffect(() => {
        setEditedUrl(apiUrl);
    }, []);

    useEffect(() => {
        setEditedUrl(apiUrl);
        dispatch(loadLabels(apiUrl, start, stop));
    }, [apiUrl]);

    useEffect(() => {
        if (apiError?.length > 0) {
            setApiSelectorOpen(true);
            dispatch(setLogs([]));
            dispatch(setMatrixData([]));
        } else {
            setApiSelectorOpen(false);
            if (query?.length > 0 && onQueryValid(query)) {
                //  dispatch(loadLogs());
            }
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
        dispatch(loadLabels(editedUrl, start, stop));
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
