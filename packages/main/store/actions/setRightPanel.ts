export const setRightPanel = ( right : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_RIGHT_PANEL',
        right
    })
}
