import { css } from '@emotion/css';


export const ConfigContainerStyles = (theme: any) => css`
    background: ${theme.shadow};
    padding: 8px;
    border-radius: 3px;
    margin: 4px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    .form-row {
        display: flex;
        flex: 1;
    }
    .form-group {
        display: flex;
        align-items: center;
        label {
            color: ${theme.contrast};
            font-size: 12px;
            padding: 7px;
            background: ${theme.background};
            border: 1px solid ${theme.lightNeutral};
            border-radius: 3px;
        }
        input, select {
            background: ${theme.deep};
            border-radius: 3px;
            padding: 5px 8px;
            border: 1px solid ${theme.lightNeutral};
            color: ${theme.contrast};
            transition: 0.35s all;
            font-family: monospace;

            &:focus {
                outline: none;
                border: 1px solid ${theme.primary};
            }
            &.l {
                flex: 1;
            }
            &.s {
                max-width: 50px;
            }
        }

        select {
            padding: 4px 7px;
        }

        &.l {
            flex: 1;
        }
    }
    .config-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0px;

        .c-totals {
            display: flex;
            align-items: center;
        }
        .buttons-group {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .query-button {
            height: 30px;
            transition: 0.35s all;
            background: ${theme.primaryAccent};
            color: ${theme.contrast};
            padding: 4px 6px;
            border-radius: 3px;
            border: 1px solid ${theme.primary};
            cursor: pointer;
            display: flex;
            align-items: center;
            &:hover {
                background: ${theme.primary};
            }
        }
    }
`;