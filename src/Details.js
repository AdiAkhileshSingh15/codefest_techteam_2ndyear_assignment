import React from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UseFetch from './UseFetch';
import axios from 'axios';

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    axios.get('https://workoutapi-fjcr.onrender.com/api/workouts/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }}
    )
    .then((res) => {
        setData(res.data);
        setError(null);
    })
    .catch((err) => {
        if(err.status == 401){
            setError('Request is not authorized');
        }
        else if(err.status == 404){
            setError('No such workout');
        }
    })
    return (
        <div className="details">
           {error && (
           <div>
                {error}
           </div>)}
           {!error && (
            <div>
                <div className='wk-preview'>
                    <h2>Exercise: {data.title}</h2>
                    <h2>Reps: {data.reps}</h2>
                    <h2>Load(kg): {data.load}</h2>
                </div>
                <div>
                    <button onClick={handleDelete}>Delete Workout</button>
                </div>
                <div>
                    <button onClick={handleUpdate}>Delete Workout</button>
                </div>              
            </div>
           )}
        </div>
    )
}

export default Details