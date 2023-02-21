import styled from "@emotion/styled";
/**
 * Labels styles
 */
export const LabelsContainer = styled("div")`
    display: flex;
    flex-wrap: wrap;
    max-height: 60px;
    overflow-y: auto;
    margin: 10px;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props: any) => props.theme.scrollbarThumb};
    }
`;

type ChartLabelProps = {
    isVisible: boolean;
};

export const ChartLabel = styled.div<ChartLabelProps>`
    font-size: 12px;
    color: ${(props: any) => props.theme.textColor};
    font-family: sans-serif;
    display: flex;
    align-items: center;
    line-height: 1.5;
    padding-right: 10px;
    cursor: pointer;
    opacity: ${(props: any) => (props.isVisible ? "1" : ".5")};
    border-radius: 3px;
    &:hover {
        background: ${(props: any) => props.theme.buttonHover};
    }
`;

export const ColorLabel = styled("div")`
    height: 4px;
    width: 16px;
    margin-right: 8px;
    background: ${(props) => props.color};
    content: " ";
`;

/**
 *  Chart Tools styles
 */

type ChartButtonProps = {
    isActive: boolean;
    leftBtn?: boolean;
    rightBtn?:boolean;
}
export const ChartButton = styled.button<ChartButtonProps>`
    background: ${(props: any) =>
        props.isActive ? props.theme.buttonDefault : props.theme.buttonHover};
    color: ${(props: any) => props.theme.textColor};
    padding: 3px 12px;
    border: 1px solid ${(props: any) => props.theme.buttonBorder};
    border-radius: ${(props: any) =>
        props.rightBtn
            ? "0px 3px 3px 0px"
            : props.leftBtn
            ? "3px 0px 0px 3px"
            : "none"};
    cursor: pointer;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    flex: 1;
`;

type ChartToolsContProps = {
isMobile:boolean
}

export const ChartToolsCont = styled.div<ChartToolsContProps>`
    display: flex;
    align-items: center;
    flex-direction: ${(props: any) => (props.isMobile ? "column" : "row")};

    margin: 10px 25px;
    justify-content: space-between;
    .limit-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        margin-bottom: ${(props: any) => (props.isMobile ? "10px" : "0px")};
        width: ${(props: any) => (props.isMobile ? "100%" : "auto")};
        div {
            flex: ${(props: any) => (props.isMobile ? "1" : "0")};
            text-align: ${(props: any) => (props.isMobile ? "center" : "left")};
        }
    }
    .chart-buttons-cont {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: ${(props: any) => (props.isMobile ? "1" : "0")};
        width: ${(props: any) => (props.isMobile ? "100%" : "auto")};
    }
`;

/**
 * Show Series styles
 */

type ShowSeriesProps = {
    onClick :(e:any)=>void
}

export const ShowSeries = styled.div<ShowSeriesProps>`
    font-size: 12px;
    line-height: 20px;
    padding: 3px 12px;
    white-space: nowrap;
    color: ${(props: any) => props.theme.textColor};
    background: ${(props: any) => props.theme.buttonDefault};
    border: 1px solid ${(props: any) => props.theme.buttonBorder};
    border-radius: 3px;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
        background: ${(props: any) => props.theme.buttonHover};
    }
`;

export const ChartCont = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    flex: 1;
    background: ${({ theme }: { theme: any }) => theme.chartBg};
    .chart-cont {
        flex: 1;
    }
`;
