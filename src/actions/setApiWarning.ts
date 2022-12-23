export default function setApiWarning(apiWarning: any) {
    return function (dispatch: Function) {
        dispatch({
            type: 'SET_API_WARNING',
            apiWarning
        })
    }
}