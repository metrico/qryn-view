import React from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    mirrorActors: true,
    actorFontSize: 12,
    messageFontSize: 12,
    noteFontSize: 10,
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: "cardinal" },
});

export default class FlowConfig extends React.Component {
    componentDidMount() {
        mermaid.contentLoaded();
    }
    render() {
        return (
            <div
                className="mermaid"
                style={{
                    overflowY: "auto",
                }}
            >
                {this.props.chart}
            </div>
        );
    }
}
