import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UseFetch = () => {
    const [title, setTitle] = useState(null)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    
    useEffect( () => {
        axios.get('https://workoutapi-fjcr.onrender.com/api/workouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
        })
        .then((res) => {
            setData(res.data);
            console.log(data);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
        })
    }, [])

    return (
        <div className='fetchboard'>
            {data.map((workout) => (
                <div className="preview" key={workout._id}>
                    <Link to={`/dashboard/${workout._id}`} style={{backgroundColor: 'beige', fontWeight: '700', textDecoration: 'underline'}}>Exercise - {workout.title}</Link>
                    <h4>Reps - {workout.reps}</h4>
                    <h4>Load(kg) - {workout.load}</h4>
                </div>
            ))}
        </div>
    )
}

export default UseFetch;