import { useEffect } from "react";
import { Provider } from "react-redux";
import MainView from "./components/MainView";
import httpClient from "./helpers/httpclient";
import store from './store/store';
export default function App() {
        useEffect(() => {
            httpClient.get("/");
        }, []);
		return (
			<Provider store={store}>

				<MainView/>
			
			</Provider>
		);
	
}