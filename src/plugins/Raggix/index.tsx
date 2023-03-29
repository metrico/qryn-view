import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Switch, Tooltip } from "@mui/material";
import getLogsSeries from "./getLogsSeries";

const useDataSources = () => {
    let dataSources = useSelector((store: any) => store.dataSources);

    const dsSelect = useMemo(() => {
        return dataSources?.reduce((a: any, b: any) => {
            return { ...a, [b.name]: b };
        }, {});
    }, [dataSources]);

    return dsSelect;
};



const Raggix = (props: any) => {
    const ds = useDataSources();

 

    const [logs, setLogs] = useState<any>("");
    const [isRecurrent, setIsRecurrent] = useState(false);
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false)

    const [actTimestamp, setActTimestamp] = useState(Date.now());

    const handleRecurrent = (e: any) => {
        setIsRecurrent(() => e.target.checked);
    };
    const handleReset = () => {
        setLogs(() => []);
    };

    const openLog = (e:any) => {
     console.log(e)
     setIndex(()=>e)
    }

    const openLogs = (e:any) =>{

        setOpen(()=>e.target.checked)
    }

    useEffect(() => {
        // const interval = setInterval(() => {
        //   setActTimestamp(Date.now());
        // }, 30000);

        // return () => clearInterval(interval);

        if (isRecurrent) {
            // do worker stuff
            const end = Date.now();
            const start = end - 5000;
            const host = ds?.Logs?.url;
            let res = getLogsSeries(start, end, host);
            res.then((data) => {
                setLogs((prev:any) =>{ 
                if(prev?.length > 0 && data?.length > 0) {
                    let cp = [...prev]
                   return  [...cp, data] 
                }

                    return data
                 });
            });
        }
    }, [isRecurrent]);

    // const logsData = async (start: any, end: any, url: string) => {
    //     console.log("loading data...");
    //     let result = await logsWorker(start, end, url);
    //     return result;
    // };

    return (
        <div>
            <p>QRYN Raggix</p>
            <label>recurrent: </label>{" "}
            <Switch
                checked={isRecurrent}
                size={"small"}
                onChange={handleRecurrent}
                inputProps={{ "aria-label": "controlled" }}
            />{" "}
            <button onClick={handleReset}>reset</button>
            {/* {logs} */}

            <label>Open Logs: </label>{" "}
            <Switch
                checked={open}
                size={"small"}
                onChange={openLogs}
                inputProps={{ "aria-label": "controlled" }}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {logs &&
                    logs?.map((log: any, idx: number) => (
                        <div key={idx}>
                            <LogItem log={log} openLog={openLog} index={idx} />
                        </div>
                    ))}

            </div>
            <div>
            {open && logs?.length > 0 && (
                    <LogsList logs={logs[index]}/>
                )}

            </div>
        </div>
    );
};


const levelColors: any = {
    error: "red",
    info: "green",
    information: "green",
    warn: "purple",
    warning: "purple",
    debug: "blue",
};

export const LogItem = (props: any) => {
    const {openLog, index} = props
    console.log(props.log);
    const level = useMemo(() => {
        if(props?.log?.stream?.level) {
            const keys = Object.keys(props.log.stream);
            if (keys.includes("level")) {
                return levelColors[props.log.stream.level|| "info"];
            }
        }

        return "";
    }, [props.log.stream]);

    console.log(level);
    return (
        <Tooltip title={JSON.stringify(props.log.stream)}>
            <div
                onClick={()=>openLog(index)}
                style={{
                    height: "20px",
                    width: "20px",
                    background: level || "gray",
                    margin: "3px",
                    borderRadius: "3px",
                }}
            >

          

            </div>
        </Tooltip>
    );
};

export const LogsList = (props:any) =>{ 
    const {logs} = props 
    console.log(logs)

    return (
        <div>
            {logs?.values?.length > 0  && logs?.values?.map((log:any,idx:any)=>{
                const [ts,text] = log
                return<div style={{fontSize:'12px',fontFamily:"monospace",display:'flex'}} key={idx}>
                  <span style={{margin:'2px'}}>{ts}</span> <span style={{margin:'2px'}}>{text}</span>
                </div>
            })}
        </div>
    )
}

export default Raggix;
