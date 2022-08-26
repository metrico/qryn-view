import styled from "@emotion/styled";


export const ViewStyled = styled.div`
    margin: 5px;
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
    border-radius: 3px;
    height: ${(props) =>
        props.size === "regular"
            ? props.vheight.regularCont
            : props.size === "max"
            ? props.vheight.maxCont
            : "20px"};
    .view-content {
        height: ${(props) =>
            props.size === "regular"
                ? props.vheight.regularView
                : props.size === "max"
                ? props.vheight.maxView
                : "0px"};
        display: ${(props) =>
            props.size === "min"
                ? "none"
                : props.size === "regular"
                ? "flex"
                : "flex"};
        flex-direction: ${(props) =>
            props.size === "regular" ? "column" : "column"};
    }
`;