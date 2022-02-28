import { Provider } from "react-redux";
import store from './store/store';
import MainView from "./components/MainView";
import localService from "./services/localService";


export default function App() {
window.LOCALSERVICE = localService
		return (
			<Provider store={store}>

				<MainView/>
			
			</Provider>
		);
	
}