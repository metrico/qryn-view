import styled from '@emotion/styled'

export const TracesButton: any = styled.div`
    color: ${({ theme }: any) => theme.buttonText};
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
    color: ${({ theme }: any) => theme.textPrimary};
    flex: 1;
    display: flex;
    &:hover {
        background: ${({ theme }: any) => theme.widgetContainer};
    }
`;

export const IconStyles = {
    width: "18px",
    height: "18px",
};