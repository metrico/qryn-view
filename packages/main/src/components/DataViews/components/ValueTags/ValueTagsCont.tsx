import ValueTags from "./ValueTags";
import { useState, useEffect } from "react";
import { MetricsChart } from "./MetricsChart";

/**
 *
 * @param props
 * @returns Container for valueTags
 */

// this is the container for the labels inside each logs row

export const KeyMetricLabels = {
    webVitals: "page",
    httpRequest: "type",
};

export const formatKeyLabels = (tags) => {
    return { [KeyMetricLabels[tags.job]]: tags[KeyMetricLabels[tags.job]] };
};

export function ValueTagsCont(props: any) {
    const { onValueTagsClick, showLabels, tags, actQuery } = props;
    const [logMetrics, setLogMetrics] = useState([]);

    useEffect(() => {
        if (tags?.metricName && tags?.metricLabel && showLabels) {
            const url = constructRequestFromTags(tags.metricName, [
                tags.metricLabel,
                tags[tags.metricLabel],
            ]);

            const fetchMetrics = async () =>
                await fetch(url)
                    .then((data) => data.json())
                    .then((res) => {
                        setLogMetrics(res.data.result);
                    });

            fetchMetrics();
        }
    }, [tags]);

    console.log(logMetrics, tags.hasMetrics);
    if (showLabels) {
        return (
            <div className="value-tags-container">
                <div
                    className="value-tags-close"
                    onClick={onValueTagsClick}
                ></div>
                {logMetrics?.length > 0 &&
                    tags?.metricName &&
                    tags?.metricLabel && (
                        <MetricsChart
                            metricsData={logMetrics}
                            title={`${tags.metricName} ${tags.metricLabel}=${tags[tags.metricLabel]}`}
                        />
                    )}
                <ValueTags {...props} tags={tags} actQuery={actQuery} />
            </div>
        );
    }
    return null;
}
// we could rebuild this with the relevant tags for each

export function constructRequestFromTags(name, [key, val]) {
    // Extract relevant properties from tags
    //const { name, page } = tags;

    // Base URL

    const baseUrl =window.location.protocol + "//" +  window.location.host + "/api/v1/query_range";

    // Construct query parameter
    const query = encodeURIComponent(`${name}{${key}="${val}"}`);

    // Time parameters
    const end = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const start = end - 24 * 60 * 60; // 24 hours ago

    // Other parameters
    const limit = 100;
    const step = 1;
    const direction = "backwards";

    // Construct the full URL
    const url = `${baseUrl}?query=${query}&limit=${limit}&start=${start}&end=${end}&step=${step}&direction=${direction}`;

    return url;
}
