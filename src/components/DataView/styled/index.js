import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

export const DataViewStyled = styled.div`
    background: ${({theme}) => theme.mainBgColor};
    border: 1px solid ${({theme})=> theme.buttonBorder};
    margin: 5px;
    padding:6px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    flex: 1;
    border-radius: 3px;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({theme}) => theme.scrollbarThumb};
    }
`;

export const EmptyViewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1;
    height:100%;
    font-size: .75em;
    letter-spacing: 1px;
    padding:30px;
    color: ${({ theme }) => theme.textOff};
    background: ${({ theme }) => theme.secondaryWidgetContainer};
    text-align: center;
`;

export const DataViewHeader = styled.div`
display:flex;
align-items:center;
font-size:10px;
font-family: monospace;
margin: 0px 10px;
color:${({ theme }) => theme.textColor};
span {
    background:${({ theme }) => theme.inputBg};
    padding:4px;
    border-radius:4px;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
    margin: 0px 5px;
    display:flex;
    align-items:center;
    justify-content:center;
}
`

export const DataViewCont = styled.div`
    display: flex;
    min-height: min-content;
    flex-direction: column;
    height:100%;
`;

export const LogRow = styled.div`
    color: ${({theme}) => theme.textColor};
    font-size: 12px;
    cursor: pointer;
    padding-left: 0.5rem;
    margin-left: 0.25rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2px;
    margin-top: 2px;
    font-family: monospace;
    &:hover {
        background: ${({theme}) => theme.logBgColor};
    }

    p {
        display: inline-block;
        overflow-wrap: anywhere;
    }
    border-left: 4px solid ${({rowColor}) => rowColor};
    .log-ts-row {
        display: flex;
    }
`;

export const RowLogContent = styled.span`
    font-size: 12px;
    color: ${({theme}) => theme.textPrimary};
    line-height: 1.5;
`;

export const RowTimestamp = styled.span`
    position: relative;
    color: ${({theme}) => theme.textColor};
    margin-right: 0.25rem;
    white-space: nowrap;
    font-size: 12px;
    line-height: 1.5;
`;

export const Loader = styled(CircularProgress)`
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: auto;
`;
