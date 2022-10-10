import styled from '@emotion/styled'




export const InputGroup = styled.div`
    display: flex;
    margin-right: 10px;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    select {
        background: ${(props) => props.theme.inputBg};
        color:  ${(props) => props.theme.textColor};
        border: 1px solid ${(props) => props.theme.buttonBorder};
        border-radius:3px;
        font-size:12px;
        height:26px;
    }
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    flex: 0;
    white-space: nowrap;

    border-radius: 3px 0px 0px 3px;
`;