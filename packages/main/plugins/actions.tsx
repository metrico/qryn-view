
export const setPlugins = (plugins:any) => (dispatch:any):void => {
    dispatch({
        type: "SET_PLUGINS",
        plugins
    })
}
