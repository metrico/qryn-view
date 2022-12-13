export const errorHandler = (error) => {

    const LABELS_URL = "/loki/api/v1/label";
    const QUERY_URL = "/loki/api/v1/query_range";

    const { request, response } = error;
    const url = error?.response?.request?.responseURL


    let type = () => {
        switch(url) {
            case url?.includes(LABELS_URL):
                return 'label';
            case url?.includes(QUERY_URL):
                return 'query'
            default: return 'label'
        }
    }

    if (response?.statusText) {
        const status = response?.status;

        return {
            message: "API " + response.statusText + ", Please adjust API URL",
            status,
            type: type()
        };
    } else if (url && !url.includes(window.location.protocol)) {

        return {
            message: "Mixed Content Error, your View should be over same protocol as your API",
            status: 500,
            type : type()
        };
    } else if (request) {
        if (error.stack.includes('Network Error')) {
            return {
                message: "Invalid API URL, please adjust API URL",
                status: 500,
                type: type()
            }
        }
        return {
            message: "server time out",
            status: response?.status,
            type: type()
        };
    } else if (error?.stack?.includes("Invalid URL")) {
        return {
            message: "Invalid API URL, please adjust API URL",
            stauts: response?.status,
            type: type()
        };
    } else if (error?.response?.status === 404) {
        return {
            message: "Invalid API URL, please adjust API URL",
            status: response?.status,
            type: type()
        };
    } else {
        if (type === 'labels') return;

        return {
            message: "something went wrong with request",
            status: response?.status,
            type: type()
        };
    }
};
