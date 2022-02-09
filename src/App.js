import { Provider } from "react-redux";
import store from './store/store';
import { BrowserRouter as Router} from 'react-router-dom';
import MainView from "./components/MainView";
export default function App() {

		return (
			<Provider store={store}>
				<Router>
				<MainView/>
				</Router>
			
			</Provider>
		);
	
}