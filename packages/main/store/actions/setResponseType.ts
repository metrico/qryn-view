export default function setResponseType(responseType: any) {
    return function (dispatch: Function) {
        dispatch({
            type: "SET_RESPONSE_TYPE",
            responseType
        })
    }
}