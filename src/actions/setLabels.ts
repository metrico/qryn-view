export const setLabels = (labels: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LABELS',
        labels: labels
    });
};
