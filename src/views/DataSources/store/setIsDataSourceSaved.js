const setIsDatasourceSaved = (isDsSaved) => (dispatch) => {
    dispatch({
        type: 'SET_IS_DATASOURCE_SAVED',
        isDsSaved

    })
} 


export default setIsDatasourceSaved