import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const baseURL = "https://workoutapi-fjcr.onrender.com/api";
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setToken,setIsLoggedIn} = useContext(AuthContext); 
    const navigate = useNavigate();

    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?|]).+$");
    const checkPassword = (pass) => {
        if(pass.length===8 && re.test(pass)){
            return true;
        }
        else return false;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(!checkPassword(password)){
            window.alert('Password requirements:\nMinLength=8, MinUppercase=1, MinLowercase=1,\nMinNumbers=1, MinSymbols=1');
            return;
        }
        axios(`${baseURL}/user/login`,{
            method: 'post',
            data: {
                "email":email,
                "password":password
            }
        }).then((res) =>{
            localStorage.setItem("token",res.data.token);
            setIsLoggedIn(true);
            setToken(res.data.token);
            setEmail("");
            setPassword("");
            navigate("/");
        }).catch(err => {
            console.error(err);
            window.alert(err.response.data.error);
            setPassword("");
        })
    }
    return (
        <div className="loginform">
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                />
                <br/>
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                />
                <br/>
                <button 
                    type="submit"
                >Log In</button>
            </form>
            <span>Don't have an account? <Link to='/Signup'>Signup</Link></span>
        </div>
    );
}

export default LoginForm