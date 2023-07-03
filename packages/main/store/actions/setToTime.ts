export default function setToTime(toTime: any) {
    return function (dispatch: Function) {
        dispatch({
            type: "SET_TO_TIME"
        })
    }
}