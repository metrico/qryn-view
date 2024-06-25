export const setChartType = ( chartType : any) => (dispatch: any) => {
    dispatch({
        type: 'SET_CHART_TYPE',
        chartType
    })
}