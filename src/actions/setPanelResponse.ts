
export const setPanelResponse = (panel: any, response: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_PANEL_RESPONSE',
        panel,
        response
    })
}