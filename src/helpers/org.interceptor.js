import store from "../store/store";
import { errorHandler, createAlert } from "../actions";
import setApiWarning from "../actions/setApiWarning";
import { AxiosInstance } from "axios";
const orgInterceptor = (axiosInstance) => {
    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // Do something before request is sent
            const { org } = store.getState();
            console.log(org)
            if (org) {
                config.headers["X-Scope-OrgID"] = org;
            }
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );
};
export default orgInterceptor;
// export default null
