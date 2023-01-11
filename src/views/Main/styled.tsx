import styled from "@emotion/styled";


export const MainContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: inherit;
    width: 100%;
    flex: 1;

    background-color: ${({ theme }: any) => theme.mainBgColor} !important;
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({ theme }: any) => theme.scrollbarThumb} !important;
    }
    .panels-container {
        display: flex;
        background: ${({ theme }: any) => theme.shBgColor};
        height: calc(100vh - 45px);
    }
`;
