export const setLeftPanel = ( left : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LEFT_PANEL',
        left
    })
}
