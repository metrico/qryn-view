import { MaintainanceItem } from '../api/types'


export const totalsMock: MaintainanceItem[] = [
    {
        id: "85331a29-ea2f-4d6c-89ae-fa87349e4d7f",
        query: "{a=\"b\"}",
        type: "delete",
        status: "running",
        created_sec: 1704359839,
        from_sec: 1704240000,
        to_sec: 1704326400,
        series_dropped: 150,
        series_created: 0,
        logs: [
            "INFO starting",
            "INFO processing day 1",
            "INFO backing up data",
        ],
    },
    {
        id: "85331a29-ea2f-4d6c-89ae-fa87349e4d7f",
        query: "{a=\"b\"}",
        type: "delete",
        status: "running",
        created_sec: 1704359839,
        from_sec: 1704240000,
        to_sec: 1704326400,
        series_dropped: 120,
        series_created: 0,
        logs: [
            "INFO starting",
            "INFO processing day 1",
            "INFO backing up data",
        ],
    },
    {
        id: "85331a29-ea2f-4d6c-89ae-fa87349e4d7f",
        query: "{__name=\"server\",type=\"clickhouse\",level=\"info\"}",
        type: "delete",
        status: "running",
        created_sec: 1704359839,
        from_sec: 1704240000,
        to_sec: 1704326400,
        series_dropped: 150,
        series_created: 0,
        logs: [
            "INFO starting",
            "INFO processing day 1",
            "INFO backing up data",
        ],
    },
    {
        id: "85331a29-ea2f-4d6c-89ae-fa87349e4d7f",
        query: "{__name=\"server\",type=\"clickhouse\",level=\"debug\"}",
        type: "delete",
        status: "running",
        created_sec: 1704359839,
        from_sec: 1704240000,
        to_sec: 1704326400,
        series_dropped: 132,
        series_created: 0,
        logs: [
            "INFO starting",
            "INFO processing day 1",
            "INFO backing up data",
        ],
    },
];

