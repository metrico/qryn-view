export default function setDebugMode( debugMode) {
    return function (dispatch){
        dispatch({
            type:"SET_DEBUG_MODE",
            debugMode
        })
    }
}