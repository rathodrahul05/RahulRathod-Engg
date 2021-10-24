import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import paginationReducer from "../Redux/Reducers/paginationReducer";

const store=createStore(paginationReducer,applyMiddleware(thunk));
export default store;
