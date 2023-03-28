// logWorker.ts
interface WorkerMessage {
    start: number;
    end: number;
    url:string;
  }
  
  const worker = new Worker('./worker.tsx', { type: 'module' });
  
  const getLogsWorker = (start: number, end: number, url:string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const message: WorkerMessage = { start, end, url };
      worker.postMessage(message);
      worker.onmessage = (e: MessageEvent) => {
        resolve(e.data);
      };
      worker.onerror = (e: ErrorEvent) => {
        reject(e);
      };
    });
  };
  
  export default getLogsWorker;