import axios from "axios";
import store from "../store/store";

function getTimeParsed(time) {
    return time.getTime() + "000000";
}

const getUrlFromType = (apiUrl, type, startNs, stopNs) => {
    if (type === "metrics") {
        return `${apiUrl}/api/v1/labels`;
    } else {
        return `${apiUrl}/loki/api/v1/label?start=${startNs}&end=${stopNs}`;
    }
};

export const sendLabels = async (id, type, apiUrl, start, stop) => {
    const { dataSources } = store.getState();

    const actDataSource = dataSources.find((f) => f.id === id);

    const basicAuth = actDataSource?.auth?.basicAuth.value;

    let auth = {};

    let labelHeaders = {};

    if (basicAuth) {
        const authfields = actDataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }

        labelHeaders.auth = auth;
    }

    const startNs = type === "metrics" ? start : getTimeParsed(start);
    const stopNs = type === "metrics" ? stop : getTimeParsed(stop);
    const headers = {
        "Content-Type": "application/json",
    };

    // add auth fields

    const options = {
        method: "GET",
        headers: headers,
    };

    labelHeaders.options = options;
 
    if (type !== "flux" && labelHeaders) {
        const res = await axios
            .get(getUrlFromType(apiUrl, type, startNs, stopNs), labelHeaders)
            .then((response) => {
                if (response) {
     
                    if (response?.data?.data === [])
                
                    if (response?.data?.data?.length > 0) {
                        const labels = response?.data?.data
                            .sort()
                            .map((label) => ({
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
            .catch((e) => {
                console.log("error from useLabels");
                console.log(e);
            });

        return res;
    }

    // const url = 'https://gigapipe.qryn.cloud/loki/api/v1/label';
    // const options = {
    //   headers: {
    //     method:'GET',
    //     'Content-Type': 'application/json';
    //   },
    // };
    // const req = await axios
    //   .get(url, { auth: { username: 'gigapipe', password: '' },options})
    //   .then((data) => {
    //     console.log(data);
    //    // return data
    //   });
    //   req.then(data=> {console.log(data)})
    //  // return req
};
