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
    border: 1px solid gray;
    height: ${(props) =>
        props.size === "regular"
            ? "350px"
            : props.size === "min"
            ? "18px"
            : "fit-content"};
    .view-content {
        height: calc(100% - 5px);
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
    const step = useSelector((store) => store.step);
    const theme = useSelector((store) => store.theme);

    const [side] = useState(props.name);

    const panel = useSelector((store) => store[`${props.name}`]);
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

// Hook
function useDimensions(targetRef) {
    const [width, setWidth] = useState(targetRef?.current?.offsetWidth || 0);
    const [height, setHeight] = useState(targetRef?.current?.offsetHeight || 0);

    useEffect(() => {
        setHeight(targetRef?.current?.offsetHeight);
    }, [targetRef?.current?.offsetHeight, setHeight]);

    useEffect(() => {
        setWidth(targetRef?.current?.offsetWidth);
    }, [targetRef?.current?.offsetWidth, setWidth]);

    return { width, height };
}

export function DataViewItem(props) {
    // add a header for table view / json view
    const { dataView, name } = props;
   

  
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
    const [tableData, setTableData] = useState(dataView.tableData || {})
    console.log(tableData)
    useEffect(() => {
        setStreamData(dataView.data);
    }, [dataView.data, setStreamData]);
    useEffect(() => {
        setTableData(dataView.tableData || {});
    }, [dataView.tableData, setTableData]);
    const onStreamClose = () => {
        setStreamData([]);
        setTableData([])
    };

    const onMinimize = () => {
        setPanelSize((prev) => (prev !== "min" ? "min" : "regular"));
    };

    const onMaximize = () => {
        setPanelSize((prev) => (prev !== "max" ? "max" : "regular"));
    };

    if (actualQuery && dataView.type === "stream" && streamData.length > 0) {
        return (
            <ViewStyled size={panelSize} >
                <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    {...props}
                />
                <div className="view-content">
                {actualQuery?.tableView ? (
                                <VectorTable
                                {...props}
                               
                                data={tableData}
                                actualQuery={actualQuery}
                            />
                    ):(<LogRows
                        {...props}
                        onClose={onStreamClose}
                        messages={streamData}
                        actualQuery={actualQuery}
                    />)}
                    
                </div>
            </ViewStyled>
        );
    }


    if (actualQuery && dataView.type === "matrix" && streamData.length > 0) {
        // return matrix type component
        const { limit } = actualQuery;


        return (
            <ViewStyled size={panelSize}>
                <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    {...props}
                />
                <div className="view-content">
                    {actualQuery?.tableView ? (
                                <VectorTable
                                {...props}
                               
                                data={tableData}
                                actualQuery={actualQuery}
                            />
                    ):(        <ClokiChart
                        {...props}
                        chartLimit={limit}
                        matrixData={streamData}
                        actualQuery={actualQuery}
                    />)}

            
                </div>
            </ViewStyled>
        );
    }



    

    if (
        actualQuery &&
        dataView.type === "vector" &&
        streamData?.dataRows?.length > 0
    ) {
        // return vector type (table) component
        console.log(actualQuery, streamData);

        return (
            <ViewStyled size={panelSize} >
                <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    {...props}
                />
                <div className="view-content"  id={actualQuery.id+'-view'}>
                    <VectorTable
                        {...props}
                       
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
    margin: 0px 4px;
    padding: 2px 5px;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
    border-radius: 3px;
`;

export function ViewHeader(props) {
    const dispatch = useDispatch();
    console.log(props);
    const theme = useSelector((store) => store.theme);
    const { actualQuery, dataView, name } = props;
    const DataViewList = useSelector((store) => store[`${name}DataView`]);
    const action = (name) => {
        if (name === "left") {
            return setLeftDataView;
        } else {
            return setRightDataView;
        }
    };
    function onClose() {
        console.log(DataViewList);
        const filtered = DataViewList.filter((f) => f.id !== dataView.id) || [];
        console.log(filtered);
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
    /**
     * expr
     * limit
     * idRef
     * queryType
     */
    // update at dataview also
    return (
        <ThemeProvider theme={themes[theme]}>
            <VHeader>
                <div className="view-header-info">
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
                        count:{" "}
                        <span className="exp">{dataView.data.length}</span>
                    </span>
                    {dataView.labels && (
                        <span>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0px 12px",
                                }}
                            >
                                labels:
                                {dataView.labels.map((name, index) => (
                                    <LabelChip key={index}>
                                        <ViewLabel
                                            name={name}
                                            {...props.theme}
                                        />
                                    </LabelChip>
                                ))}
                            </div>
                        </span>
                    )}
                </div>

                <div className="header-actions">
                    <CropSquareIcon
                        onClick={onMaximize}
                        style={{ fontSize: "12px" }}
                    />
                    <MinimizeIcon
                        onClick={onMinimize}
                        style={{ fontSize: "12px" }}
                    />

                    <CloseIcon onClick={onClose} style={{ fontSize: "12px" }} />
                </div>
            </VHeader>
        </ThemeProvider>
    );
}

export function ViewLabel(props) {
    const { name } = props;

    return <>{name}</>;
}
