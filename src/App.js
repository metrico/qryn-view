import { Provider } from "react-redux";
import store from './store/store';

import MainView from "./components/MainView";

export default function App() {

		return (
			<Provider store={store}>

				<MainView/>
			
			</Provider>
		);
	
}