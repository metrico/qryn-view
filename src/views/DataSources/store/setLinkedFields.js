const setLinkedFields = (linkedFields) => (dispatch) => {
    dispatch({
        type: 'SET_LINKED_FIELDS',
        linkedFields

    })
} 


export default setLinkedFields