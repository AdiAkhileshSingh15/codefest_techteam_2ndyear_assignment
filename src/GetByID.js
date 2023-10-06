import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function GetWorkoutByID() {
  const { id } = useParams(); 
  const [workout, setWorkout] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  useEffect(() => {

    const token = localStorage.getItem('user-token');
    if(!token) {
        setError('Access token is missing.');
        return;
    }
    axios
      .get(`https://workoutapi-fjcr.onrender.com/api/workouts/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((response) => {
        setWorkout(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError('No such workout');
        } else {
          setError('An error occurred');
        }
      });
  }, [id]);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!workout) {
    return <p>Loading...</p>;
  }

  const handleDelete = () => {

    const token = localStorage.getItem('user-token');
  if (!token) {
    
    setError('Access token is missing.');
    return;
  }

    fetch('https://workoutapi-fjcr.onrender.com/api/workouts/' + id, {
      method : 'DELETE',
      headers: {
        Authorization:`Bearer ${token}`
      }
    }).then(() => {
      history.push('/getWorkouts');
    })
  }

  const handleUpdate = () => {
    history.push('/update/:id');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (
    <><div className='logout' >
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
      
    <div className="workout-details-container">
      <div className='workout-details-box'>
  <h1 className="workout-details-heading">Workout Details</h1>
  <p className="workout-title">Title: {workout.title}</p>
  <p className="workout-detail">Reps: {workout.reps}</p>
  <p className="workout-detail">Load: {workout.load} lbs</p>
  <p className="workout-detail">Created At: {workout.createdAt}</p>
  <p className="workout-detail">User ID: {workout.user_id}</p>
  <p className="workout-detail">Updated At: {workout.updatedAt}</p>
  <p className="workout-detail">__v:{workout.__v}</p>
  <button className="delete-button" onClick={handleDelete}>Delete</button>
  <Link to={`/update/${workout._id}`} className="update-button-link">
    <button className="update-button" onClick={handleUpdate}>Update</button>
  </Link>
  </div>
</div>
</>
  );
}

export default GetWorkoutByID;
