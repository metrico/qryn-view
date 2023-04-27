import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import styled from "@emotion/styled";


export const QueryItemContainerStyled = styled.div`
    background: ${({ theme }: any) => `${theme.secondaryWidgetContainer}`};
    color: ${({ theme }: any) => `${theme.textColor}`};
    display: flex;
    flex-direction:column;
    border-radius: 3px;
    margin-bottom: 3px;
    padding:5px;
    .query-title {
        display: flex;
        align-items: center;
    }
    .query-tools-cont {
        display:flex;
        align-items:center;
        justify-content:space-between;
        flex-wrap:wrap;
    }
    .query-tools {
        display: flex;
        align-items: center;
        flex-wrap:wrap;
        justify-content:space-between;
        flex:1;
        gap:2px;
        margin-top:4px;
        
    }
    .query-id {
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
    }
    .query-title-tabs {
        display:flex;
        align-items:center;
    }
`;

export const ShowQueryButton = styled.button`
    background: none;
    border: none;
    padding: 0px 2px;
    cursor: pointer;
`;

export const OpenQuery = styled(KeyboardArrowDownOutlinedIcon)`
    font-size: 13px;
    color: ${({ theme }: any) => theme.textColor};
`;

export const CloseQuery = styled(KeyboardArrowRightOutlinedIcon)`
    font-size: 13px;
    color: ${({ theme }: any) => theme.textColor};
`;

export const InputGroup = styled.div`
    display: flex;
    margin-right: 10px;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    select {
        background: ${(props: any) => props.theme.inputBg};
        color:  ${(props: any) => props.theme.textColor};
        border: 1px solid ${(props: any) => props.theme.buttonBorder};
        border-radius:3px;
        font-size:12px;
        height:26px;
    }
`;

export const Label = styled.div`
    color: ${(props: any) => props.theme.textColor};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    flex: 0;
    white-space: nowrap;

    border-radius: 3px 0px 0px 3px;
`;