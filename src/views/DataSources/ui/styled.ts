import styled from "@emotion/styled";
import { BtnSmall } from "../../../theme/styles/Button";



export const DsButtonStyled = styled(BtnSmall)`
    background: ${(props: any) =>
        props.primary ? props.theme.primaryDark : props.theme.buttonDefault};
    border: 1px solid ${({theme}: any) => theme.buttonBorder};
    color: ${({theme}: any) => theme.buttonText};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 28px;
    display: ${({ editing }: any) => (editing ? "flex" : "none")};
    &:hover {
        background: ${({theme}: any) => theme.primaryLight};
    }
    &:disabled {
        background: ${({theme}: any) => theme.buttonDefault};
        border: 1px solid ${({theme}: any) => theme.buttonBorder};
        cursor: not-allowed;
        color: ${({theme}: any) => theme.textColor};
    }
    @media screen and (max-width: 1070px) {
        display: ${(props: any) => props.isMobile ? "flex" : "none"};

        margin: 0;
    }
`;
