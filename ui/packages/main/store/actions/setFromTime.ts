export default function setFromTime(toTime: any){
    return function (dispatch: Function){
        dispatch({
            type:"SET_FROM_TIME",
            toTime
        })
    }
}