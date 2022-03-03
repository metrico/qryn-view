import store from '../store/store'
import { errorHandler, setApiError } from "../actions/";
const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            //Response Successful
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                //Unauthorized
                //redirect to Login
            } else {
                const url = error?.response?.config?.url || ""
                const {message,status} = errorHandler(url, error)
                store.dispatch(setApiError(message || status + 'Error'))
            }
        }
    );
};
export default errorInterceptor;
