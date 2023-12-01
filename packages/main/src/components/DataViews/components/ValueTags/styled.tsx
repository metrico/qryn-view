import styled from '@emotion/styled'

export const TracesButton: any = styled.div`
    color: ${({ theme }: any) => theme.maxContrast};
    flex: 0;
    background-color: hsl(220, 67%, 55%);
    display: flex;
    margin-left: 5px;
    padding: 0 4px;
    border-radius: 2px;
    font-size: 12px;
    align-items: center;
    white-space: nowrap;
`;

export const ValueTagsStyled: any = styled.div`
    color: ${({ theme }: any) => theme.hardContrast};
    flex: 1;
    display: flex;
    &:hover {
        background: ${({ theme }: any) => theme.shadow};
    }
`;

export const IconStyles = {
    width: "18px",
    height: "18px",
};