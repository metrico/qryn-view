import styled from '@emotion/styled'




export const InputGroup = styled.div`
    display: flex;
    margin-right: 10px;
    flex-direction: row;
    align-items: center;
    select {
        background: ${({theme}: any) => theme.deep};
        color:  ${({theme}: any) => theme.contrast};
        border: 1px solid ${({theme}: any) => theme.accentNeutral};
        border-radius:3px;
        font-size:12px;
        height:26px;
    }
`;

export const Label = styled.div`
    color: ${({theme}: any) => theme.contrast};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    flex: 0;
    white-space: nowrap;

    border-radius: 3px 0px 0px 3px;
`;