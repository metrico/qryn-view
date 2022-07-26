import { Provider } from "react-redux";
import store from "./store/store";
import Main from "./views/Main";

export default function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
