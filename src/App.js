import Login from './components/loginsignup/Login.jsx';
import Signup from './components/loginsignup/Signup.jsx';
import Workout from './components/Workout.jsx'
import {  Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate=useNavigate();
  return (
   <>
   <Routes>
      <Route exact path='/' element={<Login></Login>}/> 
        <Route exact path='/Login' element={<Login></Login>}/> 
         <Route exact path='/Signup' element={<Signup></Signup>}/>
        <Route exact path='/Workout' element={<Workout></Workout>}/> 
        {/* <Route exact path='/AddWorkout' element={<AddWorkout></AddWorkout>}/> */}
        
      </Routes>
   </>
  );
}

export default App;
