import { environment } from "../environment/env.dev";
import setLabels from "./setLabels";

// gets the labels from api
export default function () {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
         
            headers.append("Origin", "http://localhost:8080/");
            headers.append("Access-Control-Allow-Origin","*")
            headers.append("Access-Control-Request-Method", "GET");
            headers.append("Access-Control-Request-Headers","Content-Type")
        
            const options = {
                method: "GET",
                headers:headers,
                mode: "cors",
               
            };
try{
 
    fetch(`http://localhost:3100/loki/api/v1/labels`, options)
    .then((response) => {

        if (
            (response.status >= 200 && response.status < 300) ||
            response.status === "success"
        ) {
            return response;
        } else {
            console.log(response)
           var error = new Error(response.statusText);
            error.response = response;
            console.log(typeof response)
           throw error;
        }
    })
    .then((response) => {
     
        return response.json();
    })
    .then((json) => {
        if (json.data.length > 0) {
            const labels = json?.data.map((label) => ({
                name: label,
                selected: false,
                loading: false,
                values: [],
                hidden: false,
                facets: 0,
            }));
            labels && dispatch(setLabels(labels || []));
        }

        resolve();
    })
    .catch((e) => {
        console.log(e);
        reject();
    });
}catch(e) {
    console.log(e.error)
}
       
        });
    };
}
