import axios from "axios";


const getTracesSeries = async (
    host: string,
    end: number,
    start: number,
    options: any
) => {
    return await axios.get(host, options);
};

export default getTracesSeries