 export const setPanelsData = (panels: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_PANELS_DATA',
        panels
    })
}
