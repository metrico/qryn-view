import { css } from "@emotion/css";
import { QrynTheme } from "../../../theme/types";

export const TotalRowStyle = (theme: QrynTheme) => css`
    display: flex;
    flex: 1;
    flex-direction: column;
    .total-rows-header {
        text-align: center;
        padding: 10px 0px;
        margin: 0px 4px;
        font-size: 12px;
        border-radius: 3px;
        background: ${theme.shadow};
    }
    .table-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        overflow-y: auto;
        max-height: 600px;
    }
    .table {
        display: table;
        width: 100%;
    }
    .table-header {
        display: table-header-group;
        font-size: 10px;
        text-transform: uppercase;

        .cell {
            font-size: 10px;
            letter-spacing: 1px;
            cursor: pointer;
            margin: 1px;
            padding-top: 20px;
            padding-bottom: 4px;
            &:hover {
                background: ${theme.deep};
            }
        }
    }
    .table-body {
        display: table-row-group;
        max-height: 600px;
        overflow-y: auto;
    }
    .table-row {
        display: table-row;
        &:hover {
            background: ${theme.deep};
        }
    }
    .cell {
        display: table-cell;
        font-size: 12px;
        //  margin: 10px;
        padding: 10px;
        max-width: 10%;
    }
    .table-footer {
        display: flex;
        font-size: 10px;
        text-transform: uppercase;
        align-items: center;
        gap: 4px;
        padding: 4px 12px;
        margin: 0px 4px;
        margin-top: 12px;
        border-radius: 3px;
        background: ${theme.shadow};
        p {
            margin: 0px 12px;
        }
        .disabled {
            pointer-events: none;
            opacity: 0.5;
        }
        button {
            padding: 4px 12px;
            color: white;
            border: none;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            gap: 4px;
            background: ${theme.shadow};
            border-radius: 3px;
            border: 1px solid ${theme.deep};
            cursor: pointer;
            outline: none;
            letter-spacing: 1px;

            :hover {
                background: ${theme.deep};
            }
        }
    }

    button {
        padding: 4px 12px;
        color: white;
        border: none;
        background: ${theme.primary};
        border-radius: 3px;
        border-color: ${theme.primaryAccent};
        cursor: pointer;
        outline: none;
    }
`;
