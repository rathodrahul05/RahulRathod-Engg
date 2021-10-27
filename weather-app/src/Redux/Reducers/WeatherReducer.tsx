import {  ActionType, AppActions, fetchCapitalWeather } from "../../types/actions";
import { WeatherInfo } from "../../types/WeatherInfo";

const initialState:WeatherInfo={
    temperature:0,
    weather_icons:[],
    wind_speed:0,
    precip:0
}
const WeatherReducer=(state=initialState,action:fetchCapitalWeather)=>{
  
    switch (action.type) {
    
        case 'FETCH_CAPITAL_WEATHER':
            return{
                ...state,
                temperature:action.weatherInfo.temperature,
                weather_icons:action.weatherInfo.weather_icons[0],
                wind_speed:action.weatherInfo.wind_speed,
                precip:action.weatherInfo.precip

                

            }
    
        default:
            return state
        
    }

}
export default WeatherReducer