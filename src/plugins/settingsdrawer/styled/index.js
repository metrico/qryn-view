import styled from "@emotion/styled";
import { createTheme } from "@mui/material";

export const SettingsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height:30px;
    margin:10px;
    align-items: center;
    span {
        padding: 20px 10px;
        color: #666;
        text-transform: uppercase;
        font-size: 12px;
    }
`;

export const StyledCloseBtn = styled.button`
    border: none;
    color: #ddd;
    background: none;
    cursor: pointer;
`;
export const DrawerContainer = styled.div`
    height: 75vh;
    display:none;
    @media screen and (max-width: 850px) {
        display: block;
    }
`;

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ddd",
            background: "#1a1a1a",
        },
    },
});

export const DrawerInput = styled.input`
    background: #333;
    color: orange;
    padding: 9px 12px;
    border: none;
    border-radius: 3px;

    font-size: 1em;
    flex: 1;
`;

export const DrawerInputCont = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 20px;

    justify-content: space-between;
    flex: 1;
    label {
        font-size: 0.85em;
        color: #aaa;
        margin-right: 10px;
        white-space: nowrap;
    }
`;

export const ApiSelectorInput = styled(DrawerInput)`
    border: ${(props) => (props.inputError ? "1px solid red" : "none")};
`;

export const ApiSelectorCont = styled(DrawerInputCont)`
    flex-wrap: wrap;
    margin:0;
`;
export const ApiSelectorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
    label {
        font-size: 0.85em;
        color: #aaa;
        margin:10px 0px;
    }
`;
export const SaveApiButton = styled.button`
    border: none;
    padding: none;
    margin: 2px;
    color: #ddd;
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
`;

export const MenuButton = styled.button`
    background: none;
    color: #ddd;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: ${(props)=>(props.save ? 0 : 1 )};
    margin-left: ${(props)=>(props.save ? '10px' : '0px')};
    background: #7b7b7b55;
    border-radius: 3px;
    padding: 6px 12px;
    font-size: 1em;
    @media screen and (max-width:280px) {
        flex: 1;
    margin-left: 0px;
    margin-top: ${(props)=>(props.save ? '10px' : '0px' )};

  }
    span {
        margin: 4px;
        white-space: nowrap;
    }
`;
export const MenuSeparator = styled.div`
border-bottom:1px solid #333;
margin:20px 20px;

display: flex;
content:'';

`
export const MenuButtonCont = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
`;
