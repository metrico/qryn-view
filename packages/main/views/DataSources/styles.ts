import styled from "@emotion/styled";
import { BtnSmall } from "@ui/theme/styles/Button";
import { QrynTheme } from "@ui/theme/types";

export const PageContainer = styled.div<{ theme?: QrynTheme }>`
    overflow-x: hidden;
    border-radius: 3px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.contrast};
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    align-items: center;

    .cont {
        max-width: 1440px;
        padding: 10px;
        margin: 10px;
        width: 100%;
        background: ${({ theme }) => theme.shadow};
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-x: hidden;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        display: flex;

        margin: 10px;
        justify-content: space-between;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-cont {
        margin-bottom: 10px;
        border: 1px solid ${({ theme }) => theme.accentNeutral};
        border-radius: 3px;
        color: ${({ theme }) => theme.contrast};
    }

    .ds-item {
        padding: 10px;
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
        padding-bottom: 14px;
        display: flex;
        color: ${({ theme }) => theme.contrast};
        .logo {
            padding: 10px;
            padding-right: 20px;
            padding-left: 0px;
        }
        .ds-text {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .ds-type {
            font-size: 18px;
            padding: 10px;
            padding-left: 0px;
            color: ${({ theme }) => theme.contrast};
        }
        small {
            font-size: 12px;
        }
        .setting-icon {
            justify-self: flex-end;
            cursor: pointer;
        }
        .ds-settings {
            background: ${({ theme }) => theme.shadow};
        }
    }
    .plugins-cont {
        display: flex;
        flex: 1;
        margin: 0px 10px;
        flex-direction: column;
        padding: 10px 20px;
        border: 1px solid ${({ theme }) => theme.accentNeutral};
        border-radius: 3px;
        height: fit-content;
        .title {
            font-size: 14px;
            padding: 10px 0px;
        }
    }
`;

export const Label = styled.div<{ theme?: QrynTheme; width?: number }>`
    color: ${({ theme }) => theme.contrast};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    //flex: 0;
    white-space: nowrap;
    ${({ width }) => (width !== null ? `width:${width}px;` : "")}
    border-radius: 3px 0px 0px 3px;
    display: flex;
    align-items: center;
    height: 26px;
`;

export const Input = styled.input<{
    theme?: QrynTheme;
    error: boolean | string;
}>`
    display: flex;
    flex: 1;
    background: ${({ theme }) => theme.deep};
    color: ${({ theme }) => theme.contrast};
    border: 1px solid
        ${({ error, theme }) => (error ? "#b62c14" : theme.accentNeutral)};
    border-radius: 3px;
    justify-self: flex-end;
    height: 26px;
    padding-left: 8px;
`;

export const TextArea = styled.textarea<{ theme?: QrynTheme }>`
    display: flex;
    flex: 1;
    background: ${({ theme }) => theme.deep};
    color: ${({ theme }) => theme.contrast};
    border: 1px solid ${({ theme }) => theme.accentNeutral};
    border-radius: 3px;
    justify-self: flex-end;
    padding-left: 8px;
`;

export const InputGroup = styled.div<{
    theme?: QrynTheme;
    width?: number | string;
}>`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    ${({ width }) => (width && width === "normal" ? "" : "flex:1;")}
    //flex: 1;
    select {
        background: ${({ theme }) => theme.deep};
        color: ${({ theme }) => theme.contrast};
        border: 1px solid ${({ theme }) => theme.accentNeutral};
        border-radius: 3px;
        font-size: 12px;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 1px 2px 1px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        option {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

export const InputCol = styled.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    &.internal {
        max-width: 400px;
    }
`;

export const InputHeaderCol = styled.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    align-items: center;
`;
export const InputCont = styled.div`
    padding: 10px;
`;
export const LinkFieldsGroup = styled.div<{ theme?: QrynTheme }>`
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.background};
`;

export const SettingsTitle = styled.div<{ theme?: QrynTheme }>`
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.shadow};
    border-radius: 3px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    .edit-buttons {
        display: flex;
        align-items: center;
        &:disabled {
            display: none;
        }
    }
`;

export const DataSourceSettingsCont = styled.div<{ theme?: QrynTheme }>`
    padding: 10px;
    border-radius: 0px 0px 3px 3px;
    border-top: 1px solid ${({ theme }) => theme.accentNeutral};
`;

export const DsButtonStyled = styled(BtnSmall)<{
    theme?: QrynTheme;
    primary?: boolean;
    disabled?: boolean;
}>`
    background: ${({ primary, theme }) =>
        primary ? theme.primary : theme.neutral};

    border: 1px solid ${({ theme }) => theme.accentNeutral};
    color: ${({ primary, theme }) =>
        primary ? theme.maxContrast : theme.contrast};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 26px;
    display: flex;
    &:hover {
        background: ${({ theme, disabled }) =>
            disabled ? theme.neutral : theme.primaryLight};
        color: ${({ primary, theme }) =>
            primary ? theme.contrast : theme.maxContrast};
    }
    &:disabled {
        background: ${({ theme }) => theme.neutral};
        border: 1px solid ${({ theme }) => theme.accentNeutral};
        cursor: not-allowed;
        color: ${({ theme }) => theme.contrast};
    }
    @media screen and (max-width: 1070px) {
        display: flex;

        margin: 0;
    }
`;
