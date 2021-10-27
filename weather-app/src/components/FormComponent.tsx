import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getCountry } from "../Redux/Actions/CountryAction";
import { getCapitalWeather } from "../Redux/Actions/WeatherAction";
import CountryCard from "./CountryCard";


function FormComponent() {
  const dispatch = useDispatch();
  const history=useHistory()
  const [country, setCountry] = useState("");
  const accessKey = "fd17f3bb156bd16e7618c1a91fcdd880";

  const getCountryData = async () => {
    let response = await axios.get(
      `https://restcountries.com/v2/name/${country}`
    );
    console.log(response);
    dispatch(getCountry(response["data"]));
  };
 const getWeatherData=async (city:string)=>{
     let response=await axios.get(`http://api.weatherstack.com/current?access_key=fd17f3bb156bd16e7618c1a91fcdd880&query=${city}`)
     console.log(response['data']['current'])
     dispatch(getCapitalWeather(response['data']['current']));
     history.push(`/weatherinfo/${city}`)


 }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCountryData();
  };
  const displayWeather = (city: string,name:string) => {
    console.log(city);
    getWeatherData(city);
    
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center container my-3">
        <div className="row ">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={country}
                onChange={handleChange}
                placeholder="enter country name"
              />
            </div>
            <button className="btn btn-info m-2">Submit</button>
          </form>
        </div>
      </div>

      <CountryCard displayWeather={displayWeather}  />
    </>
  );
}

export default FormComponent;
