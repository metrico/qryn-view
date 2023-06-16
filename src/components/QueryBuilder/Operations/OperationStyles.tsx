import { css } from "@emotion/css";

export const OperationContainerStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    .operation-header {
        background: ${theme.viewBg};
        color: ${theme.textColor};
        padding: 0px 8px;
        border-bottom: 1px solid ${theme.buttonBorder};
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        span {
            //  font-weight: bold;
            font-size: 12px;
        }
        .operation-tools {
            display: none;
            align-items: center;
        }
        &:hover .operation-tools {
            display: flex;
        }
    }
    .operation-body {
        padding: 8px;
    }
`;

export const OperationBodyStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    gap: 3px;
    .input-group {
        display: flex;
        align-items: center;
        gap: 3px;
        justify-content: space-between;
    }
    .col {
        flex-direction: column;
    }
    .end {
        justify-content: flex-end;
    }
    .wrap {
        display: table;
    }
    label {
        font-size: 12px;
        color: ${theme.textColor};
    }
    input {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 0px 6px;
        max-width: 100px;
        &.checkbox {
            font-size: 12px;
            height: 12px;
        }
    }

    select {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 0px 6px;
    }
    button {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 12px;
    }

    .binary-operation-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${theme.widgetContainer};
        border-radius: 3px;
        padding: 6px;
        .binary-operation-cont {
            display: flex;
            align-items: center;
            gap: 6px;
        }
    }
`;

export const CloseIconStyle = css`
    margin: 0px;
    padding: 0px;
    height: 12px;
    width: 12px;
    cursor: pointer;
`;
