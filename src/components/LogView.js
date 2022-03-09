import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { CircularProgress } from "@mui/material";
import * as moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setLabels } from "../actions";
import loadLabelValues from "../actions/loadLabelValues";
import ClokiChart from "../plugins/charts";
import QueryHistory from "../plugins/queryhistory";
import store from "../store/store";
import { queryBuilderWithLabels } from "./LabelBrowser/helpers/querybuilder";

import loadLogs from "../actions/loadLogs";
import styled from "@emotion/styled";

const EmptyViewContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 175px;
    font-size: 1em;
    color: #aaa;
    font-weight: lighter;
    letter-spacing: 1px;
`;
const TAGS_LEVEL = {
    critical: ["emerg", "fatal", "alert", "crit", "critical"],
    error: ["err", "eror", "error", "warning"],
    warning: ["warn", "warning"],
    info: ["info", "information", "notice"],
    debug: ["dbug", "debug"],
    trace: ["trace"],
};
export const ValueTags = (props) => {
    const addLabel = async (e, key, value, isInverted = false) => {
        e.preventDefault();
        e.stopPropagation();
        const { labels, apiUrl } = store.getState();
        const label = labels.find((label) => label.name === key);
        if (label) {
            const labelValue = label.values.find((tag) => tag.name === value);
            if (labelValue?.selected && labelValue.inverted === isInverted) {
                return;
            }
            if (labelValue) {
                labelValue.selected =
                    true || labelValue.inverted !== isInverted;
                labelValue.inverted = !labelValue.inverted && isInverted;
                label.selected = label.values.some((value) => value.selected);
                store.dispatch(setLabels(labels));
            } else {
                await store.dispatch(loadLabelValues(label, labels, apiUrl));
                const updatedLabels = store.getState().labels;
                const updatedLabel = updatedLabels.find(
                    (label) => label.name === key
                );
                const labelValue = updatedLabel.values.find(
                    (tag) => tag.name === value
                );
                labelValue.selected =
                    true || labelValue.inverted !== isInverted;
                labelValue.inverted = !labelValue.inverted && isInverted;
                updatedLabel.selected = updatedLabel.values.some(
                    (value) => value.selected
                );
                store.dispatch(setLabels(updatedLabels));
            }
            queryBuilderWithLabels();

            store.dispatch(loadLogs());
        }
    };
    const getTags = (tags) => {
        return Object.entries(tags).map(([key, value], k) => (
            <div className={"value-tags"} key={k}>
                <span
                    aria-label="Filter for value"
                    title="Filter for value"
                    onClick={(e) => addLabel(e, key, value)}
                    className={"icon"}
                >
                    <ZoomIn color="primary" />
                </span>
                <span
                    aria-label="Filter out value"
                    title="Filter out value"
                    onClick={(e) => addLabel(e, key, value, true)}
                    className={"icon"}
                >
                    <ZoomOut color="primary" />
                </span>

                <span>{key}</span>
                <span>{value}</span>
            </div>
        ));
    };

    return getTags(props.tags);
};
class LogView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitLoad: this.props.limitLoad || false,
            limit: props.limit || 100,
            messages: props.messages || [],
            matrixData: props.matrixData || [],
            loading: false,
        };
    }

    toggleTagsActive(idx) {
        let arrCopy = [...this.props.messages];
        arrCopy.forEach((entry) => {
            if (entry.id === idx) {
                entry.showLabels = entry.showLabels ? false : true;
            }
        });
        this.setState({ ...this.state, logs: arrCopy });
    }
    toggleActiveStyles(idx) {
        return idx.showLabels
            ? "value-tags-container labelsActive"
            : "value-tags-container labelsInactive";
    }
    getMatrixForChart = () => {
        return this.props.matrixData;
    };
    getLimit = () => {
        return this.props.limit;
    };
    onShowTags = (e, value) => {
        e.preventDefault();
        value.showLabels = !value.showLabels;
        const logs = value;
        this.setState({ ...this.state, messages: logs });
    };

    getLogColor = (tags) => {
        if (tags?.["level"]) {
            return Object.keys(TAGS_LEVEL).find((level) =>
                TAGS_LEVEL[level].includes(tags.level.toLowerCase())
            );
        } else {
            return "unknown";
        }
    };
    render() {
        return (
            <div className={"log-view"}>
                <div className={`logs-box`}>
                    {this.props.messages.length > 0 &&
                    this.getMatrixForChart().length < 1
                        ? this.props.messages.map((value, key) => (
                              <div
                                  key={key}
                                  className={`line ${this.getLogColor(
                                      value.tags
                                  )}`}
                                  onClick={(e) =>
                                      this.toggleTagsActive(value.id)
                                  }
                              >
                                  <span
                                      id={value.timestamp}
                                      className={"timestamp"}
                                  >
                                      {this.formatDate(value.timestamp)}
                                  </span>
                                  <span className={"log-line"}>
                                      {value.text}
                                  </span>

                                  {value.tags && (
                                      <div
                                          className={this.toggleActiveStyles(
                                              value
                                          )}
                                      >
                                          <ValueTags tags={value.tags} />
                                      </div>
                                  )}
                              </div>
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
                        !this.props.loading && (
                            <EmptyViewContainer>
                                {
                                    "Please adjust search parameters and click on ‘Show Logs’ button"
                                }
                            </EmptyViewContainer>
                        )}
                    <QueryHistory />
                    {this.props.loading && (
                        <CircularProgress
                            className={"progress"}
                            id={"progress"}
                        />
                    )}
                </div>
            </div>
        );
    }

    formatDate = (timestamp) => {
        return moment(parseInt(timestamp)).format(
            "YYYY-MM-DD HH:mm:ss.SSS UTC"
        );
    };
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

export default connect(mapStateToProps)(LogView);
