import styled from "@emotion/styled";

import { BtnSmall } from "@ui/theme/styles/Button";
import { InputSmall } from "@ui/theme/styles/Input";

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const SwitchesCont: any = styled.div`
    margin-top: 4px;
    border-radius: 3px;
    border: ${({ border, theme }: any) =>
        border === true ? `1px solid ${theme.accentNeutral}` : `none`};
    padding: 4px;
`;
export const InlineGroup = styled.div`
    display: flex;
    align-items: center;
`;
export const SectionCont = styled.div`
    padding-bottom: 4px;
`;

export const SettingCont = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background: ${({ theme }: any) => theme.shadow};
`;

export const SettingsInputContainer: any = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const SettingInput: any = styled(InputSmall)`
    background: ${({ theme }: any) => theme.deep};
    margin: 5px;
    flex: 1;
    padding: 5px 12px;
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    color: ${({ theme }: any) => theme.contrast};
    &:focus {
        border: 1px solid ${({ theme }: any) => theme.lightNeutral};
    }
`;
export const SettingButton: any = styled(BtnSmall)`
    background: ${({ theme }: any) => theme.primary};
    color: ${({ theme }: any) => theme.maxContrast};
    height: 30px;
    &:hover {
        background: ${({ theme }: any) => theme.primaryLight};
    }
`;

export const SettingLabel: any = styled.label`
    font-size: 12px;
    color: ${({ theme }: any) => theme.contrast};
    margin-left: 10px;
`;

export const SettingLabelHeader: any = styled.label`
    font-size: 12px;
    color: ${({ theme }: any) => theme.alphaNeutral};
    background: ${({ theme }: any) => theme.primaryLight};
    margin-left: 10px;
`;

export const SettingLabelSection: any = styled.label`
    display: flex;
    font-size: 12px;
    color: ${({ theme }: any) => theme.contrast};
    background: ${({ theme }: any) => theme.deep};
    padding: 4px;
    margin-bottom: 2px;
    border-radius: 3px;
`;
export const SettingHeader: any = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    h3 {
        margin-left: 10px;
        font-size: 1em;
        color: ${({ theme }: any) => theme.contrast};
    }
`;
export const SettingCloseBtn: any = styled(BtnSmall)`
    background: none;
    padding: 0;
    color: ${({ theme }: any) => theme.contrast};
`;

export const EmbedArea: any = styled.textarea`
    display: flex;
    flex: 1;
    margin: 5px 0px;
    height: 150px;
    width: 250px;
    font-size: 10px;
    padding: 5px 8px;
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    border-radius: 3px;
    background: ${({ theme }: any) => theme.deep};
    color: ${({ theme }: any) => theme.contrast};
`;
