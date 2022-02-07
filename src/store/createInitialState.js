import * as moment from 'moment';
export default () => {
    // set start date as previous 24 hs
    // set stop date as actual time
    return {
        labels: [],
        labelValues:[],
        queryHistory:[],
        timeRange:[],
        query:{
            text:'',
            inputs:[],
        },
        logs: {
            messages: [],
        },
        loading: false,
        start:new Date(moment(Date.now()).subtract(5,"minutes").format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        stop:new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        limit: 1000,
        step: 100,
        rangeOpen: false,
        labelsBrowserOpen: true,
        apiErrors:'',
        apiUrl: '',
    }
}
