import React, { useEffect, useState } from 'react'
import getApiStatus from '../actions/getApiStatus';

import loadLabels from '../actions/loadLabels';
import Filter from "./Filter";
import LogView from "./LogView";
import { connect } from "react-redux";
import loadLogs from "../actions/loadLogs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import loadLabelValues from "../actions/loadLabelValues";

const API_ENDPOINT_NAME = 'localhost';
const API_ENDPOINT_VALUE = 'http://localhost:3100';

const api_endpoint= {
    name:API_ENDPOINT_NAME,
    value: API_ENDPOINT_VALUE
}

// add api selection
// take env parameter as default
// or add a new one
// add an api input for adding new api
// LAyout will be the container of the app

// first target: log browser

// items:
export const apiStatus = () => {

    // take from api status handler
}
export const StatusMenu = (props) => {
    // here will have :
    //    - app name
    //    - api selector / if there is more than one
    //    - api status, check once or add a lattency to check
    const {  api_endpoint } = props;
  
    return (
        <div className="status-bar">
            <div className="logo">
                Cloki
            </div>
            <div className="api-status-bar">
                <select name=""
                    id=""
                    className="api-endpoint-selector">
                        <option value={api_endpoint.value}>{api_endpoint.name}</option>
                </select>
                <div className="api-status-signal">
                    <span className="api-signal">

                    </span>
                </div>
            </div>
        </div>
    )
}
const ClokiLayout = (props) => {
 //   const { dispatch } = props;
   // dispatch(getApiStatus())
 // props.dispatch(loadLabels())
    
    return (
        <div className="container">
            <StatusMenu
            
                api_endpoint={api_endpoint}
            />
        </div>
    )

}




const mapStateToProps = (state) => {
    return {
        labels: state.labels,
        labelValues: state.labelValues,
       // apiStatus: state.apiStatus
    };
};

export default connect(mapStateToProps)(ClokiLayout);