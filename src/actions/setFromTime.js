export default function setFromTime(toTime){
    return function (dispatch){
        dispatch({
            type:"SET_FROM_TIME",
            toTime
        })
    }
}