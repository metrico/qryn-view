

const SET_IS_CARDINALITY = "SET_IS_CARDINALITY";

export const setIsCardinality = (isCardinality: boolean) => (dispatch: any) => {
    dispatch({
        type: SET_IS_CARDINALITY,
         isCardinality,
    }) 
};
