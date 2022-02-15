import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
// import { setQuery, setStopTime, setStartTime, setQueryLimit, setQueryStep, } from '../../../actions';
// import loadLogs from '../../../actions/loadLogs';
// import { setApiUrl } from "../../../actions/setApiUrl";
// import { useQuery } from './useQuery';

import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setUrlQueryParams } from '../actions/setUrlQueryParams';
import { setUrlLocation } from '../actions/setUrlLocation';
import { setQuery, setStopTime, setStartTime, setQueryLimit, setQueryStep, setApiUrl } from '../actions';
import { parse } from 'date-fns';
// import { environment } from '../../../environment/env.dev';


// check if before adding url parameters there where some

// if were some, 

//      set it as urlLocation

// get the params list and do the urlQueryParams

// take the urlqueryparams available and update state




// if there are parameter at start, set them on UI

//  if there are not parameters at start, set default ones from UI

// listen from changes on UI

// listen from changes on URL

// update state of



export function updateStateFromQueryParams() {


    const { hash } = useLocation()
    const dispatch = useDispatch()

    const urlQueryParams = useSelector(store => store.urlQueryParams)

    const urlLocation = useSelector(store => store.urlLocation)

    const start = useSelector(store => store.start)
    const stop = useSelector(store => store.stop)
    const limit = useSelector(store => store.limit)
    const step = useSelector(store => store.step)
    const apiUrl = useSelector(store => store.apiUrl)
    const query = useSelector(store => store.query)

    const STORE_KEYS = {
        apiUrl,
        query,
        start,
        limit,
        step,
        end : stop
    }

    const STORE_ACTIONS = {
        apiUrl: setApiUrl,
        query: setQuery,
        start: setStartTime,
        limit: setQueryLimit,
        step: setQueryStep,
        end: setStopTime
    };

    const STRING_VALUES = [
        'limit',
        'step',
        'apiUrl'
    ];

    const QUERY_VALUE = 'query'

    const TIME_VALUES = [
        'start',
        'end'
    ]


    useEffect(() => {
        const urlFromHash = new URLSearchParams(hash.replace("#", ""))
        
        // !if there is some params set them first on UI
        if (hash.length > 0) {
            console.log('larger than zero!')
            const startParams = urlQueryParams;

            for (let [key, value] of urlFromHash.entries()) {
                startParams[key] = value
            }
            if (Object.keys(startParams).length > 0) {

                dispatch(setUrlQueryParams({ ...urlQueryParams, startParams }))

                dispatch(setUrlLocation(hash))
                Object.keys(startParams).forEach(param => {
                if(STRING_VALUES.includes(param) && startParams[param] !== ''){
                    dispatch(STORE_ACTIONS[param](startParams[param]))
                } else if(QUERY_VALUE === param && startParams[param] !== '') {
                    const parsedQuery = decodeURIComponent(startParams[param])
                    dispatch(STORE_ACTIONS[param](parsedQuery))
                } else if(TIME_VALUES.includes(param) && startParams[param] !=='') {
                    const croppedTime = ((startParams[param]).toString()).trim(0,13)
                    const paramDate = new Date(moment(croppedTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
                    dispatch(STORE_ACTIONS[param](paramDate))
                }

                })

            }


        }
        // if there is no params set the starting ones on url
        else {
            const allParams = [...STRING_VALUES,...QUERY_VALUE,...TIME_VALUES]

            allParams.forEach(param => {
                if(STRING_VALUES.includes(param)) {
                    urlFromHash.set(param, STORE_KEYS[param].toString())
                }
            })
            console.log(urlFromHash)
           window.location.hash = urlFromHash

        }




    }, [])



    console.log(hash)
    //     const [submit, setSubmit] = useState(false)
    //     const urlQueryParams = useQuery()
    //     const dispatch = useDispatch()
    //     const [editing,setEditing] = useState(false)

    //     const usedParams = [
    //         'query', 'limit', 'apiUrl', 'step'
    //     ]

    //     const dispatchActions = {

    //         query: setQuery,
    //         limit: setQueryLimit,
    //         apiUrl: setApiUrl,
    //         step: setQueryStep,

    //     }
    //     const start = useSelector(store => store.start)
    //     const stop = useSelector(store => store.stop)
    //     const limit = useSelector(store => store.limit)
    //     const step = useSelector(store => store.step)
    //     const apiUrl = useSelector(store => store.apiUrl)
    //     const query = useSelector(store => store.query)

    //     if (apiUrl === '') {

    //         dispatch(setApiUrl(environment.apiUrl))
    //     }

    //     // Update from UI

    //     const { hash } = useLocation()

    // // first time (copy-paste)

    //     useEffect(() => {
    //         setEditing(true)
    //       console.log('first useEffect')
    //       const startQueryParams = new URLSearchParams(hash.replace(/#/,""))

    //             const paramValues = {
    //                 limit, apiUrl, step, query
    //             }

    //             usedParams.forEach(param => {

    //                     startQueryParams.set(param, paramValues[param].toString())

    //             })

    //             const startTs = parseInt(start.getTime()) * 1000
    //             startQueryParams.set('start', startTs)

    //             const endTs = parseInt(stop.getTime()) * 1000
    //             startQueryParams.set('end', endTs)
    //             window.location.hash = startQueryParams
    //         return(()=> {
    //             setEditing(false)
    //         })
    //     },[])

    //     useEffect(() => {

    //       console.log('second useEffect')
    //       const startQueryParams = new URLSearchParams(hash.replace(/#/,""))

    //             const paramValues = {
    //                 limit, apiUrl, step, query
    //             }

    //             usedParams.forEach(param => {

    //                     startQueryParams.set(param, paramValues[param].toString())

    //             })

    //             const startTs = parseInt(start.getTime()) * 1000
    //             startQueryParams.set('start', startTs)

    //             const endTs = parseInt(stop.getTime()) * 1000
    //             startQueryParams.set('end', endTs)
    //             window.location.hash = startQueryParams

    //     },[])


    //     // update from query params
    //     useEffect(() => {
    //         console.log('third useEffect')
    //         usedParams.forEach(param => {

    //             if (urlQueryParams.has(param)) {
    //                 const action = dispatchActions[param]
    //                 dispatch(action(urlQueryParams.get(param)))
    //             }
    //         })

    //         if (urlQueryParams.has("start")) {

    //             const startDate = parseInt(urlQueryParams.get('start')) / 1000
    //             const parsedStart = new Date(moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    //             dispatch(setStartTime(parsedStart))
    //         }

    //         if (urlQueryParams.has("stop")) {

    //             const stopDate = parseInt(urlQueryParams.get('stop')) / 1000
    //             const parsedStop = new Date(moment(stopDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    //             dispatch(setStopTime(parsedStop))
    //         }

    //         if (urlQueryParams.has("submit") && urlQueryParams.get("submit")) {
    //             const timerange = [start, stop]
    //             dispatch(loadLogs(query, timerange, limit, step, apiUrl))
    //         }

    //     },[])
}


