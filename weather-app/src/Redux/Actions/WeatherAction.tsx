import { WeatherInfo } from "../../types/WeatherInfo"

export const getCapitalWeather=(weatherinfo:WeatherInfo)=>{
    return{
        type:'FETCH_CAPITAL_WEATHER',
        weatherInfo:weatherinfo
    }
}