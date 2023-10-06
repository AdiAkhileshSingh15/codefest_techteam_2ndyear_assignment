import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if the user is already logged in (token exists in local storage)
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Redirect to home if already logged in
      return;
    }

    // Send a POST request to your authentication API endpoint
    // Include the email and password in the request body
    try {
      const response = await fetch('https://workoutapi-fjcr.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your API returns a token upon successful login
        const token = data.token;
        // Store the token in local storage
        localStorage.setItem('token', token);
        navigate('/');
        // Redirect to the protected route or perform any other action
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message */}
      <input
        type="email"
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
      <button onClick={handleLogin}>Login</button>
      <p>Create an account? <button onClick={() => navigate('/Signup')}>Signup</button></p>
    </div>
  );
};

export default Login;
