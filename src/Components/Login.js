import { useState } from "react";
import axios from "axios";
import Home from "./Home";
import Cookies from "js-cookie";

const Login = () => {
    const [parcel, setParcel] = useState({email: '', password:''});
    const [loginStatus, setLoginStatus] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('https://workoutapi-fjcr.onrender.com/api/user/login', parcel)
        .then(res => {
            if(res.status === 200)
            {
                setLoginStatus(1);
                Cookies.set("email", res.data.email);
                Cookies.set('token', res.data.token);
                setMessage("Successfully Logged In");

                <Home />
            } else {
                setLoginStatus(0);
                setMessage("Unsuccessful Log In");
            }
        })
        .catch(err => {
            console.log(err);
            setLoginStatus(0);
            setMessage("Unexpected Error: " + err.response.data.error);
        })
    }

    return ( 
        <div>
            <div className="flex flex-col justify-center items-center text-2xl">

                Login Page
                
            </div>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
                    <div className="text-xl font-bold">{message}</div>
                    <br /> 
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                        >
                        Email
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value = {parcel.email}
                        onChange={(e) => setParcel({...parcel, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                        >
                        Password
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value = {parcel.password}
                        onChange={(e) => setParcel({...parcel, password: e.target.value})}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                        className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        >
                        Log In
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        
     )
}

export default Login;