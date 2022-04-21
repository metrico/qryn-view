import store from '../store/store'
import { errorHandler, setApiError, createAlert } from "../actions/";
import setApiWarning from '../actions/setApiWarning';

const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {

            return response;
        },

        (error) => {

            if (error.response) {
                const handler = errorHandler(error)
                if (error?.response?.status === 401) {
             
                } 
                if (handler.status === 500 && handler.type === 'labels') {

                }
                else {
                    store.dispatch(createAlert({
                        type: "error",
                        message: (handler.message + " for " + handler.type || status + handler.type + 'Error')
                    }))

                }
            } else {

                const error_parsed = JSON.parse(JSON.stringify(error));
                const networkError = {
                    url: error_parsed.config.url,
                    message: error_parsed.message,
                    name: error_parsed.name
                }

                store.dispatch(setApiWarning({ type: 'labels', message: 'Labels not available', }))
                const{url,message,name} = networkError

                const apiWarning = store.getState().apiWarning
                if(apiWarning && url.includes('query') ) {
                    apiWarning.num ++
                    store.dispatch(createAlert({
                        type:'error',
                        message: `API not found, please adjust API URL`
                    }))
                }

            }

        


        }
    );
};
export default errorInterceptor;
