import styled from "@emotion/styled";
import {
    TabPanel,
    TabsList,
    Tabs,
    Tab,
} from "@mui/base";
import { tabClasses } from "@mui/base/Tab";
import { buttonClasses } from "@mui/base/Button";

export const ViewStyled: any = styled.div`
    margin: 4px;
    padding: 5px;
    margin-top: 0px;
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    flex: ${({ size }: any) => (size === "min" ? 0 : 1)};

    height: ${(props: any) =>
        props.size === "regular"
            ? props.vheight.regularCont
            : props.size === "max"
            ? props.vheight.maxCont
            : "20px"};
    .view-content {
        height: ${(props: any) =>
            props.size === "regular"
                ? props.vheight.regularView
                : props.size === "max"
                ? props.vheight.maxView
                : "0px"};
        display: ${(props: any) =>
            props.size === "min"
                ? "none"
                : props.size === "regular"
                ? "flex"
                : "flex"};
        flex-direction: ${(props: any) =>
            props.size === "regular" ? "column" : "column"};
        flex: 1;
    }
`;

export const TabPanelq = styled(TabPanel)`
    width: 100%;
    background: ${({ theme }: any) => theme.shadow};
    height: inherit;
    flex: 1;
`;
export const TabsContainer = styled(Tabs)`
    display: flex;
    height: 100%;
`;
export const TabsListq: any = styled(TabsList)`
    min-width: 320px;
    background: ${({ theme }: any) => theme.shadow};
    border-bottom: 4px solid ${({ theme }: any) => theme.bgNeutral};
    display: ${({ panelsize }: any) => (panelsize === "min" ? "none" : "flex")};
    align-items: center;
    align-content: space-between;
`;

export const Tabq = styled(Tab)`
    color: ${({ theme }: any) => theme.contrast};
    background: ${({ theme }: any) => theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
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
        background-color: ${({ theme }: any) => theme.lightNeutral};
    }

    &:focus {
        color: ${({ theme }: any) => theme.contrast};
        background: ${({ theme }: any) => theme.neutral};
        border-radius: 3px 3px 0px 0px;

        outline-offset: 2px;
    }

    &.${tabClasses.selected} {
        border-bottom: 1px solid ${({ theme }: any) => theme.primary};
    }

    &.${buttonClasses.disabled} {
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
