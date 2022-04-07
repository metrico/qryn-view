import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setApiUrl, setQueryLimit, setQueryStep } from "../../actions";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen.js";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    InputGroup,
    SettingCont,
    SettingHeader,
    SettingCloseBtn,
    SettingsInputContainer,
    InlineGroup,
    SettingInput,
    SettingLabel,
    SettingButton,
} from "./styled";

export default function SettingsDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const apiUrl = useSelector((store) => store.apiUrl);
    const limit = useSelector((store) => store.limit);
    const step = useSelector((store) => store.step);
    //const theme = useSelector((store) => store.theme);
    const [apiEdited, setApiEdited] = useState(apiUrl);

    function handleApiChange(e) {
        const value = e.target.value;
        setApiEdited(value);
    }

    function handleApiClick() {
        dispatch(setApiUrl(apiEdited));
    }

    function handleStepChange(e) {
        const value = e.target.value;
        dispatch(setQueryStep(value));
    }

    function handleLimitChange(e) {
        const value = e.target.value;
        dispatch(setQueryLimit(value));
    }

    function handleClose() {
        dispatch(setSettingsDialogOpen(false));
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <SettingCont>
                <SettingHeader>
                    <h3>Settings</h3>
                    <SettingCloseBtn onClick={handleClose}>
                        {" "}
                        <CloseIcon />{" "}
                    </SettingCloseBtn>
                </SettingHeader>

                <SettingsInputContainer>
                    <InputGroup>
                        <SettingLabel>API URL</SettingLabel>
                        <InlineGroup>
                            <SettingInput
                                value={apiEdited}
                                onChange={handleApiChange}
                            />
                            <SettingButton onClick={handleApiClick}>
                                save
                            </SettingButton>
                        </InlineGroup>
                    </InputGroup>

                    <InputGroup>
                        <SettingLabel>Step</SettingLabel>

                        <SettingInput
                            value={step}
                            onChange={handleStepChange}
                        />
                    </InputGroup>

                    <InputGroup>
                        <SettingLabel>Limit</SettingLabel>
                        <SettingInput
                            value={limit}
                            onChange={handleLimitChange}
                        />
                    </InputGroup>
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
}
