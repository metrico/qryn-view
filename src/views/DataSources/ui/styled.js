import styled from "@emotion/styled";
import { BtnSmall } from "../../../theme/styles/Button";



export const DsButtonStyled = styled(BtnSmall)`
    background: ${(props) =>
        props.primary ? props.theme.primaryDark : props.theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    color: ${(props) => props.theme.buttonText};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 28px;
    display: ${({ editing }) => (editing ? "flex" : "none")};
    &:hover {
        background: ${(props) => props.theme.primaryLight};
    }
    &:disabled {
        background: ${(props) => props.theme.buttonDefault};
        border: 1px solid ${(props) => props.theme.buttonBorder};
        cursor: not-allowed;
        color: ${(props) => props.theme.textColor};
    }
    @media screen and (max-width: 864px) {
        display: ${(props) => (props.isMobile ? "flex" : "none")};

        margin: 0;
    }
`;
