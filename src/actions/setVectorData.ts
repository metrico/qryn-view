export const setVectorData = (vectorData) => (dispatch) => {
    dispatch({
        type: "SET_VECTOR_DATA",
        vectorData,
    });
};
