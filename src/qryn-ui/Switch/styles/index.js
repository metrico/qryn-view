import styled from "@emotion/styled";

const Label = styled.div`
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonInactive};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 0px 8px;
`;
const SwitchCont = styled.div`
  
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: ${(props) => props.theme.buttonInactive};

    border: 1px solid ${(props) => props.theme.buttonBorder};
    color: ${(props) => props.theme.textColor};
    border-radius: 3px;
    margin-right: 10px;
`;

const SwitchBtn = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: ${(props) =>
        props.selected
            ? props.theme.buttonDefault
            : props.theme.buttonInactive};
    border-left: ${(props) =>
        props.position === "last"
            ? `1px solid ${props.theme.buttonBorder}`
            : "none"};
    border-right: ${(props) =>
        props.position === "first"
            ? `1px solid ${props.theme.buttonBorder}`
            : "none"};
    border-radius: ${({ position }) =>
        position === "first"
            ? "3px 0px 0px 3px"
            : position === "last"
            ? "0px 3px 3px 0px"
            : "0px"};
    flex: 1;
    height: 90%;

    padding: 0px 12px;
    font-size: 12px;
    line-height: 20px;
`;

export const styles = {
    Label,
    SwitchCont,
    SwitchBtn,
    
}