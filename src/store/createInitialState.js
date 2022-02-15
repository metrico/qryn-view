import * as moment from 'moment';
import { environment } from '../environment/env.dev';

export default () => {
    return {
        labels: [],
        labelValues:[],
        queryHistory:[],
        timeRange:[],
        query:'',
        queryValue:'',
        logs: [],
        loading: false,
        start:new Date(moment(Date.now()).subtract(5,"minutes").format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        stop:new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        messages:[],
        limitLoad:false,
        limit: 1000,
        step: 100,
        rangeOpen: false,
        labelsBrowserOpen: true,
        apiErrors:'',
        urlQueryParams:{},
        urlLocation:'',
        apiUrl:'',
    }
}
