import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import loadLabels from "../../../../actions/LoadLabels";
import { setLabelsBrowserOpen } from "../../../../actions/setLabelsBrowserOpen";
import setMatrixData from "../../../../actions/setMatrixData";
import loadLogs from "../../../../actions/loadLogs";
import { setApiUrl } from "../../../../actions";
import LinkIcon from "@mui/icons-material/Link";
import setLogs from "../../../../actions/setLogs";
import styled from "@emotion/styled";


const ApiSelectorStyled = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width:850px) {
      display: none;
  }
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: #bfbfbf;
            min-width: 51px;
            padding: 6px 6px;
            margin: 5px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: #12121267;
            border-radius: 4px;
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
`;

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

        dispatch(setLabelsBrowserOpen(false));
    };

    return (
        <ApiSelectorStyled>
            <div className={"api-url-selector"}>
                <button
                    title={"Set API URL"}
                    className={"api-url-selector-toggle"}
                    onClick={handleApiUrlOpen}
                >
                    <LinkIcon fontSize={"small"} />
                </button>
                {apiSelectorOpen ? (
                    <div className={"selector"}>
                        <span className={"label"}>{API_URL}</span>
                        <input
                            className={"url"}
                            value={editedUrl}
                            onChange={handleIntputChange}
                        />
                        <button onClick={onUrlSubmit}>{"save"}</button>
                    </div>
                ) : null}
            </div>
        </ApiSelectorStyled>
    );
}
