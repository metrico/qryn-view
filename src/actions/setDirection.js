export default function setDirection(direction) {
return function (dispatch) {
    dispatch({
        type:"SET_DIRECTION",
        direction
    })
}
}