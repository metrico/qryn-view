import React, { Component } from "react";
import moment from "moment";
import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";
import { queryBuilder } from "../helpers/querybuilder";
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label || "",
            labelValues: props.labelValues || [],
            start: props.start,
            stop: props.stop,
            endpoint: "", // this is actually api endpoint to make the call
            labelValue: "",
            query: "",
            listDisplay: false,
            open: true,
            dateRange: [props.start, props.stop],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
     
                <QueryBar
                    className="query-bar-placeholder"
                    query={this.state.query}
                    onSubmit={this.onSubmit}
                    onQuerychange={this.onQuerychange}
                    browserActive={this.state.listDisplay}
                    onValuesDisplay={this.onValuesDisplay}
                />
                <ValuesList
                    valueHeader={"Filter Labels"}
                    labelList={this.props.labels}
                    valueList={this.props.labelValue}
                    onValueChange={this.onLabelChange}
                    onLabelValueChange={this.onLabelValueChange}
                    labelValue={this.props.labels.length}
                    hidden={this.state.listDisplay}
                />
            </div>
        );
    }

    onValuesDisplay = (e) => {
        const listDisplay = !this.state.listDisplay;
        this.setState({ ...this.state, listDisplay });
    };
    handleChange(state, value) {
        this.setState({ [state]: value });
    }
 
    onLabelChange = (value) => {
        this.handleChange("label", value);
        this.getValueList();
        const query = queryBuilder(this.props.labels);
        this.setState({ ...this.state, query });
        this.props.searchLabelValues(value, this.props.labels);
    };
    onEndpointChange = (event) => {
        event.preventDefault();
        this.handleChange("endpoint", event.target.value);
    };

    onYearChange = (value) => {
        this.setState({ ...this.state, year: value });
    };

    onMonthChange = (value) => {
        this.setState({
            ...this.state,
            month: moment().month(value).format("M"),
        });
    };
    onLabelValueChange = (value) => {
        this.handleChange("labelValue", value);
        const query = queryBuilder(this.props.labels);
        this.setState({ ...this.state, query });
    };
    onQuerychange = (value) => {
        this.setState({ ...this.state, value });
    };
    
    getValueList() {
        const lB = this.state.labelValues;
        if (lB?.length > 0) {
            return lB.sort();
        } else return [];
    }

    onSubmit = (event) => {
        const query = event; 
        this.setState({ ...this.state, query });
      
        if (query !== "{}" || query !== "") {
            this.props.searchLogs(
                query,
                [this.props.start, this.props.stop],
                this.props.limit,
                this.props.step

            );
        } else {

            console.log("Please make a log query", query);
        }
    };
}



