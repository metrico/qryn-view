import React, { Component } from "react";
import Filter from "./Filter";
import LogView from "./LogView";
import { connect } from "react-redux";
import loadLabels from "../actions/LoadLabels";
import loadLogs from "../actions/loadLogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import loadLabelValues from "../actions/loadLabelValues";
import { StatusBar } from "./StatusBar";
import { setStartTime, setStopTime } from "../actions"

// here should be the api endpoint selector on a menu
class LogSearch extends Component {
    constructor(props) {
        super(props);
        props.dispatch(loadLabels());
        this.state = {
            ...props
        }
    }
    render() {
        return (
            <div className="log-search">
                <StatusBar
                    dateRangeChange={this.dateRangeChange}
                />
                <ToastContainer />
                <Filter
                    {...this.props}
                    searchLogs={this.searchLogs}
                    searchLabelValues={this.searchLabelValues}
                />

                <LogView />
            </div>
        );
    }

    searchLogs = (query, time, limit, step) => {

        this.props
            .dispatch(loadLogs(query, time, limit, step))
            ?.catch((error) => {
                toast.error(
                    "Failed to Load Logs from query " + query + "\n" + error
                );
            });
    };
    dateRangeChange = ([start, stop]) => {
        this.props.dispatch(setStartTime(start));
        this.props.dispatch(setStopTime(stop));
    }
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
       ...state

    };
};

export default connect(mapStateToProps)(LogSearch);
