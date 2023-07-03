import store  from "@ui/store/store"
import { errorHandler, createAlert } from "@ui/store/actions";
import setApiWarning from '@ui/store/actions/setApiWarning';

const errorInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.response.use(
        (response: any) => {
            return response;
        },

        (error: any) => {

            store.dispatch(createAlert({
                type: 'error',
                message: error.message
            }))

            if (error.response) {
                const handler = errorHandler(error)

                if (error?.response?.status === 401) {

                }
                else if (handler.status === 500 && handler.type === 'labels') {

                    if (store.getState().notifications.length < 1 && store.getState().debugMode === true) {
                        store.dispatch(createAlert({
                            type: "error",
                            message: (handler.message + " for " + handler.type || handler.status + handler.type + 'Error')
                        }))
                    }
                }

                else if (handler.status === 404 && handler.type === 'labels') {

                    if (store.getState().notifications.length < 1) {
                        store.dispatch(createAlert({
                            type: "error",
                            message: (handler.message || handler.status + handler.type + 'Error')
                        }))
                    }

                }
                else {

                    if (store.getState().notifications.length < 1) {
                        store.dispatch(createAlert({
                            type: "error",
                            message: (handler.message + " for " + handler.type || handler.status + handler.type + 'Error')
                        }))
                    }
                }
            } else {

          
                // 1- get error by parsing json 

                const error_parsed = JSON.parse(JSON.stringify(error));
                const networkError = {
                    url: error_parsed.config.url,
                    message: error_parsed.message,
                    name: error_parsed.name
                }

                // 2-  
                store.dispatch(setApiWarning({ type: 'labels', message: 'Labels not available', }))
                const { url } = networkError
                
                const apiWarning = store.getState().apiWarning
                if (apiWarning && url.includes('query') &&  store.getState().notifications.length < 1) {
                    apiWarning.num++
                    store.dispatch(createAlert({
                        type: 'error',
                        message: `API not found, please adjust API URL`
                    }))
                } else if( url.includes('labels') && store.getState().notifications.length < 1) {
                    store.dispatch(createAlert({
                        type: 'error',
                        message: 'API not found, please adjust API URL'
                    }))
                }

            }
        }
    );
};
export default errorInterceptor;
