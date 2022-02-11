import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setStopTime, setStartTime, setQueryLimit, setQueryStep, } from '../../../actions';
import loadLogs from '../../../actions/loadLogs';
import { setApiUrl } from "../../../actions/setApiUrl";
import { useQuery } from './useQuery';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function updateStateFromQueryParams() {
    const [submit, setSubmit] = useState(false)
    const urlQueryParams = useQuery()
    const dispatch = useDispatch()


    const usedParams = [
        'query', 'limit', 'apiUrl', 'step'
    ]

    const dispatchActions = {

        query: setQuery,
        limit: setQueryLimit,
        apiUrl: setApiUrl,
        step: setQueryStep,

    }
    const start = useSelector(store => store.start)
    const stop = useSelector(store => store.stop)
    const limit = useSelector(store => store.limit)
    const step = useSelector(store => store.step)
    const apiUrl = useSelector(store => store.apiUrl)
    const query = useSelector(store => store.query)
    const { hash } = useLocation()


    // Update from UI
    useEffect(() => {
        const paramValues = {
            limit, apiUrl, step, query
        }

        usedParams.forEach(param => {

            urlQueryParams.set(param, paramValues[param].toString())

        })

        const startTs = parseInt(start.getTime()) * 1000
        urlQueryParams.set('start', startTs)

        const endTs = parseInt(stop.getTime()) * 1000
        urlQueryParams.set('end', endTs)

        window.location.hash = urlQueryParams

    }, [start, stop, limit, step, apiUrl, query])


    // update from query params
    useEffect(() => {

        usedParams.forEach(param => {
            if (urlQueryParams.has(param)) {
                const action = dispatchActions[param]
                dispatch(action(urlQueryParams.get(param)))
            }
        })

        if (urlQueryParams.has("start")) {
            const startDate = parseInt(urlQueryParams.get('start')) / 1000
            const parsedStart = new Date(moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
            dispatch(setStartTime(parsedStart))
        }

        if (urlQueryParams.has("stop")) {
            const stopDate = parseInt(urlQueryParams.get('stop')) / 1000
            const parsedStop = new Date(moment(stopDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
            dispatch(setStopTime(parsedStop))
        }

        if (urlQueryParams.has("submit") && urlQueryParams.get("submit")) {
            setSubmit(true)
        }

    }, [hash])


    // submit if its set to true
    useEffect(() => {
        if (submit) {

            const start = useSelector(store => store.start)
            const stop = useSelector(store => store.stop)
            const limit = useSelector(store => store.limit)
            const step = useSelector(store => store.step)
            const apiUrl = useSelector(store => store.apiUrl)
            const query = useSelector(store => store.query)
            const timerange = [start, stop]
            dispatch(loadLogs(query, timerange, limit, step, apiUrl))

        }
    }, [submit])
}

