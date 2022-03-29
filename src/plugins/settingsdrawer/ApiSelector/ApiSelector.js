import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import loadLogs from "../../../actions/loadLogs";
import setMatrixData from "../../../actions/setMatrixData";
import setLogs from "../../../actions/setLogs";
import loadLabels from "../../../actions/LoadLabels";
import { setLabelsBrowserOpen } from "../../../actions/setLabelsBrowserOpen";
import { setApiUrl } from "../../../actions";
import SaveIcon from "@mui/icons-material/Save";
import {
    ApiSelectorCont,
    ApiSelectorInput,
    ApiSelectorWrapper,
    MenuButton,
    MenuButtonCont,
    SaveApiButton,
} from "../styled";

export default function ApiSelector() {
    const apiUrl = useSelector((store) => store.apiUrl);
    const apiError = useSelector((store) => store.apiErrors);
    const [editedUrl, setEditedUrl] = useState(apiUrl);
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
            dispatch(setLogs([]));
            dispatch(setMatrixData([]));
            // set here an api error alert
        } else {
            dispatch(loadLogs());
        }
    }, [apiError]);

    const handleIntputChange = (e) => {
        e.preventDefault();
        setEditedUrl(e.target.value);
    };
    const onUrlSubmit = (e) => {
        dispatch(setApiUrl(editedUrl));
        dispatch(loadLabels(editedUrl));
        dispatch(setLabelsBrowserOpen(false));
    };

    // here should only have an input with a 'save' button

    return (
        <ApiSelectorWrapper>
            <label>{API_URL}</label>
            <ApiSelectorCont>
                <ApiSelectorInput
                    inputError={apiError.length > 0}
                    value={editedUrl}
                    onChange={handleIntputChange}
                />
              
                    <MenuButton save onClick={onUrlSubmit}>
                        <SaveIcon /> 
                    </MenuButton>
               
            </ApiSelectorCont>
        </ApiSelectorWrapper>
    );
}
