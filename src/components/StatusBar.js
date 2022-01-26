/**
 * STATUS BAR
 * - logo
 * - date range picker
 * - api status
 * - api selector
 */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./cloki-logo.png";
import * as moment from "moment";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";
import { setStopTime, setStartTime, setQueryLimit } from "../actions";

export const StatusBar = (props) => {
    const [start, setStart] = useState();
    const onInputChange = (e) => {
        console.log(e);
        console.log(Date.parse(e.target.value));
        setStart(e.target.value);
    };
    return (
        <div className="status-bar">
            <img src={Logo} height="28px" />
            <div className="date-selector">
                <ResponsiveDateTimePickers />
            </div>
        </div>
    );
};

export default function ResponsiveDateTimePickers() {
    const startTs = useSelector((store) => store.start);
    const stopTs = useSelector((store) => store.stop);
    const queryLimit = useSelector((store) => store.limit);
    const dispatch = useDispatch();

    const pickerStyle = {
        display: "flex",
    };

    const pickerMargin = {
        "margin-left": "10px",
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="status-selectors">

                <div className="selector">

                <span className="label">Limit</span>
                <input
                    value={queryLimit}
                    onChange={(newQueryLimit) => {
                        dispatch(setQueryLimit(newQueryLimit.target.value));
                    }}
                />
                </div>
         <div className="selector">     
              <span className="label">Start</span>
                <DateTimePicker
                
                    renderInput={(params) => <TextField {...params} />}
                    value={startTs}
                    onChange={(newStart) => {
                        dispatch(setStartTime(newStart));
                    }}
                />

         </div>
          <div className="selector">
          <span className="label">End</span>
                <DateTimePicker
                  
                    renderInput={(params) => <TextField {...params} />}
                    value={stopTs}
                    onChange={(newStop) => {
                        dispatch(setStopTime(newStop));
                    }}
                />
          </div>
          
            </div>
        </LocalizationProvider>
    );
}
