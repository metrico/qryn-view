import { css } from '@emotion/css'
import { QrynTheme } from '@ui/theme/types';

export const confirmSaveLoaderIcon = css`
    height: 12px !important;
    width: 12px !important;
    color: white;
    margin: 0px 4px;
`;

export const confirmSaveLoaderCont = (theme: QrynTheme) => css`
    display: flex;
    align-items: center;
    background: ${theme.primary};
    color: white;
    font-size: 11px;
    padding: 4px;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    span {
        margin-right: 4px;
        font-weight: bold;
    }
`;

export const SavingLoader = css`
    display: flex;
    align-items: center;
    font-size: 12px;
    &.loading-icon {
        height: 14px;
        width: 14px;
    }
`;

export const inputErrorCont = css`
    display: flex;
    align-items: center;
    background: #b62c14;
    color: white;
    font-size: 12px;
    padding: 4px;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    span {
        margin-right: 4px;
        font-weight: bold;
    }
`;