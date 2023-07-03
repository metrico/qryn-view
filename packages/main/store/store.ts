import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import createInitialState from "./createInitialState";
const store = createStore(
    reducer,
    createInitialState(),
    applyMiddleware(thunk)
);

export default store;
