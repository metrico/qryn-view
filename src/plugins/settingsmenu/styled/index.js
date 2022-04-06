import styled from "@emotion/styled";
import { createTheme } from "@mui/material";
import { SETTINGS_THEME } from "../theme";
import { BtnSmall } from '../../../theme/styles/Button';
import { InputSmall } from "../../../theme/styles/Input";

const st = SETTINGS_THEME;

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: st.main,
            background: st.background,
        },
    },
});

export const SettingsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    margin: 10px;
    align-items: center;
    span {
        padding: 20px 10px;
        color: ${st.header};
        text-transform: uppercase;
        font-size: 12px;
    }
`;

export const StyledCloseBtn = styled.button`
    border: none;
    color: ${st.main};
    background: none;
    cursor: pointer;
`;
export const DrawerContainer = styled.div`
    height: 75vh;
 
`;

export const DrawerInput = styled(InputSmall)`
    background: ${st.inputBg};
    color: orange;
  
    flex: 1;
`;

export const DrawerInputCont = styled.div`
    display: flex;
    //align-items: center;
    margin: 10px 20px;
    flex-direction: column;

    flex: 1;
    label {
        font-size: 0.8em;
        color: ${st.labelColor};
        margin: 3px 0px;
        white-space: nowrap;
    }
`;

export const DrawerInputGroup = styled.div`
    display: flex;
`;

export const ApiSelectorInput = styled(DrawerInput)`
    border: ${(props) => (props.inputError ? "1px solid orangered" : "none")};
    flex: 5;
`;

export const ApiSelectorCont = styled(DrawerInputCont)`
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
`;
export const ApiSelectorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
    label {
        font-size: 0.8em;
        color: ${st.labelColor};
        margin: 3px 0px;
        white-space: nowrap;
    }
`;
export const SaveApiButton = styled(BtnSmall)`
 
    color: ${st.main};
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    cursor: pointer;
`;
export const LimitInputsCont = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-items: flex-end;
`;

export const MenuButton = styled(BtnSmall)`
    background: none;
    color: ${st.main};
    display: flex;
    justify-content: center;
    flex: ${(props) => (props.save ? 0 : 1)};
    margin-left: ${(props) => (props.save ? "10px" : "0px")};
    background: ${st.inputBg};
    flex: 1;
    @media screen and (max-width: 324px) {
        flex: 1;
        margin-left: ${(props) => (props.save ? "0px" : "0px")};
        margin-top: ${(props) => (props.save ? "10px" : "0px")};
    }
    span {
        margin: 4px;
        white-space: nowrap;
    }
`;
export const MenuSeparator = styled.div`
    border-bottom: 1px solid ${st.inputBg};
    margin: 20px 20px;

    display: flex;
    content: "";
`;
export const MenuButtonCont = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
`;

export const MenuToolsCont = styled.div`
    position: absolute;
    bottom: 10%;
    flex: 1;
    align-items: center;
    justify-content: end;
    display: flex;
    width: 100%;
 
`;
export const MenuToolsButton = styled(MenuButton)`
    flex: 0;
    margin: 40px;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 4px;
`;
