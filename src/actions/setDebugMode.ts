export default function setDebugMode(debugMode: any) {
    return function (dispatch: Function) {
        dispatch({
            type: "SET_DEBUG_MODE",
            debugMode
        })
    }
}