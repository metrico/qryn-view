const setLinksHistory = (linksHistory) => (dispatch) => {
    dispatch({
        type: 'SET_LINKS_HISTORY',
        linksHistory
    });

}

export default setLinksHistory
