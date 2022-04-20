import store from '../store/store'
import { errorHandler, setApiError,createAlert } from "../actions/";

const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            //Response Successful
            return response;
        },
        (error) => {
            console.log("ERROR", error)
             
            if (error?.response?.status === 401) {
                //Unauthorized
                //redirect to Login
            } else {
                const url = error?.response?.config?.url || ""
                console.log(error.response)
                const { message, status, type } = errorHandler(url, error, 'intercepted')

                console.log(message,status,type)
              //  console.log(errorHandler(url, error))
             //     store.dispatch(setApiError(message || status + 'Error'))

                  store.dispatch(createAlert({
                 type:"error",
                 message: (message || status + 'Error')
                 }))
            }
        }
    );
};
export default errorInterceptor;
