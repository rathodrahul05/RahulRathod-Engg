import { createStore } from "redux";
import AestroidReducer from '../Reducer/AestroidReducer'
const store=createStore(AestroidReducer);
export default store