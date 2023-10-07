import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UseFetch from './UseFetch';
import axios from 'axios';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);
    const [title, setTitle] = useState(null);
    const [reps, setReps] = useState(null);
    const [load, setLoad] = useState(null);

    useEffect(() => {
        axios.get('https://workoutapi-fjcr.onrender.com/api/workouts/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
        })
        .then((res) => {
            setData(res.data);
            console.log(data);
            setTitle(data.title);
            setReps(data.reps);
            setLoad(data.load);
            setError(null);
            setSuccess('Fetched workout!');
        })
        .catch((err) => {
            if(err.response.status == 401){
                setError('Request is not authorized');
            }
            else if(err.response.status == 404){
                setError('No such workout');
            }
        })
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(data);
        axios.patch('https://workoutapi-fjcr.onrender.com/api/workouts/' + id, {"load": Number(load), "reps": Number(reps)}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                }}
        )
        .then((res) => {
            setData(res.data);
            setError(null);
            setSuccess('Updated! Redirecting...')
            setTimeout(() => {
                setSuccess(null);
                navigate('/dashboard');
            }, 500);
        })
        .catch((err) => {
            if(err.response.status == 400){
                setError('Please fill in all fields');
            }
            else if(err.status == 401){
                setError('Request is not authorized');
            }
            else if(err.status == 404){
                setError('No such workout');
            }
            setSuccess(false);
            setTimeout(() => {
                setError(null);
            }, 1500)
        })
    }
    return (
        <div className="details">
           {error && (
           <div>
                <h4>{error}</h4>
                <Link to='/'>Home</Link>
           </div>)}
           {!success && !error && (
            <div>Fetching...</div>
           )}
           {success && (
            <div className='update'>
                <form onSubmit={handleUpdate}>
                    <label>Exercise Name:</label>
                    <div>
                        <strong>{data.title}</strong>
                    </div>
                    <label>Number of reps: </label>
                    <div>
                    <input
                        type='number'
                        placeholder={data.reps}
                        defaultValue={reps}
                        onChange={(e) => {
                            setReps(e.target.value);
                        }}
                    />
                    </div>
                    <label>Load(kg):</label>
                    <div>
                    <input
                        type='number'
                        placeholder={data.load}
                        defaultValue={load}
                        onChange={(e) => {
                            setLoad(e.target.value);
                        }}
                    />
                    </div>
                    <div>
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
           )}
        </div>
    )
}

export default Details