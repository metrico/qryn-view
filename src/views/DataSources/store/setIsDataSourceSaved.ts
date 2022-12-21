const setIsDatasourceSaved = (isDsSaved: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_IS_DATASOURCE_SAVED',
        isDsSaved

    })
} 


export default setIsDatasourceSaved