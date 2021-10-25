import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import AestroidCard from './AestroidCard';
import AestroidInput from './AestroidInput';
  
function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={AestroidInput}/>
                <Route path='/info' component={AestroidCard}/>
            </Switch>
        </Router>
    )
}

export default AppRouter
