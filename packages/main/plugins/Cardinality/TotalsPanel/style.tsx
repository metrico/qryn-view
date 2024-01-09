import { css } from "@emotion/css";
import { QrynTheme } from "../../../theme/types";

export const TotalRowStyle = (theme: QrynTheme) => css`
    display: flex;
    flex: 1;
    flex-direction: column;

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
        }
    }
    .table-row {
        display: table-row-group;
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

    button {
        padding: 4px 12px;
        color: white;
        border: none;
        background: theme.primary;
        border-radius: 3px;
        border-color: theme.primaryDark;
        cursor: pointer;
        outline: none;
    }
`;