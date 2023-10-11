
import './App.css';
import './index.css'

import Create from './Create';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateWorkout from './UpdateWorkout';
import LoginForm from './loginform';
import Workoutsecondary from './workoutsecondary';
import LoginSecondary from './loginSecondary';
import SignupSecondary from './signupsecondary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSecondary/>}/>
        {/* <Route path='/Login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/> */}
        <Route path='/work' element={<Workoutsecondary/>}/>
        <Route path='/work/:id' element={<Workoutsecondary/>}/>
        <Route path='/Create' element={<Create/>}/>
        <Route path='/Update/:id' element={<UpdateWorkout/>}/>
        <Route path='/loginfrom' element={<LoginForm/>}/>
        <Route path='/Login' element={<LoginSecondary/>}/>
        <Route path='/signup' element={<SignupSecondary/>}/>
        
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
