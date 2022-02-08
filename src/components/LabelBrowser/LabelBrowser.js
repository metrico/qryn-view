import React, { Component } from "react";
import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";
import { queryBuilder } from "./helpers/querybuilder";


export default class LabelBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
        };

    }

    render() {
        return (
            <div>
     
                <QueryBar
                    className="query-bar-placeholder"
                    query={this.state.query}
                    onSubmit={this.onSubmit}
                    browserActive={this.state.labelsBrowserOpen}
                />
                <ValuesList
                    labelList={this.props.labels}
                    onValueChange={this.onLabelChange}
                    onLabelValueChange={this.onLabelValueChange}
                />
            </div>
        );
    }
 
    onLabelChange = (value) => {
        const query = queryBuilder(this.props.labels);
        this.setState({ ...this.state, query });
        this.props.searchLabelValues(value, this.props.labels);
    };

    onLabelValueChange = (value) => {
        const labelValue = value
        this.setState({...this.state ,labelValue})
        const query = queryBuilder(this.props.labels);
        this.setState({ ...this.state, query });
    };
    

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

