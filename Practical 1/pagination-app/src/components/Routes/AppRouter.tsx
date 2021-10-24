import React from 'react'
import ListItem from '../ListItem'
import {
    BrowserRouter as Router,
  } from "react-router-dom";

  
function AppRouter() {
    return (
        <div>
            <Router>
            <ListItem/>
            </Router>
        </div>
    )
}

export default AppRouter
