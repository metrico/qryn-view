import React, { Component } from "react";
import { connect } from "react-redux";
import { DataViewCont, DataViewStyled, DataViewHeader, Loader } from "./styled";
import ClokiChart from "../../plugins/charts";
import QueryHistory from "../../plugins/queryhistory";
import EmptyView from "./EmptyView";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { LogRows } from "./LogRows";
import { VectorTable } from "../../qryn-ui/VectorTable/VectorTable";

class DataView extends Component {
    constructor(props) {
        super(props);
        const { messages } = props || [];
        this.state = {
            limit: props.limit || 100,
            messages,
            matrixData: props.matrixData || [],
            loading: false,
            theme: props.theme,
            vectorData: props.vectorData || [],
            tableData: props.tableData || {},
            isEmptyView: props.isEmptyView || false,
            isTableView: props.isTableView || false,
            responseType: props.responseType || "",
            leftDataView: props.leftDataView || [],
            rightDataView: props.rightDataView || [],
            left: props.left || [],
            right: props.right || [],
        };
    }

    getMatrixForChart = () => {
        return this.props.matrixData;
    };

    getLimit = () => {
        return this.props.limit;
    };

    render() {


        const side = this.props.name;
        const dtView = this.props[`${side}DataView`];

        const actualQuery = () => {
            return this.props[side].find(
                (f) => f.id === dtView?.id
            );
        };

        const { expr, idRef, limit, tableView } = actualQuery() || {
            expr: "",
            idRef: "A",
            limit: 100,
            tableView: false,
        };

        const isPanel = (panel) => {
            return this.props.name === panel;
        };

        const dataViewType = (panel, type) => {
            return isPanel(panel) && dtView?.type === type;
        };

        const isStream = (panel) => {
            return dtView?.data?.length > 0 && dataViewType(panel, "stream");
        };

        const isMatrix = (panel) => {
            return dataViewType(panel, "matrix");
        };

        const isVector = (panel) => {
            return dataViewType(panel, "vector");
        };

        const resType = () => {
            return {
                vecType: isVector(this.props.name),
                matType: isMatrix(this.props.name),
                strType: isStream(this.props.name),
            };
        };

        const dataViewData = () => {
            return {
                stream: {
                    data: dtView?.data,
                    tableData: dtView?.tableData,
                },
                matrix: {
                    limit,
                    data: dtView?.data,
                    tableData: dtView?.tableData,
                },
                vector: dtView?.data,
            };
        };

        const { stream, matrix, vector } = dataViewData();

        const { strType, matType, vecType } = resType();

        const isResponse = strType || matType || vecType;

        const totalResults = dtView.total;

        return (
            <ThemeProvider theme={themes[this.props.theme]}>
                <DataViewHeader>
                    {/* add here the header opts: 
                        source, limit, length, query ? 
                        font size: smaller as possible
                         */}
                    {isResponse && (
                        <>
                            <span>query: {expr}</span>
                            <span>limit: {limit}</span>
                            <span>results: {totalResults}</span>
                            <span>source: {idRef}</span>
                        </>
                    )}
                </DataViewHeader>
                <DataViewStyled>
                    <DataViewCont>
                        {strType && !tableView && (
                            <LogRows
                                {...this.props}
                                messages={stream.data}
                                actualQuery={actualQuery()}
                            />
                        )}

                        {strType && tableView && (
                            <VectorTable
                                {...this.props}
                                data={stream.tableData}
                                actualQuery={actualQuery()}
                            />
                        )}

                        {matType && !tableView && (
                            <ClokiChart
                                {...this.props}
                                chartLimit={matrix.limit}
                                matrixData={matrix.data}
                                actualQuery={actualQuery()}
                            />
                        )}

                        {matType && tableView && (
                            <VectorTable
                                {...this.props}
                                actualQuery={actualQuery()}
                                data={matrix.tableData}
                            />
                        )}

                        {vecType && (
                            <VectorTable
                                {...this.props}
                                data={vector}
                                actualQuery={actualQuery()}
                            />
                        )}

                        {this.props.loading && <Loader />}
                        {this.props.isEmptyView && <EmptyView />}

                        <QueryHistory />
                    </DataViewCont>
                </DataViewStyled>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.logs,
        limit: state.limit,
        loading: state.loading,
        matrixData: state.matrixData,
        vectorData: state.vectorData,
        tableData: state.tableData,
        theme: state.theme,
        isEmptyView: state.isEmptyView,
        isTableView: state.isTableView,
        responseType: state.responseType,
        left: state.left,
        right: state.right,
        leftDataView: state.leftDataView,
        rightDataView: state.rightDataView,
    };
};

export default connect(mapStateToProps)(DataView);
