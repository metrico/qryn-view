export const setChartType = ( chartType ) => (dispatch) => {
    dispatch({
        type: 'SET_CHART_TYPE',
        chartType
    })
}