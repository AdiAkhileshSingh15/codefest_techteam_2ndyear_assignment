import React, { useState,useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
  
  const [formData, setFormData] = useState({ email: '', password: '' });
 const history=useHistory();
 const {setToken} =useContext(AuthContext);
  const handleLogin =async(e) => {
    e.preventDefault();
    console.log(formData)
    const user = { email: formData.email, password: formData.password };
    console.log(JSON.stringify(user))

    fetch('https://workoutapi-fjcr.onrender.com/api/user/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/LoginError");
          throw new Error('Authentication failed');
        }
      })
      .then((data) => {
        setToken(data.token);
        history.push('/Myworkouts');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
