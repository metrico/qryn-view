import * as moment from 'moment';
const initialState = () => {
    return {
        labels: [],
        labelValues:[],
        queryHistory:[],
        timeRange:[],
        query:'',
        queryValue:'',
        logs: {
            messages: [],
        },
        loading: false,
        start:new Date(moment(Date.now()).subtract(5,"minutes").format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        stop:new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        label: 'Last 5 minutes',
        messages:[],
        limitLoad:false,
        limit: 1000,
        step: 100,
        rangeOpen: false,
        labelsBrowserOpen: true,
        apiErrors:'',
        apiUrl: '',
    }
}
export default initialState;