import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Home = () => {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    axios
      .post('https://workoutapi-fjcr.onrender.com/api/user/signup', {
        email,
        password,
      })
      .then((res) => {
        const { token } = res.data;

        localStorage.setItem('email', email);
        localStorage.setItem('token', token);

        setSuccessMessage('Sign Up Successful. Redirecting...');

        setTimeout(() => {
          history.push('/Workout');
        }, 2000);

        setError(null);
      })
      .catch((error) => {
        if (error.response) {
          setError('Invalid email or password. Please try again.');
        } else if (error.request) {
          setError('Network error. Please try again later.');
        } else if (error.message) {
          setError('An unexpected error occurred. Please try again.');
        }

        setSuccessMessage(null);

        setTimeout(() => {
          setError(null);
        }, 1500);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Our Website
        </Typography>
        <form onSubmit={handleSignin} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          <Typography variant="body2">
            Already Have an Account?{' '}
            <Link href="/Login" color="primary">
              Sign In
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Home;
