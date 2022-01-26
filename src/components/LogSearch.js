import React, { Component } from "react";
import Filter from "./Filter";
import LogView from "./LogView";
import { connect } from "react-redux";
import loadLabels from "../actions/loadLabels";
import loadLogs from "../actions/loadLogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import loadLabelValues from "../actions/loadLabelValues";
import { StatusBar } from "./StatusBar";

// here should be the api endpoint selector on a menu
class LogSearch extends Component {
    constructor(props) {
        super(props);
        props.dispatch(loadLabels());
        this.state = {
            start:props.start,
            stop:props.stop,
            limit:props.limit

        }
    }
    // here we contain the filter that has the labels and the searchlogs
    // logView has the man container
    render() {
        return (
            <div className="log-search">
                <StatusBar />
                <ToastContainer />
                <Filter
                    labels={this.props.labels}
                    labelValues={this.props.labelValues}
                    searchLogs={this.searchLogs}
                    searchLabelValues={this.searchLabelValues}
                    start={this.props.start}
                    stop={this.props.stop}
                    limit={this.props.limit}
                />

                <LogView />
            </div>
        );
    }

    searchLogs = (query, time,limit) => {
        console.log(this.state.start,this.state.stop)
        console.log(this.props.start)
        this.props
            .dispatch(loadLogs(query, [this.state.start,this.state.stop], limit))
            ?.catch((error) => {
                toast.error(
                    "Failed to Load Logs from query " + query + "\n" + error
                );
            });
    };
    searchLabelValues = (label, labelList) => {
        this.props
            .dispatch(loadLabelValues(label, labelList))
            ?.catch((error) => {
                toast.error(
                    "Failed To Load Values from Label " + label + "\n" + error
                );
            });
    };
}

const mapStateToProps = (state) => {
    return {
        labels: state.labels,
        labelValues: state.labelValues,
        start: state.start,
        stop: state.stop,
        limit: state.limit
        
    };
};

export default connect(mapStateToProps)(LogSearch);
