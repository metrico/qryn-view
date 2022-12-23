const setDataSources = (dataSources: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_DATA_SOURCES',
        dataSources

    })
} 


export default setDataSources