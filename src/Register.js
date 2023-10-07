import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./register.css";

function Register() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const history = useHistory();
  
    async function signUp() {
      const requestBody = {
        email: Email,
        password: Password,
      };
  
      try {
        const response = await fetch("https://workoutapi-fjcr.onrender.com/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const result = await response.json();
  
          if (result.email && result.token) {
            //setIsAuthenticated(true);
            alert(`Registration successful\nEmail: ${result.email}\nToken: ${result.token}`);
            history.push("/login");
  
          } else {
            setError("Registration response missing email or token");
          }
        } else {
          const errorResponse = await response.json();
          setError(`Registration failed: ${errorResponse.error}`);
        }
      } catch (error) {
        setError("An error occurred during registration");
        console.error("An error occurred:", error);
      }
    }
  
    return (
      <div className="container">
        <div className="wrapper">
          <div className="title">Register</div>
          <form>
            <div className="row">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button">
              <input type="submit" value="Sign Up" onClick={signUp} />
            </div>
            {error && <p className="pass">{error}</p>}
          </form>
          <p className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    );
    
  }
  
  export default Register;