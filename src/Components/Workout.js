import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const Workout = () => {
  const baseUrl = 'https://workoutapi-fjcr.onrender.com/api';
  const history = useHistory();

  const [qtyl, setQtyl] = useState(0);
  const [qtyr, setQtyr] = useState(0);
  const [title, setTitle] = useState('');
  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleIncrementL = () => {
    setQtyl(Number(qtyl) + 1);
  };

  const handleIncrementR = () => {
    setQtyr(Number(qtyr) + 1);
  };

  const handleDecrementL = () => {
    setQtyl(Number(qtyl) - 1);
  };

  const handleDecrementR = () => {
    setQtyr(Number(qtyr) - 1);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const Addhandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseUrl}/workouts`,
        {
          title,
          load: Number(qtyl),
          reps: Number(qtyr),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        const { _id, title, reps, load, user_id, createdAt, updatedAt, __v } =
          res.data;
        localStorage.setItem('_id', _id);
        localStorage.setItem('title', title);
        localStorage.setItem('reps', reps);
        localStorage.setItem('load', load);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('createdAt', createdAt);
        localStorage.setItem('updatedAt', updatedAt);
        localStorage.setItem('__v', __v);

        setSuccessMessage('Workout Added');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 1500);

        setErr('');
      })
      .catch((err) => {
        if (err.response) {
          setErr('Please fill in all fields');
        } else {
          setErr('Request is not authorized');
        }
        setSuccessMessage('');
      });
  };

  const AllWorkout = () => {
    history.push('/AllWorkouts');
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
          New Workout
        </Typography>
        <form onSubmit={Addhandler} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={handleTitle}
          />
          <div>
            <label>Load:</label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleIncrementL}
            >
              +
            </Button>
            <TextField
              type="number"
              value={qtyl}
              onChange={(e) => setQtyl(e.target.value)}
              variant="outlined"
              inputProps={{ min: 0 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDecrementL}
            >
              -
            </Button>
          </div>
          <div>
            <label>Reps:</label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleIncrementR}
            >
              +
            </Button>
            <TextField
              type="number"
              value={qtyr}
              onChange={(e) => setQtyr(e.target.value)}
              variant="outlined"
              inputProps={{ min: 0 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDecrementR}
            >
              -
            </Button>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
          {err && <Alert severity="error">{err}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </form>
        <Button variant="contained" color="primary" onClick={AllWorkout}>
          Get all workout
        </Button>
      </Box>
    </Container>
  );
};

export default Workout;
