export default function setResponseType(responseType: any) {
    return function (dispatch: any) {
        dispatch({
            type: "SET_RESPONSE_TYPE",
            responseType
        })
    }
}