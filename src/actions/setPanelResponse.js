
 export const setPanelResponse = (panel,response) => (dispatch) => {
    dispatch({
        type: 'SET_PANEL_RESPONSE',
        panel,
        response
    })
}