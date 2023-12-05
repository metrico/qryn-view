import { css } from '@emotion/css'
import { QrynTheme } from "@ui/theme/types";

export const PluginPageStyles = (theme: QrynTheme) => css`
    max-width: 1440px;
    padding: 10px;
    margin: 10px;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-x: hidden;
    display: flex;
    flex: 1;
    height: 100%;
    overflow: hidden;
    max-width: 1440px;
    align-self: center;
    .plugin-section {
        padding: 4px;
        font-size: 14px;
        color: ${theme.contrast};
    }
`;

export const PluginCardStyles = (theme: QrynTheme) => css`
    padding: 10px;
    margin: 4px;
    background: ${theme.shadow};
    border: 1px solid ${theme.accentNeutral};
    color: ${theme.contrast};
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 350px;
    border-radius: 3px;
    height: fit-content;

    .image {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 16px;
        padding: 4px;
        align-self: flex-start;
        display: flex;
        align-items: center;
        width: 100%;
        .plugin-name {
            flex: 1;
            margin-left: 10px;
        }
        .switch {
            display: flex;
            align-items: center;
            justify-self: end;
        }
    }
    .text {
        font-size: 12px;
        padding: 4px;
        line-height: 1.5;
    }
    .icon {
        font-size: 60px;
        opacity: 0.25;
    }
`;

export const InlineSwitch = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;