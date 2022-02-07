import React, { Component } from "react";
import Filter from "./Filter";
import LogView from "./LogView";
import { connect } from "react-redux";
import loadLabels from "../actions/LoadLabels";
import loadLogs from "../actions/loadLogs";
import loadLabelValues from "../actions/loadLabelValues";
import { StatusBar } from "./StatusBar";
import { setStartTime, setStopTime } from "../actions"
import {environment} from '../environment/env.dev'
import { setApiUrl } from "../actions/setApiUrl";

class LogSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            apiUrl: environment.apiUrl
           
        }
        
        props.dispatch(setApiUrl(this.state.apiUrl))
        props.dispatch(loadLabels(this.state.apiUrl));
    }
  
    render() {
        return (
            <div className="log-search">
                <StatusBar
                    dateRangeChange={this.dateRangeChange}
                />
   
                <Filter
                    {...this.props}
                    searchLogs={this.searchLogs}
                    searchLabelValues={this.searchLabelValues}
                />

                <LogView />
            </div>
        );
    }

    searchLogs = (query, time, limit, step, apiUrl) => {

        this.props
            .dispatch(loadLogs(query, time, limit, step,apiUrl))
            ?.catch((error) => {
              console.log(error)
            });
    };
    dateRangeChange = ([start, stop]) => {
        this.props.dispatch(setStartTime(start));
        this.props.dispatch(setStopTime(stop));
    }
    searchLabelValues = (label, labelList) => {
        this.props
            .dispatch(loadLabelValues(label, labelList,this.props.apiUrl))
            ?.catch((error) => {
          console.log(error)
            });
    };
}

const mapStateToProps = (state) => {
    return {
       ...state

    };
};

export default connect(mapStateToProps)(LogSearch);
