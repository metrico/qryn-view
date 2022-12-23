import styled from "@emotion/styled";
import { TabPanelUnstyled, TabsListUnstyled, TabsUnstyled, TabUnstyled } from "@mui/base";
import { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";

export const ViewStyled = styled.div`
    margin: 4px;
    padding: 5px;
    margin-top:0px;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
    border-radius: 3px;
    display:flex;
    flex-direction:column;
    flex:${({size})=> size === 'min' ? 0 : 1};
 
    height: ${(props) =>
        props.size === "regular"
            ? props.vheight.regularCont
            : props.size === "max"
            ? props.vheight.maxCont
            : "20px"};
    .view-content {
        height: ${(props) =>
            props.size === "regular"
                ? props.vheight.regularView
                : props.size === "max"
                ? props.vheight.maxView
                : "0px"};
        display: ${(props) =>
            props.size === "min"
                ? "none"
                : props.size === "regular"
                ? "flex"
                : "flex"};
        flex-direction: ${(props) =>
            props.size === "regular" ? "column" : "column"};
        flex:1;
    }
`;



export const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    background: ${({ theme }) => theme.widgetContainer};
   height:100%;
   flex:1;
`;
export const TabsContainer = styled(TabsUnstyled)`
display:flex;
height:100%;
`
export const TabsList = styled(TabsListUnstyled)`

    min-width: 320px;
    background: ${({ theme }) => theme.tabHeader};
    border-bottom: 4px solid ${({ theme }) => theme.historyRow};
    display: ${({panelsize})=> panelsize === 'min' ? 'none' : 'flex'};
    align-items: center;
    align-content: space-between;
    
`;    

export const Tab = styled(TabUnstyled)`
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonDefault};
    border:1px solid ${(props)=>props.theme.buttonBorder};
    cursor: pointer;
    font-size: 13px;
    background-color: transparent;
    padding: 6px 10px;
    border: none;
    border-radius: 3px 3px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid transparent;
    transition: 0.2s all;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }

    &:focus {
        color: ${({ theme }) => theme.textColor};
        background: ${({ theme }) => theme.buttonDefault};
        border-radius: 3px 3px 0px 0px;

        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
    @media screen and (max-width: 360px) {
        span {
            display: none;
        }
        padding: 5px 20px;
    }
`;



