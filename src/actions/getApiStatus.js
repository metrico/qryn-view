import { DEV_ENV } from '../environment/env.dev';
import setApiStatus from './setApiStatus'

export default function() {
    return function (dispatch,getState) {
        return new Promise((resolve, reject) => {

            let options = {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'origin': 'http://localhost:3000',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                   // 'Content-Type': 'application/json',
                }
            };

            fetch(`${DEV_ENV.apiUrl}/loki/api/v1/ready`, options
            ).then((response) => {
       
                if ((response?.status >= 200 && response?.status < 300) || response?.status == "success") {

                    return response
                } else {
                    var error = new Error(response.statusText)
               console.log(error)
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {
           
                dispatch(setApiStatus(json.data));

                resolve();
            }).catch((e) => {
                console.log(e)
            
                reject();
            });
        });
    };
    }
