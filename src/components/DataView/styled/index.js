import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

export const DataViewStyled = styled.div`
    background: ${(props) => props.theme.viewBg};
    margin: 6px 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    flex: 1;
    border-radius: 3px;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${(props) => props.theme.scrollbarThumb};
    }
`;

export const EmptyViewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 175px;
    font-size: 1em;
    color: ${({ theme }) => theme.textOff};
    background: ${({ theme }) => theme.secondaryWidgetContainer};
    text-align: center;
`;

export const DataViewCont = styled.div`
    display: flex;
    min-height: min-content;
    flex-direction: column;
`;

export const LogRow = styled.div`
    color: ${(props) => props.theme.textColor};
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
        background: ${(props) => props.theme.logBgColor};
    }

    p {
        display: inline-block;
    }

    border-left: 4px solid ${(props) => props.rowColor};
    .log-ts-row {
        display: flex;
    }
`;

export const RowLogContent = styled.span`
    font-size: 12px;
    color: ${(props) => props.theme.textPrimary};
    line-height: 1.5;
`;

export const RowTimestamp = styled.span`
    position: relative;
    color: ${(props) => props.theme.textColor};
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
