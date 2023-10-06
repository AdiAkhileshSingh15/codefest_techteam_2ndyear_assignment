import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import AddWorkout from './AddWorkout';
import { Link } from 'react-router-dom';


const WorkoutList = () => {
  const { token } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddButton = () => {
    setShowAddForm(true);
  }

  useEffect(() => {
    axios.get('/workouts', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        setWorkouts(res.data);
      });
  }, [workouts])



  return (
    <div className='w-full'>
      <h1 className='text-center py-16 text-3xl font-bold'>{workouts.length ? 'Your Workouts' : 'You have no workouts...'}</h1>
      
      { showAddForm ? <AddWorkout setShowAddForm={setShowAddForm}/> : <div className='flex justify-center'>
        <button onClick={ handleAddButton }  className='w-32 h-10 rounded-md text-white bg-green-500 shadow-2xl hover:bg-green-800 pop'>ADD WORKOUT</button>
      </div>}

      <div className='flex flex-col items-center py-10 space-y-4'>

        {
          workouts.map((workout) => (
          <Link key={workout._id} to={ '/workout/' + workout._id }>
            <div  className='w-80 px-4 py-4 bg-white shadow-md rounded-md pop'>
              <p className='py-2'><span className='w-50 text-lg bg-black text-center shadow-lg py-2 px-2 rounded-lg text-white'>Workout</span> {workout.title}</p>
              <p className='py-2'><span className='w-50 text-lg bg-gray-700 text-center shadow-lg py-2 px-2 rounded-lg text-white'>Load</span> {workout.load}</p>
              <p className='py-2'><span className='w-50 text-lg bg-gray-700 text-center shadow-lg py-2 px-2 rounded-lg text-white'>Reps</span> {workout.reps}</p>
            </div>
          </Link>
          ))
        }
      </div>
    </div>
  )
  
}

export default WorkoutList;