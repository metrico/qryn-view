export const errorHandler = (url, error, type) => {
    const { request, response } = error;
    console.log(url)
    console.log(error)
    if (response?.statusText) {
        const status = response?.status;
      
        return {
            message: "API " + response.statusText + ", Please adjust API URL",
            status,
            type
        };
    } else if (url && !url.includes(window.location.protocol)) {
    
        return {
            message: "Mixed Content Error, your View should be over same protocol as your API",
            status: 500,
            type
        };
    } else if (request) {
        if(error.stack.includes('Network Error')) {
            return {
                message: "Invalid API URL, please adjust API URL",
                status:500
            }
        }
        return {
            message: "server time out",
            status: response?.status,
            type
        };
    } else if (error.stack.includes("Invalid URL")) {
        return {
            message: "Invalid API URL, please adjust API URL",
            stauts: response?.status,
            type
        };
    } else if (error?.response?.status === 404) {
        return {
            message: "Invalid API URL, please adjust API URL",
            status: response?.status,
            type
        };
    } else {
        if(type==='labels') return;
      
        return {
            message: "something went wrong with request",
            status: response?.status,
            type
        };
    }
};
