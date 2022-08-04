import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import createInitialState from "./createInitialState";
const store = createStore(
    reducer,
    createInitialState(),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
    
   
);

export default store;
