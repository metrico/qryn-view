const setLinksHistory = (linksHistory: any) => (dispatch: Function) => {
    
    dispatch({
        type: 'SET_LINKS_HISTORY',
        linksHistory
    });
}

export default setLinksHistory
