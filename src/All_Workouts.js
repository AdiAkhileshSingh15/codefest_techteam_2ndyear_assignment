import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LogoutButton from './Logout';

function AllWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
    const history = useHistory();

  async function fetchWorkouts() {
    try {
      const userToken = localStorage.getItem("user-token");
      if (!userToken) {
        setError("User token not found.");
        return;
      }
      const response = await fetch("https://workoutapi-fjcr.onrender.com/api/workouts", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
          "Accept": "application/json",
        },
      });
      console.log({userToken});
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

  const handleClick = async (e) => {    
        history.push("/workouts/create");
};


  return (
    <div className='back_gnd'>
    <div className='workouts_details'>
        <div className="top-bar">
        <LogoutButton />
      </div>
      <h1 className='i2'>All Workouts</h1>
      {error && <p className='error-message'>{error}</p>}
      <ul className='wkt_list'>
        {workouts.map((workout) => (
          <li className='wkt_itm' key={workout._id}>
            <Link to={`/workouts/${workout._id}`}>
            <h2 >{workout.title}</h2>
            </Link>
            <div className='info-container'>
            <p className='i1'>Reps: </p>
            <p className='i4'>{workout.reps}</p>
            </div>
            <div className='info-container'>
            <p className='i1'>Load: </p>
            <p className='i4'>{workout.load}</p>
            </div>
            <div className='info-container'>
            <p className='i1'>Created At: </p>
            <p className='i4'>{workout.createdAt}</p>
            </div>
            <div className='info-container'>
            <p className='i1'>Updated At: </p>
            <p className='i4'>{workout.updatedAt}</p>
            </div>
            <div className='info-container'>
            <p className='i1'>Workout id: </p>
            <p className='i4'>{workout._id}</p>
            </div>
            <div className='info-container'>
            <p className='i1'>__v: </p>
            <p className='i4'>{workout.__v}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='create_btn'>
      <button className='to_create' onClick={handleClick}>CREATE WORKOUT</button>
      </div>
   </div>
   </div>
  );
}

export default AllWorkouts;