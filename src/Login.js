import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from 'axios';
import './tailwind.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem("authtoken")) {
  //     history.push("/workouts");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(user);
    try {
      const data = await fetch("https://workoutapi-fjcr.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(user),
      });

      console.log(data);
      console.log(data.ok);
      if (data.ok) {
        const resdata = await data.json();
       const authtoken = resdata.token;
        localStorage.setItem("authtoken", authtoken);
        console.log(authtoken);
        // This is a common way to persist authentication tokens so that users can stay authenticated across page reloads or browser sessions.
        history.push("/workouts");
      } else {
        throw Error("Could Not Fetch Data"); //Let us see
      }
    } catch (error) {
      setError(error.message);
      console.log("error");
      ///SEE FOR ABORT ERRORS
    }
  };

  return (

    
    <>
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="input-box">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="bx bxs-lock-alt"></i>
      </div>
      <div className="remember-forgot" >
        <label>
          <input type="checkbox" />
          Remember Me
        </label>
        <a href="#">Forgot Password</a>
      </div>
      <button type="submit" className="btn">
        Login
      </button>
      <div className="register-link">
        <p>
          Dont have an account? <a href="#">Register</a>
        </p>
      </div>
    </form>
  </>
    
  );
};
export default Login;



