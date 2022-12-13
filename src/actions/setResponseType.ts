export default function setResponseType( responseType) {
    return function (dispatch){
        dispatch({
            type:"SET_RESPONSE_TYPE",
            responseType
        })
    }
}