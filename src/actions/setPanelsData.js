 export const setPanelsData = (panels) => (dispatch) => {
    dispatch({
        type: 'SET_PANELS_DATA',
        panels
    })
}
