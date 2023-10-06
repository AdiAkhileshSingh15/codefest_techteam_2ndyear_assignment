import {FC} from 'react'
import './styles/App.css'
import {Route, Routes} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import "./styles/App.css"

const App:FC = () => {

  return (
    <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='/signup' Component={Signup}></Route>
      <Route path='/login' Component={Login}></Route>
    </Routes>
  )
}

export default App
