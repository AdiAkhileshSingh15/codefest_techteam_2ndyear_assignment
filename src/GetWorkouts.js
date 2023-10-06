import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function AllWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  async function fetchWorkouts() {
    try {
      const userToken = localStorage.getItem("user-token");
      console.log(userToken)
      const response = await fetch("https://workoutapi-fjcr.onrender.com/api/workouts", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
          "Accept": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setWorkouts(result); 
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (error) {
      setError("An error occurred during the request");
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    fetchWorkouts(); 
  }, []);

  console.log(workouts);
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  }
  return (
    <>

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
              <Link to="./newWorkout">
              <button className='logout-button'>Create Workout</button> 
              </Link>
              <div style={{ marginLeft: '10px' }}>
              {/* Adjust the 'marginLeft' value to control the spacing */}
                </div>
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

    <div className='workouts-top-container'>
    <div className='workouts-container'>
      <h1 className="workouts-heading">All Workouts</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="workouts-list">
        {workouts.map((workout) => (
          <li key={workout._id} className="workout-item">
            <div className='workout-details'>
            
            <h2 className="workout-title">{workout.title}</h2>
           
            <p className="workout-info">Workout_id: {workout._id}</p>
            <p className="workout-info">Reps: {workout.reps}</p>
            <p className="workout-info">Load: {workout.load}</p>
            <p className="workout-info">Created At: {workout.createdAt}</p>
            <p className="workout-info">Updated At: {workout.updatedAt}</p>
            <Link to={`/getbyid/${workout._id}`}>
            <button className='logout-button'>Go to Workout</button> </Link>
          </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
  );
}

export default AllWorkouts;

