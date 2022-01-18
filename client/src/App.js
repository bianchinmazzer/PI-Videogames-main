import './App.css';
import React from "react";
import {  Route } from "react-router-dom";
import LandingPage from "./components/LandindPage.js";
import Home from './components/Home.js';
import VideogameCreate from './components/VideogameCreate.js';
import Details from './components/Details.js';


function App() {
  
return (
  <React.Fragment>
    <div className="App">
   
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/videogame" component={VideogameCreate}></Route>
      <Route path="/details/:id" component={Details}></Route>
    </div>
    </React.Fragment>
  );
}

export default App;
