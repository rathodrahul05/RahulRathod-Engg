import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import filterReducer from "../Reducers/filterReducer";
import paginationReducer from "../Reducers/paginationReducer";



const store=createStore(combineReducers({
    pagination:paginationReducer,
    filter:filterReducer
}),applyMiddleware(thunk));
export default store;
