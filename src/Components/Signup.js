import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
    const history = useHistory();
    const [message, setMessage] = useState(null);
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [signupStatus, setSignupStatus] = useState(null);
    const baseUrl = "https://workoutapi-fjcr.onrender.com/api";
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post(`${baseUrl}/user/signup`, credentials)
        .then(response => {
            Cookies.set("authToken", response.data.token, { expires: 7 });
            Cookies.set("authEmail", response.data.email, { expires: 7 });

            if(response.status === 200) {
                setSignupStatus('success');
                setMessage("Signup successful! Logging In...");

                setTimeout(() => {
                    history.push('/');
                    window.location.reload();
                }, 1500);
            } else {
                setSignupStatus("failure");
                Cookies.remove('authToken');
                Cookies.remove('authEmail');
            }
        })
        .catch(error => {
            console.error(error);
            setSignupStatus("failure");
            setMessage("Signup failed. Error Message: " + error.response.data.error);
            console.log(error.response.data.error);
        })
    };


    return (
    <div className="default-body">
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up a new account
                </h2>
            </div>

            {!(signupStatus === 'success') && (
              <React.Fragment>
                <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                            Email address
                            </label>
                            <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                            Password
                            </label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <br />
                <p className="text-orange-600 text-lg">{message}</p>
              </React.Fragment>
            )}

            {(signupStatus === 'success') && (
                <React.Fragment>
                    <div className="text-xl text-center font-medium poppins">{message}</div>
                </React.Fragment>
            )}
            
        </div>
    </div>
  );
}
 
export default Signup;