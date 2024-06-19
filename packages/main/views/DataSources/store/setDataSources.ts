const setDataSources = (dataSources: any) => (dispatch: any) => {
    dispatch({
        type: 'SET_DATA_SOURCES',
        dataSources

    })
} 


export default setDataSources