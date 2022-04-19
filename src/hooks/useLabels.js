
import axios from "axios";
export const sendLabels = async (apiUrl) => {
  const origin = window.location.origin;
  const url = apiUrl;
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": [
      "Access-Control-Request-Headers",
      "Content-Type",
    ],
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
    mode: "cors",
  };

 const res = await axios
    .get(`${url.trim()}/loki/api/v1/labels`, options)
    .then((response) => {
      if (response) {
        if (response?.data?.data === []) console.log("no labels found");
        if (response?.data?.data?.length > 0) {
          const labels = response?.data?.data.sort().map((label) => ({
            name: label,
            selected: false,
            values: [],
          }));

      
          return labels || []
        
        }
      } else {
    
        return []
      }
    })
    .catch((e) => console.log(e));

return res 

};

