import React, { Component } from "react";
import { connect } from "react-redux";

import { DataViewCont, DataViewStyled, Loader } from "./styled";

import ClokiChart from "../../plugins/charts";
import QueryHistory from "../../plugins/queryhistory";
import LogsRow from "./LogsRow";
import EmptyView from "./EmptyView";

class DataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: props.limit || 100,
            messages: props.messages || [],
            matrixData: props.matrixData || [],
            loading: false,
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
    };
};

export default connect(mapStateToProps)(DataView);
