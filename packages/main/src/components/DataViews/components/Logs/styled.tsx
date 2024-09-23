import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { type QrynTheme } from "@ui/theme/types";

export const FlexWrap = css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 3px;
`;

export const LogRowStyled: any = styled.div<{
    theme: QrynTheme;
    rowColor: any;
}>`
    color: ${({ theme }) => theme.contrast};
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
        background: ${({ theme }: any) => theme.activeBg};
    }

    p {
        display: inline-block;
        overflow-wrap: anywhere;
        margin-left: 3px;
    }
    border-left: 4px solid ${({ rowColor }: any) => rowColor};
    .log-ts-row {
        display: flex;
    }
    .value-tags-close {
        height: 12px;
        &:hover {
            background: ${({ theme }) => theme.shadow};
            border-radius: 3px 3px 0px 0px;
        }
    }
`;

export const RowLogContent = styled.span`
    font-size: 12px;
    color: ${({ theme }: any) => theme.hardContrast};
    line-height: 1.5;
`;

export const RowTimestamp = styled.span`
    position: relative;
    color: ${({ theme }: any) => theme.contrast};
    margin-right: 0.25rem;
    white-space: nowrap;
    font-size: 12px;
    line-height: 1.5;
`;

export const RowsCont = styled.div`
    overflow: hidden;
    overflow-y: auto;
    height: calc(100% - 20px);
`;
