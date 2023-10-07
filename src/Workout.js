import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Workout = () => {
    const [exercise, setExercise] = useState(null)
    const [reps, setReps] = useState(0)
    const [load, setLoad] = useState(0)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
        }
        const profile = {"title": exercise, "load": Number(load), "reps": Number(reps)};
        axios.post('https://workoutapi-fjcr.onrender.com/api/workouts', profile, config)
        .then((res) => {
            setSuccess('Workout added, redirecting');
            setError(null);
            const {data} = res.data;
            console.log(data);
            setTimeout(() => {
                setSuccess(null);
                navigate('/dashboard');
            }, 700);
        })
        .catch((err) => {
            // console.log(err)
            if(err.response.status == 400){
                setError('Please fill in all fields');
            }
            else if(err.response.status == 401){
                setError('Request is not authorized');
            }
            setSuccess(false);
            setTimeout(() => {
                setError(null);
            }, 1500)
        })
    }

  return (
    <div className='workout'>
        <h3>New Workout</h3>
        <form onSubmit={handleSubmit}>
            <label>Exercise Name:</label>
            <div>
            <input
                type='text'
                placeholder='Name'
                required
                onChange={(e) => {
                    setExercise(e.target.value);
                }}
            />
            </div>
            <label>Number of reps: </label>
            <div>
            <input
                type='number'
                placeholder='reps'
                required
                onChange={(e) => {
                    setReps(e.target.value);
                }}
            />
            </div>
            <label>Load(kg):</label>
            <div>
            <input
                type='number'
                placeholder='Load'
                required
                onChange={(e) => {
                    setLoad(e.target.value);
                }}
            />
            </div>
            <div>
                <button type='submit'>
                    Add Workout
                </button>
            </div>
            <div>
                {error && (
                <div>
                    {error}
                </div>)}
                {success && (
                <div>
                    {success}
                </div>
                )}
            </div>
        </form>
    </div>
  )
}

export default Workout