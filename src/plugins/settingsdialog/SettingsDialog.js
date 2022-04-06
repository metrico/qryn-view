import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Dialog, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setApiUrl, setQueryLimit, setQueryStep } from "../../actions";
import setSettingsDialogOpen from "../../actions/setSettingsDialogOpen";
import darkTheme from "../../theme/dark";
import { BtnSmall } from "../../theme/styles/Button";
import { InputSmall } from "../../theme/styles/Input";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const dTheme = darkTheme;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;
const InlineGroup = styled.div`
    display: flex;
    align-items: center;
`;

const SettingCont = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    height: 650px;
    background: ${dTheme.black.b300};
`;

const SettingsInputContainer = styled.div`
    margin:20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const SettingInput = styled(InputSmall)`
    background: ${dTheme.inputBg};
    margin: 5px;
    flex: 1;
    padding:5px 12px;
    border:1px solid transparent;
    &:focus {
        background: ${dTheme.black.b100};
        border:1px solid ${dTheme.buttonHover};
        color:${dTheme.white.w100};
    }
`;
const SettingButton = styled(BtnSmall)`
    background: ${dTheme.primaryDark};
    color:${dTheme.textColor};
    height:26px;
    &:hover {
        background: ${dTheme.primaryLight};
    }
`;

const SettingLabel = styled.label`
    font-size: 12px;
    color: ${dTheme.inputLabelColor};
    margin-left: 10px;
`;

const SettingHeader = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
margin:10px;
h3 {
    margin-left: 10px;
    font-size: 1em;
    color:${dTheme.textColor}

}
`
const SettingCloseBtn = styled(BtnSmall)`
background:none;
padding:0;
color:${dTheme.textColor}
`

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
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <SettingCont>
                <SettingHeader>
                <h3>
                Settings
                </h3>
                <SettingCloseBtn
                onClick={handleClose}
                > <CloseIcon/> </SettingCloseBtn>
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
