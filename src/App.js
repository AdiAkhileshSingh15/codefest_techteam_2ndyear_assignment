import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Workout from './pages/Workout';
import Navbar from './components/Navbar';



const App = () => {
  return (
    <div className='font-mono'>
      <Navbar />
        <Routes>
          <Route path='/'
            element={<Home />} />
          <Route path='/login'
            element={<Login />} />
          <Route path='/signup'
            element={<SignUp />} />
          <Route path='/workout/:_id'
            element={<Workout />} />
        </Routes>
    </div>
  )
}

export default App