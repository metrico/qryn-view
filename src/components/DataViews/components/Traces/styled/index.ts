import styled from '@emotion/styled';


export const ViewStyled = styled.div`
    margin: 4px;
    padding: 5px;
    margin-top:0px;
    border: 1px solid ${(props:any) => props.theme?.buttonBorder};
    border-radius: 3px;
    display:flex;
    flex-direction:column;
    flex:${({size}:{size:any})=> size === 'min' ? 0 : 1};
 
    height: ${(props:any) =>
        props.size === "regular"
            ? props?.vheight?.regularCont
            : props?.size === "max"
            ? props?.vheight?.maxCont
            : "20px"};
    .view-content {
        margin:3px;
        height: ${(props:any) =>
            props.size === "regular"
                ? props?.vheight?.regularView
                : props?.size === "max"
                ? props?.vheight?.maxView
                : "0px"};
        display: ${(props:any) =>
            props.size === "min"
                ? "none"
                : props?.size === "regular"
                ? "flex"
                : "flex"};
        flex-direction: ${(props:any) =>
            props?.size === "regular" ? "column" : "column"};
        flex:1;
    }
`;