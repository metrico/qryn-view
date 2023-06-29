//prepare table view for response types: 
// stream
// vector
// matrix

type StreamLogLine = [string,string]

type StreamResult =  {
    stream: Object;
    values:StreamLogLine[]  // ts / log line
}

export default function prepareTableView(data:any){
    return data 
}
