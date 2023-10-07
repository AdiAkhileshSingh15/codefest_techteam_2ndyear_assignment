import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://workoutapi-fjcr.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("user-token",token);
        history.push('/workout');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<div className="container">
      {token ? (
        <div className="login-success">
          <p className="title">Login Successful!</p>
          <p className="token">Token: {token}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="row">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="row">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
