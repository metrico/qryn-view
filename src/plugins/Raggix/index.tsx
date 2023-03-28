import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useWorker } from "@koale/useworker";
import getLogs from "./worker";

const useDataSources = () => {
    let dataSources = useSelector((store: any) => store.dataSources);

    const dsSelect = useMemo(() => {
        return dataSources?.reduce((a: any, b: any) => {
            return { ...a, [b.name]: b };
        }, {});
    }, [dataSources]);

    return dsSelect;
};

interface WorkerMessage {
    start: number;
    end: number;
    host: string;
}

//   const worker = new Worker('./worker.tsx', { type: 'module' });

//   const getLogsWorker = (start: number, end: number, url:string): Promise<any> => {
//     return new Promise((resolve, reject) => {
//       const message: WorkerMessage = { start, end, url };
//       worker.postMessage(message);
//       worker.onmessage = (e: MessageEvent) => {
//         resolve(e.data);
//       };
//       worker.onerror = (e: ErrorEvent) => {
//         reject(e);
//       };
//     });
//   };

const Raggix = (props: any) => {
    const ds = useDataSources();
    const [logsWorker] = useWorker(getLogs,{timeout:5000});
    // const [logs, setLogs] = useState<any>("");
    const logsData = async (start:any, end:any, url:string) => {
        console.log("loading data...")
        let result = await logsWorker(start, end, url);
        console.log(result,"END")
        

    }

    useEffect(() => {
        const end = Date.now();
        const start = end - 5000;
           logsData(start,end,ds.Logs.url)
    },[]);

    return (
        <div>
            <p>WILL LOAD DATA</p>
            {/* {logs} */}
            {/* {logs.map((log: any, idx: number) => (
                <div key={idx}>{log}</div>
            ))} */}
        </div>
    );
};

export default Raggix;
