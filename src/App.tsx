import { Provider } from "react-redux";
import MainView from "./components/MainView";
import store from "./store/store";

export default function App() {
    return (
        <Provider store={store}>
                <MainView />
        </Provider>
    );
}
