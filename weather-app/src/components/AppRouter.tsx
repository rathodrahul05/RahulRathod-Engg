import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
import CountryCard from './CountryCard';
import FormComponent from './FormComponent';
import WeatherCard from './WeatherCard';

function AppRouter() {
    return (
       <Router>
           <Switch>
               <Route exact path='/' component={FormComponent}/>
               <Route path='/countries' component={CountryCard}/>
               <Route path='/weatherinfo/:id' component={WeatherCard}/>
           </Switch>
       </Router>
    )
}

export default AppRouter
