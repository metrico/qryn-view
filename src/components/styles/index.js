import styled from "@emotion/styled";

export const MainViewStyled = styled.div`
    position: absolute;
    top: 0;
    padding-top: 5px;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.mainBgColor} !important;
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${(props) => props.theme.scrollbarThumb} !important;
    }
`;
