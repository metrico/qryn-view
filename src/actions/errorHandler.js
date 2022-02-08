export const errorHandler = (url, error) => {
    const { request, response } = error;

    if (response?.statusText) {
        const status = response?.status;
        return {
            message: "API " + response.statusText + " Please adjust API URL",
            status,
        };
    } else if (!url.includes(window.location.protocol)) {
        return {
            message: "Mixed Content Error, your View should be over same protocol as your API",
            status: 500,
        };
    } else if (request) {
        if(error.stack.includes('Network Error')) {
            return {
                message: "Invalid API URL, please adjust API URL",status:500
            }
        }
        return {
            message: "server time out",
            status: response?.status,
        };
    } else if (error.stack.includes("Invalid URL")) {
        return {
            message: "Invalid API URL, please adjust API URL",
            stauts: response?.status,
        };
    } else if (error?.response?.status === 404) {
        return {
            message: "Invalid API URL, please adjust API URL",
            status: response?.status,
        };
    } else {
        return {
            message: "something went wrong with request",
            status: response?.status,
        };
    }
};
