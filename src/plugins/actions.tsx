export const setPlugins = (plugins:any) => (dispatch:Function) => {
    dispatch({
        type: "SET_PLUGINS",
        plugins
    })
}
