import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Workouts from './components/Workouts';
import SignUp_page from './components/SignUp_page';
import Login_page from './components/Login_page';
import UpdateWorkout from './components/UpdateWorkout';
import { Route,Routes } from 'react-router-dom';
import WorkoutItem from './components/WorkoutItem';
import Add from './components/Add';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/Login" element ={<Login_page/>}/>
      <Route path="/Signup" element ={<SignUp_page/>}/>
      <Route path="/workout" element={<Workouts/>} />
      <Route path="/update/:id" element={<UpdateWorkout/>} />
      <Route path="/Add" element={<Add/>} />
    </Routes>
    </>
  );
}

export default App;
