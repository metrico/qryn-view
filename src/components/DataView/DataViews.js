import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { LogRows } from "./LogRows";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { setLeftDataView } from "../../actions/setLeftDataView";
import { setRightDataView } from "../../actions/setRightDataView";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { Tooltip } from "@mui/material";
import ClokiChart from "../../plugins/charts";
import { VectorTable } from "../../qryn-ui/VectorTable/VectorTable";

const ViewStyled = styled.div`
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

const DTCont = styled.div`
    overflow-y: auto;
    margin: 3px;
    &::-webkit-scrollbar {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
    }
`;

const VHeader = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.textColor};
    font-size: 12px;
    .header-actions {
        justify-self: flex-end;
        .header-icon {
            padding: 1px 2px;
            margin: 0px 2px;
            border-radius: 3px;
            cursor: pointer;
            color: ${({ theme }) => theme.textColor};
            &:hover {
                background: ${({ theme }) => theme.buttonDefault};
            }
        }
    }
    .view-header-info {
        display: flex;
        flex: 1;
        align-items: center;
        span {
            margin: 0px 3px;
            .exp {
                font-family: monospace;
                font-weight: bold;
            }
        }
    }
`;

export default function DataViews(props) {
    const theme = useSelector((store) => store.theme);

    const [side] = useState(props.name);

    const dataViews = useSelector((store) => store[`${side}DataView`]);

    return (
        <ThemeProvider theme={themes[theme]}>
            <DTCont>
                {dataViews.length > 0 &&
                    dataViews.map((dv, index) => (
                        <DataViewItem key={index} {...props} dataView={dv} />
                    ))}
            </DTCont>
        </ThemeProvider>
    );
}

export function DataViewItem(props) {
    // add a header for table view / json view
    const { dataView, name } = props;
    const { type, total } = dataView;

    // panelSize: min , regular, full
    const panel = useSelector((store) => store[name]);
    const [panelSize, setPanelSize] = useState("regular");

    const actualQuery = useMemo(() => {
        let found = {};
        if (panel && dataView) {
            found = panel?.find((f) => f.id === dataView.id);
        }
        return found;
    }, [panel, dataView]);

    const [streamData, setStreamData] = useState(dataView.data);
    const [tableData, setTableData] = useState(dataView.tableData || {});
    useEffect(() => {
        setStreamData(dataView.data);
    }, [dataView.data, setStreamData]);
    useEffect(() => {
        setTableData(dataView.tableData || {});
    }, [dataView.tableData, setTableData]);
    const onStreamClose = () => {
        setStreamData([]);
        setTableData([]);
    };

    const onMinimize = () => {
        setPanelSize((prev) => (prev !== "min" ? "min" : "regular"));
    };

    const onMaximize = () => {
        setPanelSize((prev) => (prev !== "max" ? "max" : "regular"));
    };

    const theight = useMemo(() => {
        const totalRows = total * 20;

        if (panelSize === "max") {
            return totalRows;
        }
        if (panelSize === "min") {
            return 0;
        }
        if (panelSize === "regular") {
            return totalRows < 310 ? totalRows : 310;
        } else {
            return totalRows < 310 ? totalRows : 310;
        }
    }, [panelSize]);

    const viewHeight = useMemo(() => {
        const isMatrixTable = type === "matrix" && actualQuery.tableView;
        const isStreamTable = type === "stream" && actualQuery.tableView;
        let regularCont = "",
            maxCont = "",
            regularView = "",
            maxView = "";
        if (type === "vector" || isMatrixTable || isStreamTable) {
            const regRows = total * 20;
            const regCalc = regRows < 330 ? regRows : 330;

            regularCont = `${regCalc + 20}px`;
            regularView = `${regCalc}px`;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if (type === "stream" && !actualQuery.tableView) {
            const regRows = total * 20;
            const regCalc = regRows < 350 ? "fit-content" : "350px";
            regularCont = regCalc;
            regularView = regCalc;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if (type === "matrix" && !actualQuery.tableView) {
            regularCont = "fit-content";
            regularView = "350px";
            maxCont = "fit-content";
            maxView = "fit-content";
        }
        return { regularCont, regularView, maxCont, maxView };
    }, [total, type, actualQuery.tableView]);

    if (actualQuery && type === "stream" && streamData.length > 0) {
        return (
            <ViewStyled size={panelSize} vheight={viewHeight}>
                <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    total={total}
                    type={type}
                    {...props}
                />
                <div className="view-content">
                    {actualQuery?.tableView ? (
                        <VectorTable
                            {...props}
                            height={theight}
                            data={tableData}
                            actualQuery={actualQuery}
                        />
                    ) : (
                        <LogRows
                            {...props}
                            onClose={onStreamClose}
                            messages={streamData}
                            actualQuery={actualQuery}
                        />
                    )}
                </div>
            </ViewStyled>
        );
    }

    if (actualQuery && type === "matrix" && streamData.length > 0) {
        // return matrix type component
        const { limit } = actualQuery;

        return (
            <ViewStyled size={panelSize} vheight={viewHeight}>
                <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    total={total}
                    type={type}
                    {...props}
                />
                <div className="view-content">
                    {actualQuery?.tableView ? (
                        <VectorTable
                            {...props}
                            height={theight}
                            data={tableData}
                            actualQuery={actualQuery}
                        />
                    ) : (
                        <ClokiChart
                            {...props}
                            chartLimit={limit}
                            matrixData={streamData}
                            actualQuery={actualQuery}
                        />
                    )}
                </div>
            </ViewStyled>
        );
    }

    if (actualQuery && type === "vector" && streamData?.dataRows?.length > 0) {
        // return vector type (table) component

        return (
            <ViewStyled size={panelSize} vheight={viewHeight}>
                <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    total={total}
                    type={type}
                    {...props}
                />
                <div className="view-content" id={actualQuery.id + "-view"}>
                    <VectorTable
                        {...props}
                        height={theight}
                        data={streamData}
                        actualQuery={actualQuery}
                    />
                </div>
            </ViewStyled>
        );
    } else {
        return null;
    }
}

const LabelChip = styled.div`
    margin: 0px 2px;
    padding: 2px;
    font-size: 10px;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
    border-radius: 3px;
`;

const HeadLabelsCont = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 12px;
    flex: 1;
    max-width: 450px;
    overflow-x: auto;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({ theme }) => theme.scrollbarThumb};
    }
`;

export function ViewHeader(props) {
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const { actualQuery, dataView, name, type, total } = props;
    const DataViewList = useSelector((store) => store[`${name}DataView`]);
    const action = (name) => {
        if (name === "left") {
            return setLeftDataView;
        } else {
            return setRightDataView;
        }
    };

    const headerType = useMemo(() => {
        const isMatrixTable = type === "matrix" && actualQuery.tableView;
        const isStreamTable = type === "stream" && actualQuery.tableView;
        if (type === "matrix" && !actualQuery.tableView) {
            return "Chart";
        }
        if (type === "stream" && !actualQuery.tableView) {
            return "Logs";
        }
        if (type === "vector" || isMatrixTable || isStreamTable) {
            return "Table";
        }
    }, [type, actualQuery.tableView]);
    function onClose() {
        const filtered = DataViewList.filter((f) => f.id !== dataView.id) || [];
        dispatch(action(name)([]));
        dispatch(action(name)(filtered));
        props.onClose();
    }
    function onMinimize() {
        props.onMinimize();
    }
    function onMaximize() {
        props.onMaximize();
    }
    const labelsLegend = useMemo(
        () => dataView?.labels?.join("  |  ") || "",
        [dataView.labels]
    );
    const labelsList = useMemo(() => {
        if (dataView?.labels?.length) {
            if (dataView?.labels.length > 4) {
                const cropped = [...dataView.labels].slice(0, 4);
                return (
                    <>
                        {cropped.map((name, index) => (
                            <LabelChip key={index}>
                                <ViewLabel name={name} {...props.theme} />
                            </LabelChip>
                        ))}{" "}
                        ...
                    </>
                );
            } else {
                return (
                    <>
                        {dataView.labels.map((name, index) => (
                            <LabelChip key={index}>
                                <ViewLabel name={name} {...props.theme} />
                            </LabelChip>
                        ))}
                    </>
                );
            }
        }
    });

    return (
        <ThemeProvider theme={themes[theme]}>
            <VHeader>
                <div className="view-header-info">
                    <span>
                        <span className="exp">{headerType}</span>
                    </span>
                    <Tooltip title={actualQuery.expr}>
                        <span>
                            query:{" "}
                            <span className="exp">{actualQuery.idRef}</span>
                        </span>
                    </Tooltip>

                    <span>
                        limit: <span className="exp">{actualQuery.limit}</span>
                    </span>
                    <span>
                        count: <span className="exp">{total}</span>
                    </span>
                    {dataView.labels && (
                        <span>
                            <HeadLabelsCont title={labelsLegend}>
                                labels:
                                {labelsList}
                            </HeadLabelsCont>
                        </span>
                    )}
                </div>

                <div className="header-actions">
                    <CropSquareIcon
                        className="header-icon"
                        onClick={onMaximize}
                        style={{ fontSize: "12px" }}
                    />
                    <MinimizeIcon
                        className="header-icon"
                        onClick={onMinimize}
                        style={{ fontSize: "12px" }}
                    />

                    <CloseIcon
                        className="header-icon"
                        onClick={onClose}
                        style={{ fontSize: "12px" }}
                    />
                </div>
            </VHeader>
        </ThemeProvider>
    );
}

export function ViewLabel(props) {
    const { name } = props;

    return <>{name}</>;
}
