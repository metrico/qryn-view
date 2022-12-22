import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useActualQuery, useTableHeight, useViewHeight } from "../hooks";
import { EmptyView } from "../views/EmptyView";
import LogsView from "../views/LogsView";
import { MatrixView } from "../views/MatrixView";
import { VectorView } from "../views/VectorView";
import { TraceView } from "./Traces/TraceView.tsx";
export function DataViewItem(props) {
    // add a header for table view / json view
    const { dataView, name, vHeight } = props;
    const { type, total, loading } = dataView;
    const viewRef = useRef(null);
    const isSplit = useSelector((store) => store.isSplit);
    const panel = useSelector((store) => store[name]);
    // panelSize: min , regular, max
    const [panelSize, setPanelSize] = useState("max");
    // get actual query from panel
    const actualQuery = useActualQuery({ panel, dataView });
    // get  actual query from panel

    const [viewWidth, setViewWidth] = useState(0);

    useEffect(() => {
        if (viewRef?.current?.clientWidth) {
            setViewWidth(viewRef.current.clientWidth);
        }
    }, [viewRef?.current?.clientWidth]);

    const [streamData, setStreamData] = useState(dataView.data); //
    const [tableData, setTableData] = useState(dataView.tableData || {});

    useEffect(() => {
        setStreamData(dataView.data);
    }, [dataView.data, setStreamData, isSplit]);

    useEffect(() => {
        setTableData(dataView.tableData || {});
    }, [dataView.tableData, setTableData]);

    const setStreamClose = useCallback(() => {
        setStreamData([]);
        setTableData([]);
    },[]);

    const setMinimize = useCallback(() => {
        setPanelSize((prev) => (prev !== "min" ? "min" : "regular"));
    },[panelSize]);

    const setMaxHeight = useCallback(() => {
        setPanelSize((prev) => (prev !== "max" ? "max" : "regular"));
    },[panelSize]);

    const theight = useTableHeight({ total, panelSize, dataView });

    const viewHeight = useViewHeight({ type, actualQuery, total, dataView });

    if (type === "traces") {
        const traceProps = {
            viewRef,
            panelSize,
            viewHeight,
            setStreamClose,
            setMaxHeight,
            setMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            viewWidth,
            streamData,
            theme: props.theme,
            ...props,
        };
        return <TraceView {...traceProps} />;
    }
    if (actualQuery && type === "matrix" && streamData.length > 0) {
        // return matrix type component
        const { limit } = actualQuery;
        const matrixProps = {
            viewRef,
            panelSize,
            viewHeight,
            setStreamClose,
            setMaxHeight,
            setMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            viewWidth,
            limit,
            streamData,
            ...props,
        };
        return <MatrixView {...matrixProps} />;
    }

    if (actualQuery && type === "stream" && streamData.length > 0) {
        const logsProps = {
            viewRef,
            panelSize,
            viewHeight,
            setStreamClose,
            setMaxHeight,
            setMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            streamData,
            ...props,
        };

        return <LogsView {...logsProps} />;
    }

    if ((actualQuery && type === "vector" && streamData?.chartData?.length > 0) ||  (actualQuery && type === "vector"&& streamData?.tableData?.dataRows?.length > 0)) {
        
        
        // return vector type (table) component
        const { limit } = actualQuery;
        const vectorProps = {
            viewRef,
            panelSize,
            viewHeight,
            setStreamClose,
            setMinimize,
            setMaxHeight,
            actualQuery,
            total,
            type,
            theight,
            streamData,
            viewWidth,
            limit,
            ...props,
        };
        return <VectorView {...vectorProps} />;
    }

    if (actualQuery && !streamData?.dataRows?.length && !streamData?.length) {
        // Empty view for the case when no view available
        const emptyViewProps = {
            viewRef,
            panelSize,
            setStreamClose,
            setMinimize,
            setMaxHeight,
            actualQuery,
            total,
            loading,
            ...props,
        };

        return <EmptyView {...emptyViewProps} />;
    } else {
        return null;
    }
}
