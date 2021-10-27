import { combineReducers, createStore } from "redux";
import CountryReducer from "../Reducers/CountryReducer";
import WeatherReducer from '../Reducers/WeatherReducer'
const store=createStore(combineReducers({
    Country:CountryReducer,
    Weather:WeatherReducer
    
}))
export default store