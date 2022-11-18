import store from "../store/store";
const orgInterceptor = (axiosInstance) => {
    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            // Do something before request is sent
            const { orgId } = store.getState();
            if (orgId) {
                config.headers["X-Scope-OrgId"] = orgId;
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
