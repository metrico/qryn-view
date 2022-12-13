export default function setDirection(direction: any) {
return function (dispatch: Function) {
    dispatch({
        type:"SET_DIRECTION",
        direction
    })
}
}