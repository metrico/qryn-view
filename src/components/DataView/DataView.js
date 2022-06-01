import React, { Component } from "react";
import { connect } from "react-redux";
import { DataViewCont, DataViewStyled, Loader } from "./styled";
import ClokiChart from "../../plugins/charts";
import QueryHistory from "../../plugins/queryhistory";
import EmptyView from "./EmptyView";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { LogRows } from "./LogRows";
import { VectorTable } from "../VectorTable/VectorTable";

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
        };
    }

    getMatrixForChart = () => {
        return this.props.matrixData;
    };

    getLimit = () => {
        return this.props.limit;
    };

    render() {
        return (
            <ThemeProvider theme={themes[this.props.theme]}>
                <DataViewStyled>
                    <DataViewCont>
                        {this.props.messages.length > 0 && this.props.isTableView && (
                            <LogRows messages={this.props.messages} />
                        )}
                        {this.getMatrixForChart().length > 0 && this.props.isTableView ? (
                            <ClokiChart
                                chartLimit={this.getLimit()}
                                matrixData={this.getMatrixForChart()}
                            />
                        ) : null}

                        {this.props.loading && <Loader />}

                        {this.props.isEmptyView && <EmptyView />}
                        {this.props.vectorData?.dataRows?.length > 0 &&
                            !this.props.isEmptyView && (
                                <VectorTable data={this.props.vectorData} />
                            )}
                        {this.props.tableData && !this.props.isTableView && <VectorTable data={this.props.tableData}/>}

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
    };
};

export default connect(mapStateToProps)(DataView);
