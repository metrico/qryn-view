export const setIsSequenceDiagramView = (isSequenceDiagramView) => (dispatch) => {
    dispatch({
        type: 'SET_IS_SEQUENCE_DIAGRAM_VIEW',
        isSequenceDiagramView
    })
}
