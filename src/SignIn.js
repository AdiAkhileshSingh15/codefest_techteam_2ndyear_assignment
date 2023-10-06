import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://workoutapi-fjcr.onrender.com/api/user/login",
        {
          email,
          password,
        }
      )
      
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("user-token", token);
      setIsLoggedIn(true);
      window.alert("Login successful!");
    } catch (error) {
      setError("Invalid email or password");
    }
    
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (
    <div className="sign-in">
      {isLoggedIn ? (<>

        <div className='logout' >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="nav-bar">
          <div className="top-left">
            <div className="dumbell">
            <i class="fa-solid fa-dumbbell">Workout Buddy</i>
            </div>
          </div>
          <div className="top-right">
            <div className="nav-links">
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="signup-container">
        <div className="signup-form">
          <h1>Welcome to Workout BUDDY</h1> <br /><br />
          <Link to={'/newWorkout'}> <button>Create A New Workout</button> </Link>
          <br /><br />
          <Link to={'/getWorkouts'}> <button>Get All Workouts</button> </Link>
        </div>
        </div>
        </>
      ) : (
        <div>
          <div className="error">{error}</div>
          <div className='logout' >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="nav-bar">
          <div className="top-left">
            <div className="dumbell">
            <i class="fa-solid fa-dumbbell">Workout Buddy</i>
            </div>
          </div>
        </div>
      </div>
          <div className="signup-container">
            <div className="signup-form">
          <h1>Sign In</h1>
          <br />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;




