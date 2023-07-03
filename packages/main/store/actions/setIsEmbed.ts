const setIsEmbed = (isEmbed: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_IS_EMBED',
        isEmbed,
    })
}

export default setIsEmbed;