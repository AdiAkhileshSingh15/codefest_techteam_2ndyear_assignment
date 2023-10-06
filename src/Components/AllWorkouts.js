import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const AllWorkouts = () => {
  const baseUrl = "https://workoutapi-fjcr.onrender.com/api";
  const [data, setData] = useState([]);

  function handleWorkouts() {
    axios
      .get(`${baseUrl}/workouts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }

  useEffect(() => {
    handleWorkouts();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Your Workouts
        </Typography>
        {data.map((info) => (
          <Paper key={info._id} elevation={1} style={{ padding: '16px', marginBottom: '16px' }}>
            <Link to={`/Workoutdetails/${info._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" gutterBottom>
                Title: {info.title}
              </Typography>
            </Link>
            <Typography variant="body1" gutterBottom>
              Load: {info.load}
            </Typography>
            <Typography variant="body1">
              Reps: {info.reps}
            </Typography>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default AllWorkouts;
