import styled from "@emotion/styled";
/**
 * Labels styles
 */
export const LabelsContainer = styled("div")`

    display: flex;
    flex-wrap: wrap;
    max-height: calc(100% - 285px);
    overflow-y: auto;
    margin: 10px 20px;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props) => props.theme.scrollbarThumb};
    }
`;

export const ChartLabel = styled("div")`
    font-size: 12px;
    color: ${(props) => props.theme.textColor};
    font-family: sans-serif;
    display: flex;
    align-items: center;
    line-height: 1.5;
    padding-right: 10px;
    cursor: pointer;
    opacity: ${(props) => (props.isVisible ? "1" : ".5")};
    border-radius: 3px;
    &:hover {
        background: ${(props) => props.theme.buttonHover};
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
export const ChartButton = styled.button`
    background: ${(props) =>
        props.isActive ? props.theme.buttonDefault : props.theme.buttonHover};
    color: ${(props) => props.theme.textColor};
    padding: 3px 12px;
    border: 1px solid ${(props) => props.theme.buttonBorder};
    border-radius: ${(props) =>
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

export const ChartToolsCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.isMobile ? "column" : "row")};

    margin: 10px 25px;
    justify-content: space-between;
    .limit-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        margin-bottom: ${(props) => (props.isMobile ? "10px" : "0px")};
        width: ${(props) => (props.isMobile ? "100%" : "auto")};
        div {
            flex: ${(props) => (props.isMobile ? "1" : "0")};
            text-align: ${(props) => (props.isMobile ? "center" : "left")};
        }
    }
    .chart-buttons-cont {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: ${(props) => (props.isMobile ? "1" : "0")};
        width: ${(props) => (props.isMobile ? "100%" : "auto")};
    }
`;

/**
 * Show Series styles
 */

export const ShowSeries = styled.div`
    font-size: 12px;
    line-height: 20px;
    padding: 3px 12px;
    white-space: nowrap;
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    border-radius: 3px;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
        background: ${(props) => props.theme.buttonHover};
    }
`;

export const ChartCont = styled.div`
    height: inherit;
   background: ${({theme})=>theme.chartBg}
`;
