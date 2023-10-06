
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function CreateWorkout() {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const token = localStorage.getItem('user-token'); 
  const [workout, setWorkouts] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
  e.preventDefault();

    try {
      const workoutData = {
        title,
        reps: parseInt(reps),
        load: parseInt(load),
      };
      console.log(token)
      
      await axios.post('https://workoutapi-fjcr.onrender.com/api/workouts', workoutData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWorkouts(response.data);

        setTitle('');
        setLoad('');
        setReps('');
      })
      
    } catch (error) {
      console.error('Error creating workout:', error);
    }
    
  };

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
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

    <div className='signup-container'>
    <div className='create-workout'>
      <h1>Create Workout</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Title:<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Reps:
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
        </label>
        <br />
        <label>
          Load:
          <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
        </label>
        <br />
        <button type="submit" className="submit-button">Create Workout</button>
      </form>
      <br /><br />
      <div className='all_wk-button'>
      <Link to={'/getWorkouts'}> <button>All workouts</button></Link>
      </div>
    </div>
    </div>
    </>
  );
}

export default CreateWorkout;

