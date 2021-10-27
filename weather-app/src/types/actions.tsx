import { CountryInfo } from "./CountryInfo";
import { WeatherInfo } from "./WeatherInfo";

export const FETCH_COUNTRY = "FETCH_COUNTRY";
export const FETCH_CAPITAL_WEATHER = "FETCH_CAPITAL_WEATHER";

export interface fetchCountry {
  type: typeof FETCH_COUNTRY;
  country: CountryInfo;
}
export interface fetchCapitalWeather {
  type: typeof FETCH_CAPITAL_WEATHER;
  weatherInfo: WeatherInfo;
}
export type ActionType = fetchCountry | fetchCapitalWeather;
export type AppActions = ActionType