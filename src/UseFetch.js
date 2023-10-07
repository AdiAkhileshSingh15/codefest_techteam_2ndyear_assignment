import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const UseFetch = () => {
    const [title, setTitle] = useState(null)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const Refresh = () => {window.location.reload(true);}
    const baseurl = 'https://workoutapi-fjcr.onrender.com/api/workouts/';

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

    const handleDelete = (id) => {
        axios.delete(`${baseurl}` + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
        })
        .then(() => {
            Refresh()
        })
        .catch((err) => {
            console.log(err);
            if(err.response.status == 401){
                setError('Request is not authorized');
            }
            else if(err.response.status == 404){
                setError('No such workout');
            }
        })
    }

    return (
        <div className='fetchboard'>
            {data.map((workout) => (
                <div className="preview" key={workout._id}>
                    <h4>Exercise - {workout.title}</h4>
                    <h4>Reps - {workout.reps}</h4>
                    <h4>Load(kg) - {workout.load}</h4>
                    <span>
                        <button onClick={() => handleDelete(`${workout._id}`)}>Delete</button>
                    </span>
                    <span>
                        {/* <Link to={`/dashboard/${workout._id}`} style={{backgroundColor: 'beige', fontWeight: '700', textDecoration: 'underline'}}>Update</Link> */}
                        <Link to={`/dashboard/${workout._id}`} style={{backgroundColor: 'pink', borderRadius: '7px', position: 'relative', bottom: '-4px', right: '-20px', padding: '6px', border: '0px'}}>Update</Link>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default UseFetch;