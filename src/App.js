import "./App.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Home_page from "./Components/Home_page";
import Signup from "./Components/Signup";
import User_interface from "./Components/User_interface";


import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar title="WorkOut-Buddy" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home_page />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/User_interface" element={<User_interface />} />
        </Routes>
    </div>
  );
}
export default App;
