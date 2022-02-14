import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import moment from "moment";

const TAGS_LEVEL = {
    critical: ['emerg', 'fatal', 'alert', 'crit', 'critical'],
    error: ['err', 'eror', 'error', 'warning'],
    warning: ['warn', 'warning'],
    info: ['info', 'information', 'notice'],
    debug: ['dbug', 'debug'],
    trace: ['trace']
}
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
            limitLoad: this.props.limitLoad || false,
            limit: props.limit || 100,
            messages: props.messages || [],
            loading: false
        }


    }
    onTagsShow = (show) => {
        return (show ? {
            display: 'flex'
        } : { display: 'none' })
    }

    onShowTags = (e, value) => {
        e.preventDefault()
        value.showLabels = !value.showLabels;
        const logs = value
        this.setState({ ...this.state, logs })
    }

    getLogColor = (tags) => {
        if (tags?.['level']) {
            return Object.keys(TAGS_LEVEL).find(level => TAGS_LEVEL[level].includes((tags.level).toLowerCase()))

        } else { return 'unknown' }

    }
    render() {

        return (
            <div className="log-view">
                <div className={`logs-box`}>
                    {this.getLogs() && this.getLogs().map((value, key) => (
                        <div
                            key={key}
                            className={`line ${this.getLogColor(value.tags)}`}
                            onClick={e => this.onShowTags(e, value)}
                        >
                            <span id={value.timestamp} className="timestamp">
                                {this.formatDate(value.timestamp)}
                            </span>
                            <span className="log-line">{value.text}</span>

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

            return this.props.messages?.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);
        
    };

    formatDate = (timestamp) => {
        return moment(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss.SSS UTC");
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