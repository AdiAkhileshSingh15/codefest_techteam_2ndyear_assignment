import {FC, useState, useContext, ChangeEvent} from 'react'
import { submitHandlerType } from '../types/Utils';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { SignupFormProps } from '../types/Interfaces';


const SignupForm:FC<SignupFormProps> = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {setIsLoggedIn, setToken, successToast, errorToast} = useContext(AuthContext);
    const baseUrl: string | undefined= "https://workoutapi-fjcr.onrender.com/api";
    const navigate = useNavigate();

    const signupHandler: submitHandlerType = (e) => {
        e.preventDefault();
        if (!(email && password)) {
            return console.log("Fields can't be empty");
        } 
        axios.post(`${baseUrl}/user/signup`, {
            email, password
        })
        .then(res => {
            localStorage.setItem("token", res.data.token);
            setIsLoggedIn(true);
            setToken(res.data.token);
            successToast("Signup successful");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate("/");
            },2000);
        })
        .catch(err => {
            console.error(err)
            errorToast(err.response.data.error)
            setPassword("");
        })
    };
  return (
    <div className='drop-shadow-2xl flex flex-col items-center justify-center w-96 rounded-[35px] bg-gray-200 h-96 mt-16'>
        <form onSubmit={signupHandler} className='flex flex-col my-6 items-center'>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className='w-60 rounded-lg px-2 py-1 border-none my-4 focus:outline-none'
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className='w-60 rounded-lg px-2 py-1 border-none my-4 focus:outline-none'
                />
                <button type="submit" className='w-20 bg-blue-600 text-white rounded-md h-10 mx-3'>Sign Up</button>
        </form>
        <span>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
    </div>
  )
}

export default SignupForm