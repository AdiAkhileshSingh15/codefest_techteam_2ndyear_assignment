import Login from './login';
import './App.css';
import './index.css'
import Signup from './signup';
import Workout from './workout';
import Create from './Create';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateWorkout from './UpdateWorkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<Login/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/work' element={<Workout/>}/>
        <Route path='/work/:id' element={<Workout/>}/>
        <Route path='/Create' element={<Create/>}/>
        <Route path='/Update/:id' element={<UpdateWorkout/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
