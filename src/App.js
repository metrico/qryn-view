import { Provider } from "react-redux";
import store from './store/store';
import MainView from "./components/MainView";
import LocalStorageService from "./services/localStorage";


export default function App() {
window.LOCALSERVICE = LocalStorageService
		return (
			<Provider store={store}>

				<MainView/>
			
			</Provider>
		);
	
}