export default function setToTime(toTime){
    return function (dispatch){
        dispatch({
            type:"SET_TO_TIME"
        })
    }
}