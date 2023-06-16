import styled from "@emotion/styled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LinkIcon from "@mui/icons-material/Link";
import { Drawer } from "@mui/material";
import { TabsUnstyled } from "@mui/base";

import { DatePickerButton } from "../../components/StatusBar/styled";
export const StyledDrawer: any = styled((props: any) => (
    <Drawer
        anchor={"bottom"}
        style={{ maxHeight: "250px", }}
        variant={"persistent"}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderTop:`1px solid ${theme.buttonBorder}`,
    },
}));

export const TabsContainer: any = styled(TabsUnstyled)`
    height: "320px";
    background: ${({theme}: any) => theme.inputBg};
`;
export const Tab: any = styled(TabUnstyled)`
    color: ${({theme}: any) => theme.textColor};
    background: ${({theme}: any) => theme.buttonDefault};
    border:1px solid ${(props: any)=>props.theme.buttonBorder};
    cursor: pointer;
    font-size: 13px;
    background-color: transparent;
    padding: 6px 10px;
    border: none;
    border-radius: 3px 3px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid transparent;
    transition: 0.2s all;

    &:hover {
        background-color: ${({ theme }: any) => theme.buttonHover};
    }

    &:focus {
        color: ${({ theme }: any) => theme.textColor};
        background: ${({ theme }: any) => theme.buttonDefault};
        border-radius: 3px 3px 0px 0px;

        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        border-bottom: 1px solid ${({ theme }: any) => theme.primaryDark};
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
    @media screen and (max-width: 360px) {
        span {
            display: none;
        }
        padding: 5px 20px;
    }
`;

export const TabHistoryIcon: any = styled(HistoryIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

export const TabHistoryStarIcon: any = styled(StarBorderIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

export const TabHistorySettingIcon: any = styled(DisplaySettingsIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

export const TabHistoryLinkIcon: any = styled(LinkIcon)`
    height: 16px;
    width: 16px;
    margin-right: 3px;
`;

export const TabHistorySearchIcon: any = styled(SearchIcon)`
    height: 21px;
    width: 16px;
    padding: 0px 3px;
    border-radius: 3px 0px 0px 3px;
    background: ${({ theme }: any) => theme.inputBg};
`;

export const TabHeaderContainer: any = styled.div`
    padding: 0px 15px;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: ${({theme}: any) => theme.textColor};
    justify-content: space-between;
    background: ${({theme}: any) => theme.tabHeader};
    height: 37px;
`;
export const TabPanel: any = styled(TabPanelUnstyled)`
    width: 100%;
    background: ${({ theme }: any) => theme.widgetContainer};
`;

export const TabsList: any = styled(TabsListUnstyled)`
    min-width: 320px;
    background: ${({ theme }: any) => theme.tabHeader};
    border-bottom: 4px solid ${({ theme }: any) => theme.historyRow};
    display: flex;
    align-items: center;
    align-content: space-between;
`;

export const EmptyHistory: any = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}: any) => theme.textColor};
    font-size: 14px;
    flex: 1;
    padding: 20px;
    height: 50%;
`;

export const QueryHistoryContainer: any = styled.div`
    height: 250px;
    overflow-y: auto;
    color: ${({theme}: any) => theme.textColor};
    background: ${({theme}: any) => theme.tabBg};
    &.starredCont {
        height: 210px;
    }
    &::-webkit-scrollbar {
        width: 5px;
        background: ${({theme}: any) => theme.buttonDefault};
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
      }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({theme}: any) => theme.scrollbarThumb};
    }
`;


export const HistoryButton: any = styled(DatePickerButton)`
    padding: 3px 6px;
    background: ${({ theme }: any) => theme.buttonDefault};
    border: 1px solid ${(props: any)=>props.theme.buttonBorder};
    border-radius: 3px;
    border: none;
    color: ${({ theme }: any) => theme.textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 6px;
    cursor: pointer;
    min-height: 20px;
`;

export const SettingItemContainer: any = styled.div`
    height: 100px;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background: ${({ theme }: any) => theme.buttonDefault};
    border:1px solid ${(props: any)=>props.theme.buttonBorder};
    margin: 10px;
    border-radius: 3px;
    & div {
        font-size: 15px;
        color: ${({ theme }: any) => theme.textPrimaryAccent};
        line-height: 1.5;
    }
    & small {
        font-size: 12px;
        color: ${({theme}: any) => theme.textColor};
        line-height: 1.5;
        margin-bottom: 10px;
    }
`;
export const SubmitButton: any = styled(HistoryButton)`
    background: ${({ theme }: any) => theme.primaryDark};
    color: ${({ theme }: any) => theme.buttonText};
    white-space: nowrap;
    .open-icon {
        display: none;
    }
    .open-text {
        display: flex;
        font-size: 12px;
    }
    @media screen and (max-width: 1070px) {
        .open-icon {
            display: flex;
        }
        .open-text {
            display: none;
            
        }
    }
`;

export const ClearHistoryButton: any = styled(HistoryButton)`
    font-weight: bold;
    padding: 10px 20px;
    background: ${({ theme }: any) => theme.primaryDark};
    color: ${({ theme }: any) => theme.buttonText};
    margin: 0;
    width: 100%;
    white-space: nowrap;
`;
export const StyledCloseButton: any = styled(HistoryButton)`
    background: none;
    color: ${({ theme }: any) => theme.textColor};

    position: absolute;
    right: 0;
`;

export const DialogCancelButton: any = styled(HistoryButton)`
    background: ${({ theme }: any) => theme.buttonDefault};
    border:1px solid ${(props: any)=>props.theme.buttonBorder};
    padding: 8px 16px;
`;
export const DialogConfirmButton: any = styled(HistoryButton)`
    background: ${({ theme }: any) => theme.primaryDark};
    color:${({theme}: any) => theme.buttonText};
    padding: 8px 16px;
`;

export const FilterInput: any = styled.input`
    color: ${({theme}: any) => theme.textColor};
    background: ${({ theme }: any) => theme.inputBg};
    border:none;
    height: 21px;
    margin: 0px 10px 0px 0px;
    padding: 0px;
    font-size: 13px;
    border-radius: 0px 3px 3px 0px;
    font-family: monospace;
    font-size: 12px;
    &:focus {
        outline: none;
        color: ${({ theme }: any) => theme.inputTextFocus};
    }
`;
export const RowData: any = styled.span`
    flex: 1;
    font-family: monospace;
    display:flex;
    align-items: center;
    font-size: "13px";
    color: ${({theme}: any) => theme.textColor};
    white-space: nowrap;
    padding: 4px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const LinkParams: any = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    .open-button {
        display: none;
    }
    .inline-params {
        align-items: center;
        display: ${(props: any) => props.open ? "none" : "grid"};
        flex: 1;
        grid-template-columns: 1fr 0.25fr 0.25fr auto;
        margin-right: 5px;
    }

    .open-button {
        display: flex;
        color: ${({ theme }: any) => theme.buttonText};
        background: none;
        border: none;
    }
    .block-params {
        display: ${(props: any) => props.open ? "flex" : "none"};
        flex-direction: column;
        flex: 1;
        p {
            display: flex;
            align-items: center;
            flex: 1;
            line-height: 1.5;
            font-size: 12px;
            font-family: monospace;
            span {
                margin-left: 3px;
                &.key {
                    flex: 1;
                }
                &.value {
                    flex: 3;
                }
            }
        }
    }
    @media screen and (max-width: 1070px) {
        .inline-params {
            display: none;
        }
    }
`;

export const HistoryRow: any = styled.div`
    padding: 5px 0px;
    padding-left: 10px;
    border: 1px solid ${({ theme }: any) => theme.historyRow};
    margin: 5px;
    border-radius: 3px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const TimeSpan: any = styled.div`
    @media screen and (max-width: 1370px) {
        display: none;
    }
`;
