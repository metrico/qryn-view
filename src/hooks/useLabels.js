import axios from "axios";

function getTimeParsed(time) {
    return time.getTime() + "000000";
}
export const sendLabels = async (apiUrl, start, stop) => {

    const startNs = getTimeParsed(start)
    const stopNs = getTimeParsed(stop)
    const origin = window.location.origin;
    const url = apiUrl;
    const headers = {
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
    };

    const res = await axios
        .get(`${url.trim()}/loki/api/v1/label?start=${startNs}&end=${stopNs}`, options)
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
