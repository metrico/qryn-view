const setIsEmbed = (isEmbed) => (dispatch) => {
    dispatch({
        type: 'SET_IS_EMBED',
        isEmbed,
    })
}

export default setIsEmbed;