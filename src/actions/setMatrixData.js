const  setMatrixData = (matrixData) => (dispatch) => {
     dispatch({
         type: 'SET_MATRIX_DATA',
         matrixData
     })
}

export default setMatrixData;
