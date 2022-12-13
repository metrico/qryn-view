export default function setApiWarning(apiWarning){
    return function(dispatch){
        dispatch({
            type:'SET_API_WARNING',
            apiWarning
        })
    }
}