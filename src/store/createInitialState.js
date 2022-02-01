export default () => {
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
        start:new Date('2018-01-01T00:00:00.000Z'),
        stop:new Date('2022-02-01T00:00:00.000Z'),
        limit: 100,
        step: 100,
        rangeOpen: false,
    }
}
