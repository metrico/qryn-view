import React, { Component } from "react";
import { connect } from "react-redux";
import { DataViewCont, DataViewStyled, Loader } from "./styled";
import ClokiChart from "../../plugins/charts";
import QueryHistory from "../../plugins/queryhistory";
import EmptyView from "./EmptyView";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { LogRows } from "./LogRows";
import VectorTable from "../VectorTable/VectorTable";

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
            isEmptyView: props.isEmptyView || false,
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
                        {/* { this.props.messages.length > 0 && (
                            <LogRows messages={this.props.messages} />
                        )}
                        {this.getMatrixForChart().length > 0 ? (
                            <ClokiChart
                                chartLimit={this.getLimit()}
                                matrixData={this.getMatrixForChart()}
                            />
                        ) : null} */}

                        {this.props.loading && <Loader />}

                        {this.props.isEmptyView && <EmptyView />}
                        <VectorTable data={this.props.messages} />
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
        theme: state.theme,
        isEmptyView: state.isEmptyView,
    };
};

export default connect(mapStateToProps)(DataView);
