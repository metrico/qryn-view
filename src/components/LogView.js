import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress } from "react-md";
import moment from "moment";
import LowLight from "react-lowlight";
import json from 'highlight.js/lib/languages/json'

class LogView extends Component {
    static LOAD_LIMIT = 100;

    state = {
        limitLoad: true,
    };
    render() {
        LowLight.registerLanguage('js', json)
        return (
            <div className={"log-view"}>
              
                {this.getLogs().map((value, key) => (
                    <div
                        key={key}
                        className="line"
                        onClick={ e => {this.onShowTags(value)} }
                        
                    >
                        <span id={value.timestamp} className="timestamp">
                            {this.formatDate(value.timestamp)}{" "}
                        </span>

                        <LowLight language='js' value={value.text} />
                        {value.tags && value.showTags && (
                            <div className="value-tags-container">
                          
                   
                                {value.tags &&
                                    value.showTags &&
                                    Object.entries(value.tags).map(
                                        ([key, value], k) => (
                                            <div className="value-tags" key={k}>
                                                <span>{key}</span>
                                                <span>{value}</span>
                                            </div>
                                        )
                                    )}
                            </div>
                        )}
                    </div>
                ))}

                {this.getLogs().length > 0 && this.state.limitLoad && (
                    <Button
                        className="load-all"
                        raised="true"
                        theme="primary"
                        onClick={() =>
                            this.setState({ ...this.state, limitLoad: false })
                        }
                    >
                        Load all
                    </Button>
                )}
                {this.props.loading && (
                    <CircularProgress
                        className="progress"
                        scale={10}
                        id="progress"
                    />
                )}
            </div>
        );
    }

    getLogs = () => {
        // subscribe to changes into lines

        if (this.state.limitLoad) {
            return this.props?.messages
                ?.slice(
                    this.props.messages.length - LogView.LOAD_LIMIT,
                    this.props.messages.length
                )
                .reverse();
        } else {
            return this.props.messages.reverse();
        }
    };

    onShowTags = (log) => {

        return log.showTags = !log.showTags;
    }

    formatDate = (timestamp) => {
        return moment(timestamp).format("YYYY-MM-DD HH:mm:ss UTC");
    };
}

const mapStateToProps = (state) => {
    return {
        messages: state.logs.messages,
        loading: state.loading,
    };
};

export default connect(mapStateToProps)(LogView);
