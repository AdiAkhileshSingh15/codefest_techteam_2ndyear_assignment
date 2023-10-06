import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useContext } from "react";
import {AuthContext} from './AuthContext';


const Navbar1 = () => {
    const {setToken} =useContext(AuthContext);
   
    const [searchid,setSearchid] =useState('');
    
    useEffect(() => {
        setSearchid(searchid);
    },[searchid]);
    const handleLogout=() => {
        setToken(null);
    }
    return ( 
        <nav className="navbar1">
            <h1>CodeFest Workouts</h1>
            <Link to ="/create">Add a New Workout</Link>
            <Link to = "/">
                <button onClick={handleLogout}>LOGOUT</button>
            </Link>
        </nav>
     );
}
 
export default Navbar1;