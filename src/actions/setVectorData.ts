export const setVectorData = (vectorData: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_VECTOR_DATA",
        vectorData,
    });
};
