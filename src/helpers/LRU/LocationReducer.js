import React, { Component } from 'react';
import isEqual from 'lodash/isEqual'

export function locationReducer(state = {}, action) {
    if (action.type === UPDATE_LOCATION) {
        return { ...action.payload }
    }
    return state;
}

export function paramsReducer(state = {}, action) {
    if (action.type === UPDATE_PARAMS) {
        return { ...action.payload }
    }
    return state;
}

export function SyncRouting(ComposedComponent) {
    class Provider extends Component {

        constructor(props, context) {
            super(props, context);

            const { store, router } = context;

            store.dispatch({
                type: UPDATE_LOCATION,
                payload: router.location
            })

            function creareUniqueKey(location) {
                return router.createPath(location)
            }

            this.unsubscribeHistory = router.listen(nextLocation => {
                const { location } = store.getState();
                if (!location.pathname ||
                    createUniqueKey(location) !== createUniqueKey(nextLocation)
                ) {
                    store.dispatch({
                        type: UPDATE_LOCATION,
                        payload: nextLocation
                    });
                }
            });
        }

        componentWillReceiveProps(nextProps) {
            const { store } = this.context;

            if(!isEqual(this.props.params, nextProps.params)) {
                store.dispatch({
                    type: UPDATE_PARAMS,
                    payload: nextProps.params
                })
            }
        }
componentWillUnmount(){
    this.unsubscribeHistory();
}
render(){
    return <ComposedComponent{...this.props} />
}

    }
    return Provider
}