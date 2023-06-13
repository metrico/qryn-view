import axios from "axios";
import { createAlert } from "../actions";
import { getDsHeaders } from "../components/DataViews/components/QueryBuilder/helpers";
import { notificationTypes } from "../qryn-ui/notifications/consts";
import store from "../store/store";

function getTimeParsed(time: Date) {
    return time.getTime() + "000000";
}

const getUrlFromType = (
    apiUrl: string,
    type: string,
    startNs: string,
    stopNs: string
) => {
    if (type === "metrics") {
        return `${apiUrl}/api/v1/labels`;
    } else {
        return `${apiUrl}/loki/api/v1/label?start=${startNs}&end=${stopNs}`;
    }
};

export const sendLabels = async (
    id: string,
    type: string,
    apiUrl: string,
    start: any,
    stop: any
) => {
    const { dataSources } = store.getState();

    const actDataSource = dataSources.find((f: any) => f.id === id);

    const basicAuth = actDataSource?.auth?.basicAuth.value;

    const auth: any = {};

    const labelHeaders: any = {};

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
    const extraheaders = getDsHeaders(actDataSource);
    const headers = {
        ...extraheaders,
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
    };

    labelHeaders.options = options;
    labelHeaders.headers = headers;

    if (type !== "flux" && type !== "traces" && labelHeaders && apiUrl) {
        const res = await axios
            .get(getUrlFromType(apiUrl, type, startNs, stopNs), labelHeaders)
            .then((response: any) => {
                if (response) {
                    if (response?.data?.data?.length === 0) {
                        console.log("no labels found");
                    }

                    if (response?.data?.data?.length > 0) {
                        const labels = response?.data?.data
                            
                            .map((label: any) => ({
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
                let errorMsg = "";
                if (e.response) {
                    errorMsg = "Error " + e.response.status + "at Labels ";
                } else if (e.request) {
                    errorMsg = e.request;
                } else {
                    errorMsg = e.message;
                }
                console.log("error requesting labels");
                console.log(e);

                store.dispatch(
                    createAlert({
                        type: notificationTypes.error,
                        message: errorMsg,
                    })
                );
            });

        return res;
    }
    return [];
};
