import axios from "axios";

function getTimeParsed(time) {
    return time.getTime() + "000000";
}


const getUrlFromType = (apiUrl, type, startNs, stopNs) => {
    if (type === 'metrics') {
        return `${apiUrl}/api/v1/labels`
    } else {
        return `${apiUrl}/loki/api/v1/label?start=${startNs}&end=${stopNs}`
    }
    
  }

export const sendLabels = async (type, apiUrl, start, stop) => {
    const startNs = type === 'metrics' ? start : getTimeParsed(start)
    const stopNs = type === 'metrics' ? stop: getTimeParsed(stop)
    const origin = window.location.origin;
    const headers = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": [
            "Access-Control-Request-Headers",
            "Content-Type",
        ],
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
    };

    const res = await axios
        .get(getUrlFromType(apiUrl,type, startNs, stopNs), options)
        .then((response) => {
            if (response) {
                if (response?.data?.data === []) console.log("no labels found");
                if (response?.data?.data?.length > 0) {
                    const labels = response?.data?.data.sort().map((label) => ({
                        name: label,
                        selected: false,
                        values: [],
                    }));

                    return labels || [];
                }
            } else {
                return [];
            }
        })
        .catch((e) => console.log(e));

    return res;
};
