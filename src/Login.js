import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const history = useHistory();

  async function login() {
    const requestBody = {
      email: Email,
      password: Password,
    };

    try {
      const response = await fetch("https://workoutapi-fjcr.onrender.com/api/user/login", {
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
          localStorage.setItem("user-email", result.email);
          localStorage.setItem("user-token", result.token);

          setError(null);
          history.push("/workouts");
          window.alert("Login successful!");
          
        } else {
          setError("Authentication response missing email or token");
        }
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (error) {
      setError("An error occurred during authentication");
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className='backgnd'>
      <h1 className='h11'>User Login</h1>
      <div className='User_info'>
        <input
          type='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          className='user_email'
        ></input>
        <br />
        <input
          type='password' 
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          className='user_pass'
        ></input>
        <br />
        <button className='btn-login' onClick={login}>Login</button>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  );
}

export default Login;













// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Box,
// } from '@mui/material';

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     minHeight: '100vh',
//   },
//   paper: {
//     padding: '20px',
//     width: '300px',
//   },
//   title: {
//     marginBottom: '20px',
//     fontWeight: 'bold',
//   },
//   input: {
//     marginBottom: '20px',
//   },
//   button: {
//     width: '100%',
//   },
//   errorMessage: {
//     color: 'red',
//   },
// };

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const history = useHistory();

//   async function login() {
//     const requestBody = {
//       email: email,
//       password: password,
//     };

//     try {
//       const response = await fetch("https://workoutapi-fjcr.onrender.com/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         if (result.email && result.token) {
//           // Authentication successful, store the email and token in localStorage
//           localStorage.setItem("user-email", result.email);
//           localStorage.setItem("user-token", result.token);

//           // Navigate to another route after successful login
//           setError(null);
//           history.push("/workouts");
//           window.alert("Login successful!");
          
//         } else {
//           // Handle unexpected response format if 'email' or 'token' properties are missing
//           setError("Authentication response missing email or token");
//         }
//       } else {
//         // Authentication failed, handle the error message from the response
//         const errorResponse = await response.json();
//         setError(errorResponse.error);
//       }
//     } catch (error) {
//       // Handle network or other errors
//       setError("An error occurred during authentication");
//       console.error("An error occurred:", error);
//     }
//   }


//   return (
//     <Container style={styles.container}>
//       <Paper elevation={3} style={styles.paper}>
//         <Typography variant="h4" style={styles.title}>
//           User Login
//         </Typography>
//         <TextField
//           type="email"
//           label="Email"
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />
//         <TextField
//           type="password"
//           label="Password"
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={login}
//           style={styles.button}
//         >
//           Login
//         </Button>
//         {error && <Typography style={styles.errorMessage}>{error}</Typography>}
//       </Paper>
//     </Container>
//   );
// }

// export default Login;
