const setDataSources = (dataSources) => (dispatch) => {
    dispatch({
        type: 'SET_DATA_SOURCES',
        dataSources

    })
} 


export default setDataSources