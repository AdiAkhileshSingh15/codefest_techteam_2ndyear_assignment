import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Workout from './Workout';
import Details from './Details';

function App() {
    const [token, setToken] = useState(false);
    return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route exact path="/" element={<Home login={token}/>} />
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path='/addworkout' element={<Workout />} />
              <Route path="/dashboard/:id" element={<Details />}/>
            </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
