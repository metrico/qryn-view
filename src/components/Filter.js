import React, { Component } from "react";
import moment from "moment";
import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";
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
        const query = buildSelector(this.props.labels);
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
        const query = buildSelector(this.props.labels);
        this.setState({ ...this.state, query });
    };
    onQuerychange = (value) => {
        this.setState({ ...this.state, value });
    };
    
    getValueList() {
        // this will be facetlabels
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
                this.props.limit

            );
        } else {

            console.log("Please make a log query", query);
        }
    };
}

export function buildSelector(labels) {
    const selectedLabels = [];
    for (const label of labels) {
        if (label.selected && label.values && label.values.length > 0) {
            const selectedValues = label.values
                .filter((value) => value.selected)
                .map((value) => value.name);
            if (selectedValues.length > 1) {
                selectedLabels.push(
                    `${label.name}=~"${selectedValues.join("|")}"`
                );
            } else if (selectedValues.length === 1) {
                selectedLabels.push(`${label.name}="${selectedValues[0]}"`);
            }
        }
    }
    return ["{", selectedLabels.join(","), "}"].join("");
}

export function facetLabels(labels, possibleLabels, lastFacetted = null) {
    return labels.map((label) => {
        const possibleValues = possibleLabels[label.name];
        if (possibleValues) {
            let existingValues;
            if (label.name === lastFacetted && label.values) {
                // Facetting this label, show all values
                existingValues = label.values;
            } else {
                // Keep selection in other facets
                const selectedValues = new Set(
                    label.values
                        ?.filter((value) => value.selected)
                        .map((value) => value.name) || []
                );
                // Values for this label have not been requested yet, let's use the facetted ones as the initial values
                existingValues = possibleValues.map((value) => ({
                    name: value,
                    selected: selectedValues.has(value),
                }));
            }
            return {
                ...label,
                loading: false,
                values: existingValues,
                facets: existingValues.length,
            };
        }

        // Label is facetted out, hide all values
        return {
            ...label,
            loading: false,
            hidden: !possibleValues,
            values: undefined,
            facets: 0,
        };
    });
}
