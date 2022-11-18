import store from "../store/store";
const orgInterceptor = (axiosInstance) => {
    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // Do something before request is sent
            const { org } = store.getState();
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
