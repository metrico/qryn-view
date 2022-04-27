import React, { Component } from "react";
import { connect } from "react-redux";

import { DataViewCont, DataViewStyled, Loader } from "./styled";

import ClokiChart from "../../plugins/charts";
import QueryHistory from "../../plugins/queryhistory";
import LogsRow from "./LogsRow";
import EmptyView from "./EmptyView";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
class DataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: props.limit || 100,
            messages: props.messages || [],
            matrixData: props.matrixData || [],
            loading: false,
            theme: props.theme,
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
                        {this.props.messages.length > 0 &&
                        this.getMatrixForChart().length < 1
                            ? this.props.messages.map((message, key) => (
                                  <LogsRow
                                      message={message}
                                      toggleTagsActive={this.toggleTagsActive}
                                      key={key}
                                  />
                              ))
                            : null}

                        {this.getMatrixForChart().length > 0 ? (
                            <ClokiChart
                                chartLimit={this.getLimit()}
                                matrixData={this.getMatrixForChart()}
                            />
                        ) : null}
                        {this.props.messages.length < 1 &&
                            this.getMatrixForChart().length < 1 &&
                            !this.props.loading && <EmptyView />}
                        <QueryHistory />
                        {this.props.loading && <Loader />}
                    </DataViewCont>
                </DataViewStyled>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.logs,
        start: state.start,
        stop: state.stop,
        limit: state.limit,
        loading: state.loading,
        matrixData: state.matrixData,
        theme: state.theme,
    };
};

export default connect(mapStateToProps)(DataView);
