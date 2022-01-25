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
        year:1,
        month:1
    }
}