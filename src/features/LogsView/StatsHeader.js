
export default function StatsHeader({ commonLabels, lineLimit, lineAmount }) {
    return (<div className={'stats-header'}>
        <span className="common-labels"> common labels: {commonLabels}</span>
        <span className="line-limit">Line Limit: {lineLimit}</span>
        <span className="line-amount">Results: {lineAmount}</span>
    </div>)
};

/**
 * !Stats Header:
 *  
 * ?features:
 *  *common labels
 *  *line limit
 *  *returned elements
 * ?components:
 * *common label
*/