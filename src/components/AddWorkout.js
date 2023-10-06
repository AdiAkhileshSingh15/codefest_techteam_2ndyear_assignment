import React, { useContext, useState } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';


const AddWorkout = (props) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [formerr, setFormerr] = useState('');


  const handleLoadChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setLoad(value);
  }
  const handleRepsChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setReps(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormerr('');
    if (!(title && load && reps)) {
      setFormerr('Fill all the fields!!!');
      return console.log(formerr);
    }

    axios.post('/workouts', {
      title,
      load: Number(load),
      reps: Number(reps)
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(() => {
        setLoad('');
        setTitle('');
        setReps('');
        setFormerr('');
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        setFormerr(err.response.data.error);
      })
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='px-4  bg-white shadow-md'>
        <h2 className='py-4 font-semibold px-2 text-lg'>Create a new Workout :</h2>
        {formerr && <p className='w-full bg-red-300 text-red-800 text-center py-2'>{formerr}</p>}
        <form>
          <label className='w-35'>Workout :</label>
          <input
            type='text'
            name='title'
            placeholder='Workout'
            autoComplete='off'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full bg-gray-300 px-2 py-2 mb-2 rounded-md pop'
          />
          <br />
          <label className='w-35'>Load :</label>
          <input
            type='text'
            name='load'
            placeholder='0'
            autoComplete='off'
            value={load}
            onChange={handleLoadChange}
            className='w-full bg-gray-300 px-2 py-2 mb-2 rounded-md pop'
          />
          <br />
          <label className='w-35'>Reps :</label>
          <input
            type='text'
            name='reps'
            placeholder='0'
            autoComplete='off'
            value={reps}
            onChange={handleRepsChange}
            className='w-full bg-gray-300 px-2 py-2 mb-2 rounded-md pop'
          />
          <br />
          <div className='flex justify-between px-4 py-4'>
            <button onClick={handleSubmit} className='w-50 px-4 bg-green-500 text-white rounded-md h-7  hover:bg-green-900 pop'>Create</button>
            <button onClick={() => props.setShowAddForm(false)} className='w-50 px-4 bg-red-700 text-white rounded-md h-7  hover:bg-red-900 pop'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddWorkout;