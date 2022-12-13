const  setMatrixData = (matrixData: any) => (dispatch: Function) => {
     dispatch({
         type: 'SET_MATRIX_DATA',
         matrixData
     })
}

export default setMatrixData;
