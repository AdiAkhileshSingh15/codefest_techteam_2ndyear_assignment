import { useState , useContext} from "react"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContext"
import { Link , useNavigate} from "react-router-dom";

const SignupForm = () => {
    const baseURL="https://workoutapi-fjcr.onrender.com/api";
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {setIsLoggedIn,setToken}= useContext(AuthContext);
    const navigate = useNavigate();
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?|]).+$");
    const checkPassword = (pass) => {
        if(pass.length===8 && re.test(pass)){
            return true;
        }
        else return false;
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if(!checkPassword(password)){
            window.alert('Password requirements:\nMinLength=8, MinUppercase=1, MinLowercase=1,\nMinNumbers=1, MinSymbols=1');
            return;
        }
        axios(`${baseURL}/user/signup`,
            {
                method: 'post',
                data: {
                    "email":email,
                    "password":password
                }
            }
        ).then((res)=>{
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
       <div className="signupform">
            <form onSubmit={handleSignup}>
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
                >Sign Up</button>
            </form>
            <span>Already have an account? <Link to='/login'>Login</Link></span>
       </div> 
    )
}

export default SignupForm