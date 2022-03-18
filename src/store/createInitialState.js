import * as moment from 'moment';
import { environment } from '../environment/env.dev';
import localService from '../services/localService';
import localUrl from '../services/localUrl';
const debug = setDebug(environment.environment)

const initialState = () => {
    if (debug) console.log('🚧 LOGIC/ INITIAL STATE 🚧')
    const externalState = stateFromQueryParams()
    const historyService = localService().historyStore()
    const linkService = localUrl()
    const state =  {
        debug: setDebug(environment.environment),
        labels: [],
        labelValues:[],
        queryHistory: historyService.getAll() || [],
        linksHistory: linkService.getAll() || [],
        timeRange:[],
        query: externalState.query || '',
        queryValue: '',
        logs: [],
        matrixData: [],
        loading: false,
        start: externalState.start || new Date(moment(Date.now()).subtract(5,"minutes").format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        stop: externalState.end || new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        label:externalState.label || 'Last 5 minutes',
        messages: [],
        limitLoad: false,
        limit: externalState.limit || 1000,
        step: externalState.step || 100,
        rangeOpen: false,
        labelsBrowserOpen: true,
        historyOpen: false,
        apiErrors: '',
        urlQueryParams: externalState || {},
        urlLocation: '',
        apiUrl: externalState.apiUrl || environment.apiUrl || '',
        isSubmit: externalState.isSubmit || false,
        chartType:'line',
        notifications: []
    }
    if (debug) console.log('🚧 LOGIC/ INITIAL STATE ::: ', state)
    return state
}
export default initialState;
function setDebug (envSetting) {
  if (envSetting === 'dev') {
    return true
  } else {
    return false
  }
}


function stateFromQueryParams () {

  if (debug) console.group('🚧 LOGIC/InitialState/FromQuery')

  const { hash } = window.location
  if (debug) console.log('🚧 LOGIC/FromQuery Hash', hash)

  const urlFromHash = new URLSearchParams(hash.replace("#", ""))

  if (debug) console.log('🚧 LOGIC/urlFromHash', urlFromHash, hash.length)

  if (hash.length > 0) {
    const startParams = {};
    if (debug) console.log('🚧 LOGIC/startParams/BeforeURLFromHash', startParams)
    for (let [key, value] of urlFromHash.entries()) {
      if (debug) console.log('🚧 LOGIC/startParams/', key, value)
      if (key === 'end' || key === 'start') {
        const croppedTime = parseInt(value) / 1000000
        startParams[key] = new Date(moment(croppedTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
      } else if (key === 'query') {
        const parsedQuery = decodeURIComponent(value)
        startParams[key] = parsedQuery
      } else if(key === 'isSubmit') {
        startParams[key] = value
      } 
      
      else {
        startParams[key] = value;
      }

    }
    if (debug) console.log('🚧 LOGIC/startParams/AfterURLFromHash', startParams, Object.keys(startParams).length)
    if (debug) console.groupEnd('🚧 LOGIC/InitialState/FromQuery')
    if(startParams['start'] && startParams['end']) {
      const startTs = moment(startParams['start']).format("YYYY-MM-DD HH:mm:ss")
      const endTs = moment(startParams['end']).format("YYYY-MM-DD HH:mm:ss")
      startParams['label'] = `${startTs} - ${endTs}`
    }
    return startParams
  } else {
    if (debug) console.groupEnd('🚧 LOGIC/InitialState/FromQuery')
    return {}
  }
}
