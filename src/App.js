import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Login from './login'
import Register from './register'
import User from './user'
import Workout from './workout'
import Createnew from './create'
import Workoutdetails from './workoutdetails'
import Update from './update'

function App() {
    return (
    <Router>
    <Routes>
        <Route exact path='/' element={<User/>}></Route>
        <Route exact path='/login' element={<Login />}> </Route>
        <Route exact path='/signup' element={<Register />}> </Route>
        <Route exact path='/workout/:token' element={<Workout />}>  </Route>
        <Route exact path='/create/:token' element={<Createnew />}> </Route>
        <Route exact path='/workout/details/:token/:_id' element={<Workoutdetails />}></Route>
        <Route exact path='/workout/update/:token/:_id' element={<Update/>}>  </Route>
    </Routes>

    </Router>
  
)
}
export default App;
