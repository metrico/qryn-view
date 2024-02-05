import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import styled from "@emotion/styled";

export const QueryItemContainerStyled = styled.div`
    background: ${({ theme }: any) => `${theme.background}`};
    color: ${({ theme }: any) => `${theme.contrast}`};
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
    .query-title {
        display: flex;
        align-items: center;
    }
    .query-tools-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 4px;
    }
    .query-tools {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        flex: 1;
        gap: 2px;
        margin-top: 4px;
    }
    .query-id {
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
    }
    .query-title-tabs {
        display: flex;
        align-items: center;
    }
    // query sync timestamp button
    .sync-btn {
        margin: 0px 4px;
        margin-right: 10px;
        background: ${({ theme }: any) => theme.neutral};
        outline: none;
        border: none;
        color: ${({ theme }: any) => theme.contrast};
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        cursor: pointer;
        transition: 0.2s all;
        &:hover {
            background: ${({ theme }: any) => theme.lightNeutral};
        }
    }
    .add-btn {
        margin-left: 10px;
        background: none;
        outline: none;
        border: none;

        color: ${({ theme }: any) => theme.contrast};
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        cursor: pointer;
        transition: 0.2s all;
        &:hover {
            background: ${({ theme }: any) => theme.lightNeutral};
        }
        &.trash {
            margin: 0px;
            margin-right: 5px;
        }
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
    color: ${({ theme }: any) => theme.contrast};
`;

export const CloseQuery = styled(KeyboardArrowRightOutlinedIcon)`
    font-size: 13px;
    color: ${({ theme }: any) => theme.contrast};
`;

export const InputGroup = styled.div`
    display: flex;
    margin-right: 10px;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    select {
        background: ${(props: any) => props.theme.deep};
        color: ${(props: any) => props.theme.contrast};
        border: 1px solid ${(props: any) => props.theme.accentNeutral};
        border-radius: 3px;
        font-size: 12px;
        height: 26px;
    }
`;

export const Label = styled.div`
    color: ${(props: any) => props.theme.contrast};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    flex: 0;
    white-space: nowrap;

    border-radius: 3px 0px 0px 3px;
`;
