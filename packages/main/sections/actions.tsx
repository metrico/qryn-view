export const setLeftPanel = ( left : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LEFT_PANEL',
        left
    })
}

export const setRightPanel = ( right : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_RIGHT_PANEL',
        right
    })
}

export const setLeftDataView = (leftDataView: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LEFT_DATAVIEW',
        leftDataView
    })
}

export const setRightDataView = (rightDataView: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_RIGHT_DATAVIEW',
        rightDataView
    })
}

export const setSplitView = ( isSplit : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_SPLIT_VIEW',
        isSplit
    })
}

export const setDataSources = (dataSources: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_DATA_SOURCES',
        dataSources

    })
} 

