import { WebVitalsStore } from './store';

export const initWebVitals = (apiUrl:string) => {
    const {setApiUrl} = WebVitalsStore.getState();
    setApiUrl(apiUrl)
}