import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import moment from "moment";
import LowLight from "react-lowlight";
import json from 'highlight.js/lib/languages/json'

export const ValueTags = (props) => {

    const getTags = (tags) => {
        return Object.entries(tags).map(
            ([key, value], k) => (
                <div className="value-tags" key={k}>
                    <span>{key}</span>
                    <span>{value}</span>
                </div>
            )
        )
    }

    return getTags(props.tags)

}
class LogView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            limitLoad: this.props.limitLoad || this.LOAD_LIMIT,
            limit: props.limit || 100,
            messages:props.messages||[],
            loading:false
        }
     

    }
    onTagsShow = (show) => {
        return (show ? {
            display: 'flex'
        } : { display: 'none' })
    }
    render() {
        LowLight.registerLanguage('js', json)
        return (
            <div className="log-view">
                <div className="logs-box">



                
                {this.getLogs() && this.getLogs().map((value, key) => (
                    <div
                        key={key}
                        className="line"
                        onClick={e => this.onShowTags(value)}

                    >
                        <span id={value.timestamp} className="timestamp">
                            {this.formatDate(value.timestamp)}{" "}
                        </span>

                        <LowLight language='js' value={value.text} />

                        {value.tags && (
                            <div className="value-tags-container"
                                style={this.onTagsShow(value.showLabels)}
                            >
                                <ValueTags
                                    tags={value.tags}
                                />


                            </div>
                        )}
                    </div>
                ))}

                {this.getLogs().length > 0 && this.state.limitLoad  && this.state.messages > this.state.limit && (
                    <Button
                        className="load-all"
                        onClick={() =>
                            this.setState({...this.state,limitLoad:false})
                        }
                    >
                        Load all
                    </Button>
                )}
                {this.props.loading && (
                    <CircularProgress
                        className="progress"
                        id="progress"
                    />
                )}
                </div>
            </div>
        );
    }

    getLogs = () => {
        if (this.state.limitLoad ) {
            return this.prop?.messages
                ?.slice(
                    this.props.messages.length - this.state.limit,
                    this.props.messages.length
                )
                .reverse();
        } else {
            return this.props.messages.reverse();
        }
    };

    onShowTags = (value) => {
        const logs = value
        this.setState({ ...this.state, logs })
        value.showLabels = !value.showLabels;
    }

    formatDate = (timestamp) => {
        return moment(timestamp).format("YYYY-MM-DD HH:mm:ss UTC");
    };
}

const mapStateToProps = (state) => {
    return {
        messages: state.logs.messages,
        start: state.start,
        stop: state.stop,
        limit: state.limit,
        loading: state.loading,
    };
};

export default connect(mapStateToProps)(LogView);
