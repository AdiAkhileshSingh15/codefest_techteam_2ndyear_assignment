import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const baseUrl = 'https://workoutapi-fjcr.onrender.com/api';

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        const { token } = res.data;

        localStorage.setItem('email', email);
        localStorage.setItem('token', token);

        setSuccessMessage('Login successful. Redirecting...');
        setTimeout(() => {
          setSuccessMessage(null);
          history.push('/Workout');
        }, 1500);
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
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
            Login
          </Button>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/" color="primary">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
