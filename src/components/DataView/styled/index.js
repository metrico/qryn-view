import styled from "@emotion/styled";
import { THEME_COLORS } from '../theme/theme';
import { CircularProgress } from "@mui/material";
import darkTheme from "../../../theme/dark";

const theme = darkTheme;

export const DataViewStyled = styled.div`
    background: ${theme.viewBg};
    margin: 6px 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    flex: 1;
    border-radius: 3px;
    //padding: 0.5rem;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${theme.scrollbarThumb};
    }
`;

export const EmptyViewContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 175px;
    font-size: 1em;
    color: ${theme.textOff};
    text-align: center;
`;

export const DataViewCont = styled.div`
    display: flex;
    min-height: min-content;
    flex-direction: column;
`;

export const LogRow = styled.div`
    padding: 0.3rem;
    color: white;
    font-size: 13px;
    cursor: pointer;
    margin-bottom: 4px;
    padding-left: 0.5rem;
    margin-left: 0.25rem;
    transition: 0.2s all;
    &:hover {
        background: black;
    }

    p {
        display: inline-block;
    }

    border-left: 4px solid ${(props) => props.rowColor};
`;

export const RowLogContent = styled.span`
    font-size: 0.95em;
    font-family: monospace;
    color: ${theme.textWhite};
    line-height: 1.5;
`;

export const RowTimestamp = styled.span`
    position: relative;
    color: ${theme.textColor};
    margin-right: 0.25rem;
`;

export const Loader = styled(CircularProgress)`
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: auto;
`;
