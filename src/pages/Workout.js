import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';


const Workout = () => {
  const { _id } = useParams();
  const [workout, setWorkout] = useState({});
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [err, setErr] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/workouts/' + _id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        setWorkout(res.data);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      })
  })

  const handleLoadChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setLoad(value);
  }
  const handleRepsChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setReps(value);
  }


  const handleDelete = (e) => {
    axios.delete('/workouts/' + _id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        console.log(err);
        navigate('/')
      })
  }

  const handleEdit = (e) => {
    e.preventDefault();

    if (load == workout.load && reps == workout.reps) {
      setLoad('');
      setReps('');
      setShowUpdate(false);
      return;
    }
    if (!(load && reps)) {
      setErr('Fields cannot be empty!!!');
      return console.log(err);
    }

    axios.patch('/workouts/' + _id, {
      load: Number(load),
      reps: Number(reps)
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        setWorkout(res.data);
        setLoad('');
        setReps('')
        setErr('');
        setShowUpdate(false);
      })
      .catch(err => {
        console.log(err);
        setShowUpdate(false)
        setLoad('');
        setReps('');
        setErr('Something went wrong')
      })
  }


  return (
    <div className=' flex justify-center'>{
      showUpdate ?
        <form className='w-96 my-40 bg-white flex flex-col items-center shadow-md ' onSubmit={handleEdit}>
          {err && <p className='w-full bg-red-300 text-red-800 text-center py-2'>{err}</p>}
          <p className='px-4 py-6'><span className='w-50 text-lg bg-black text-center shadow-lg py-2 px-2 rounded-lg text-white'>Workout</span>  {workout.title}</p>
          <label className='py-4'><span className='w-32 text-lg bg-gray-700 text-center shadow-lg py-2 px-2 rounded-lg text-white'>Load</span></label>
          <input
            type="text"
            name='load'
            placeholder={JSON.stringify(workout.load)}
            autoComplete='off'
            value={load}
            onChange={handleLoadChange}
            className='w-52 bg-gray-300 px-2 py-2 mb-2 rounded-md pop'
          />
          <label className='py-4'><span className='w-32 text-lg bg-gray-700 text-center shadow-lg py-2 px-2 rounded-lg text-white'>Reps</span></label>
          <input
            type='text'
            name='reps'
            autoComplete='off'
            placeholder={JSON.stringify(workout.reps)}
            value={reps}
            onChange={handleRepsChange}
            className='w-52 bg-gray-300 px-2 py-2 mb-2 rounded-md pop'
          />
          <button type='submit' className='w-50 px-4 mb-4 bg-green-500 text-white rounded-sm h-7  hover:bg-green-900 pop'>Edit</button>
          <button onClick={() => setShowUpdate(false)} className='w-50 px-4 mb-4 bg-red-700 text-white rounded-sm h-7 hover:bg-red-900 pop'> Cancel </button>
        </form>
        :
        <div className='w-96 my-40 bg-white items-center shadow-md rounded-md '>
          <div className='flex flex-col items-center px-10 py-4'>
            <p className='py-2'><span className='w-50 text-lg bg-black text-center shadow-lg py-2 px-2 rounded-lg text-white'>Workout</span> {workout.title}</p>
            <p className='py-2'><span className='w-50 text-lg bg-gray-700 text-center shadow-lg py-2 px-2 rounded-lg text-white'>Load</span> {workout.load}</p>
            <p className='py-2'><span className='w-50 text-lg bg-gray-700 text-center shadow-lg py-2 px-2 rounded-lg text-white'>Reps</span> {workout.reps}</p>
          </div>
          <div className='flex justify-between px-4 py-4'>
            <button className='w-50 px-4 bg-green-500 text-white rounded-sm h-7  hover:bg-green-900 pop' onClick={() => setShowUpdate(true)}>Edit</button>
            <button  className='w-50 px-4 bg-red-700 text-white rounded-sm h-7 hover:bg-red-900 pop' onClick={() => setShowDelete(true)} >Delete</button>
          </div>
            {showDelete && <p className='px-2 top-2 mb-4'>Are you sure?? <button onClick={handleDelete} className='hover:text-red-600'>Yes</button> <button onClick={() => setShowDelete(false)} className='hover:text-green-500'>No</button></p>}
            <button onClick={() => navigate('/')} className='px-4 hover:text-blue-500 py-4 mb-4'>GoBack</button>
        </div>
    }</div>
  )
}

export default Workout;