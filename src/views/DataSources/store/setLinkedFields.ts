const setLinkedFields = (linkedFields: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LINKED_FIELDS',
        linkedFields

    })
} 


export default setLinkedFields