import { combineReducers, createStore } from "redux";
import AestroidReducer from '../Reducer/AestroidReducer';
import totolAestroidsReducer from "../Reducer/TotalAestroidsReducer";

const store=createStore(combineReducers({
    Aestroid:AestroidReducer,
    TotalAestroids:totolAestroidsReducer
}));
export default store