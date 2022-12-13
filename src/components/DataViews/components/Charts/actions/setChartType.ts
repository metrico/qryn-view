export const setChartType = ( chartType : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_CHART_TYPE',
        chartType
    })
}