import { css } from "@emotion/css";
import { type QrynTheme } from "@ui/theme/types";

export const SeriesRowStyle = (theme: Partial<QrynTheme>) => css`
    display: table-row;
    align-items: center;
    padding: 12px 8px;
    border-bottom: 1px solid ${theme.neutral};
    .cell {
        display: table-cell;
        padding: 12px 0px;
        width: auto;
        border-bottom: 1px solid ${theme.neutral};
    }
    .cell-name {
        width: 60%;
        cursor: pointer;
        transition: 0.25s all;
        &:hover {
            background: ${theme.neutral};
            .c-name {
                color: ${theme.primaryLight};
            }
        }
    }
    .cell-header {
        font-size: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 12px;
        &.center {
            text-align: center;
        }
    }
    .interactive {
        transition: 0.25s all;
        &:hover {
            background: ${theme.neutral};
            cursor: pointer;
        }
    }
    .c-name {
        font-size: 12px;
        color: ${theme.primaryLight};

        cursor: pointer;
        margin: 0px 12px;
    }
    .c-value {
        color: ${theme.contrast};
        font-size: 14px;
        margin: 0px 12px;

        width: auto;
    }
    .c-share-cont {
        align-items: center;
        display: flex;
        gap: 1px;
        justify-content: flex-start;
    }
    .c-share {
        display: flex;
        font-size: 12px;
        font-family: monospace;
        margin: 0px 12px;

        // flex:1;
    }
    .c-progress {
        grid-gap: 8px;
        align-items: center;
        display: grid;
        grid-template-columns: 1fr auto;
        justify-content: center;
    }
    progress {
        background: ${theme.deep};
        border-radius: 3px;

        height: 12px;
        border: 1px solid ${theme.ultraDeep};
        display: flex;
        flex: 1;
    }
    progress::-webkit-progress-bar {
        background-color: ${theme.deep};
        border-radius: 3px;
    }
    progress::-webkit-progress-value {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
    progress::-moz-progress-bar {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
`;
