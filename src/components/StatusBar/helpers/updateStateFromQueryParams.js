import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setStopTime, setStartTime, setQueryLimit, setQueryStep, } from '../../../actions';
import loadLogs from '../../../actions/loadLogs';
import { setApiUrl } from "../../../actions/setApiUrl";
import { useQuery } from './useQuery';
import { useEffect, useState } from 'react';
export function updateStateFromQueryParams() {
    const [submit, setSubmit] = useState(false)
    const urlQueryParams = useQuery()
    const dispatch = useDispatch()

    // define params to be extracted from URL
    const usedParams = [
        'query', 'limit', 'apiUrl', 'step'
    ]

    // encodeURIComponent to create link query 
    // decodeURIComponent to decode link query

    const dispatchActions = {

        query: setQuery,
        limit: setQueryLimit,
        apiUrl: setApiUrl,
        step: setQueryStep,

    }
    useEffect(() => {
        if (urlQueryParams.has("query")) {
            usedParams.forEach(param => {
                if (urlQueryParams.has(param)) {
                    const action = dispatchActions[param]
                    dispatch(action(urlQueryParams.get(param)))
                }
            })
        }
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
    }, [urlQueryParams])
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

