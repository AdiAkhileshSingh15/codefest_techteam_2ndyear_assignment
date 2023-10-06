// src/App.js
import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Workout from './Workout';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/workout" component={Workout}/>
        <Route path="/" component={Register}/>

      </Switch>
    </Router>
  );
}

export default App;
