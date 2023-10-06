import { useEffect, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Home from "./Home";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const btnStyle = {
    backgroundColor: "blue"
}
const textStyle = {
    color: "green",
    fontSize:"15px"
}



const Login = () => {
    const [parcel, setParcel] = useState({email: '', password:''});
    const [loginStatus, setLoginStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const history = useHistory();

   
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
               // onLogin(token);

                history.push("/");
            } else {
                setLoginStatus(0);
                setMessage("Unsuccessful Log In");
            }
        })
        .catch(err => {
            console.log(err);
            setLoginStatus(0);
            setMessage( err.response.data.error);
        })
    }


    
    
    return ( 
        <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
              </h1>

              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                value={parcel.email}
                                onChange={(e) => setParcel({ ...parcel, email: e.target.value })}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                value={parcel.password}
                                onChange={(e) => setParcel({ ...parcel, password: e.target.value })}/>
                  </div>
                  
                  <div class="flex items-start">
                  <div className="text-xl font-bold"  style={textStyle}>{message}</div>
                 
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-800 hover:bg-primary-1100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" style={btnStyle} >Submit</button>

              </form>
          </div>
      </div>
  </div>
</section>
        
     )
}

export default Login;