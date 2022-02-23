import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";
import * as moment from "moment";
import store from "../store/store"
import { IconButton } from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { setLabels } from "../actions";
import { queryBuilderWithLabels } from "./LabelBrowser/helpers/querybuilder";
import loadLabelValues from '../actions/loadLabelValues';
const TAGS_LEVEL = {
    critical: ['emerg', 'fatal', 'alert', 'crit', 'critical'],
    error: ['err', 'eror', 'error', 'warning'],
    warning: ['warn', 'warning'],
    info: ['info', 'information', 'notice'],
    debug: ['dbug', 'debug'],
    trace: ['trace']
}
export const ValueTags = (props) => {
    const addLabel = async (e, key, value, isInverted = false) => {
        e.preventDefault();
        e.stopPropagation();
        const {labels, apiUrl} = store.getState();
        const label = labels.find(label => label.name === key);
        if (label) {
            const labelValue = label.values.find(tag => tag.name === value);
            if (labelValue) {
                labelValue.selected = !labelValue.selected || (labelValue.inverted !== isInverted);
                labelValue.inverted = !labelValue.inverted && isInverted;
                label.selected = label.values.some(value => value.selected);
                store.dispatch(setLabels(labels));
                queryBuilderWithLabels()
            } else {
                await store.dispatch(loadLabelValues(label,labels,apiUrl));
                const updatedLabels = store.getState().labels;
                const updatedLabel = updatedLabels.find(label => label.name === key);
                const labelValue = updatedLabel.values.find(tag => tag.name === value);
                labelValue.selected = !labelValue.selected || (labelValue.inverted !== isInverted);
                labelValue.inverted = !labelValue.inverted && isInverted;
                updatedLabel.selected = updatedLabel.values.some(value => value.selected);
                store.dispatch(setLabels(updatedLabels));
                queryBuilderWithLabels()
            }
        }
    }
    const getTags = (tags) => {
        return Object.entries(tags).map(
            ([key, value], k) => (
                <div className={"value-tags"} key={k}>
                    <IconButton  onClick={(e) => addLabel(e, key, value)} aria-label="Filter for value" size="small" color="primary">
                        <ZoomIn />
                    </IconButton>
                    <IconButton  onClick={(e) => addLabel(e, key, value, true)} aria-label="Filter out value" size="small" color="primary">
                        <ZoomOut />
                    </IconButton>
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
            <div className={"log-view"}>
                <div className={`logs-box`}>
                    {this.getLogs() && this.getLogs().map((value, key) => (
                        <div
                            key={key}
                            className={`line ${this.getLogColor(value.tags)}`}
                            onClick={e => this.onShowTags(e, value)}
                        >
                            <span id={value.timestamp} className={"timestamp"}>
                                {this.formatDate(value.timestamp)}
                            </span>
                            <span className={"log-line"}>{value.text}</span>

                            {value.tags && (
                                <div className={"value-tags-container"}
                                    style={this.onTagsShow(value.showLabels)}
                                >
                                    <ValueTags
                                        tags={value.tags}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    {this.getLogs().length < 1 && (
                        <div
                        style={{
                            color:"white",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            width:"100%",
                            height:"175px"
                        }}
                        >
                            <span
                            style={{
                                fontSize:"1em",
                                color:"#aaa",
                                fontWeight:"lighter",
                                letterSpacing:"1px"
                            }}
                            >
                            Please Adjust Search Parameters and Click on Show Logs 
                            </span>
                        
                            </div>
                    )}
                    {this.props.loading && (
                        <CircularProgress
                            className={"progress"}
                            id={"progress"}
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
        messages: state.logs,
        start: state.start,
        stop: state.stop,
        limit: state.limit,
        loading: state.loading,
    };
};

export default connect(mapStateToProps)(LogView);
