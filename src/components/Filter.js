import React, { Component } from "react";
import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";
import { queryBuilder } from "../helpers/querybuilder";
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            label: props.label || "",
            labelValues: props.labelValues || [],
            labelValue: "",
            query: "",
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
                    browserActive={this.state.labelsBrowserOpen}
                    onValuesDisplay={this.onValuesDisplay}
                />
                <ValuesList
                    valueHeader={"Filter Labels"}
                    labelList={this.props.labels}
                    valueList={this.props.labelValue}
                    onValueChange={this.onLabelChange}
                    onLabelValueChange={this.onLabelValueChange}
                    labelValue={this.props.labels.length}
                    hidden={this.props.labelsBrowserOpen}
                />
            </div>
        );
    }
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
                this.props.step,
                this.props.apiUrl

            );
        } else {

            console.log("Please make a log query", query);
        }
    };
}



