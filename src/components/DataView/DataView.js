import React, { Component } from "react";
import { connect } from "react-redux";

import { DataViewCont, DataViewStyled, Loader } from "./styled";

import ClokiChart from "../../plugins/charts";
import QueryHistory from "../../plugins/queryhistory";
import LogsRow from "./LogsRow";
import EmptyView from "./EmptyView";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { ExampleWrapper } from "./LogsView";
class DataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: props.limit || 100,
            messages: props.messages || [],
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
                        {/* {this.props.messages.length > 0 &&
                        this.getMatrixForChart().length < 1
                            ? this.props.messages.map((message, key) => (
                                  <LogsRow
                                      message={message}
                                      toggleTagsActive={this.toggleTagsActive}
                                      key={key}
                                  />
                              ))
                            : null} */}

                        {this.getMatrixForChart().length > 0 ? (
                            <ClokiChart
                                chartLimit={this.getLimit()}
                                matrixData={this.getMatrixForChart()}
                            />
                        ) : null}

                        {this.props.messages.length > 0 && (
                            <ExampleWrapper messages={this.props.messages} />
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
        start: state.start,
        stop: state.stop,
        limit: state.limit,
        loading: state.loading,
        matrixData: state.matrixData,
        theme: state.theme,
        isEmptyView: state.isEmptyView,
    };
};

export default connect(mapStateToProps)(DataView);
