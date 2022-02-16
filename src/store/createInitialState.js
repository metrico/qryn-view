import moment from 'moment';
import { environment } from '../environment/env.dev';


const debug = setDebug(environment.environment)

export default () => {
    if (debug) console.log('🚧 LOGIC/ INITIAL STATE 🚧')
    var externalState = stateFromQueryParams()
    var state =  {
        debug: setDebug(environment.environment),
        labels: [],
        labelValues:[],
        queryHistory:[],
        timeRange:[],
        query: externalState.query || '',
        queryValue: '',
        logs: [],
        loading: false,
        start: externalState.start || new Date(moment(Date.now()).subtract(5,"minutes").format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        stop: externalState.end || new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        label: 'Last 5 Minutes',
        messages: [],
        limitLoad: false,
        limit: externalState.limit || 1000,
        step: externalState.step || 100,
        rangeOpen: false,
        labelsBrowserOpen: true,
        apiErrors: '',
        urlQueryParams: externalState || {},
        urlLocation: '',
        apiUrl: externalState.apiUrl || environment.apiUrl || '',
        isSubmit: externalState.isSubmit || false,
    }
    if (debug) console.log('🚧 LOGIC/ INITIAL STATE ::: ', state)
    return state
}

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
      if (key === 'end' | key === 'start') {
        const croppedTime = value / 1000000
        startParams[key] = new Date(moment(croppedTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
      } else if (key === 'query') {
        const parsedQuery = decodeURIComponent(value)
        startParams[key] = parsedQuery
      } else if(key === 'isSubmit') {
        startParams[key] = value
      } 
      
      else {
        console.log(startParams[key],value)
        startParams[key] = value;
      }

    }
    if (debug) console.log('🚧 LOGIC/startParams/AfterURLFromHash', startParams, Object.keys(startParams).length)
    if (debug) console.groupEnd('🚧 LOGIC/InitialState/FromQuery')
    return startParams
  } else {
    if (debug) console.groupEnd('🚧 LOGIC/InitialState/FromQuery')
    return {}
  }
}
