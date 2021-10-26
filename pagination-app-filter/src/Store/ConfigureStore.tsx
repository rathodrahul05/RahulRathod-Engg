import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import filterReducer from "../Redux/Reducers/filterReducer";
import paginationReducer from "../Redux/Reducers/paginationReducer";


const store=createStore(combineReducers({
    pagination:paginationReducer,
    filter:filterReducer
}),applyMiddleware(thunk));
export default store;
