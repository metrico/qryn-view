/**
 * STATUS BAR
 * - logo
 * - date range picker
 * - api status
 * - api selector
 */
import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/cloki-logo.png";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";


import { setStopTime, setStartTime, setQueryLimit } from "../actions";
import { DateRangePicker } from "../plugins/daterangepicker";
import isDate from "date-fns/isDate";

export const StatusBar = (props) => {

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
    const [open,setOpen] = useState(false)
    const handleInputClick = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
    const handleInputChange = (e,type) => {
        e.preventDefault()
        const value = e.target.value
        if(isDate(value)) {
            dispatch([type](value))
        }
    }
    const initialDateRange = () => {
        if(isDate(startTs) && isDate(stopTs)){
            return {dateStart:startTs, dateEnd:stopTs}
        } 
    }
    const isOpen = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
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
         <div className="selector"  >     
              <span className="label">Start</span>
                <DateTimePicker
                
                    renderInput={(params) => <TextField onClick={handleInputClick} 
                    onChange={ e => { handleInputChange(e,'setStartTime')} }
                    {...params} />}
                    value={startTs}
                    onChange={(newStart) => {
                       if(isDate(newStart)) dispatch(setStartTime(newStart));
                    }}
                />

         </div>
          <div className="selector">
          <span className="label">End</span>
                <DateTimePicker
                    renderInput={(params) => <TextField
                        onChange={ e => { handleInputChange(e,'setStopTime')} }
                        onClick={handleInputClick} {...params} 
                        
                        />}
                    value={stopTs}
                    onChange={(newStop) => {
                        if(isDate(newStop)) dispatch(setStopTime(newStop));
                    }}
                />
          </div>

    
            </div>
            <DateRangePicker
                    open={open}
                    isOpen={isOpen}
                    initialDateRange={initialDateRange()}
                    onChange={({dateStart,dateEnd}) => {
                        if(isDate(dateStart)) dispatch(setStartTime(dateStart))
                        if(isDate(dateEnd)) dispatch(setStopTime(dateEnd))
                    }}
                />
        </LocalizationProvider>
    );
}
