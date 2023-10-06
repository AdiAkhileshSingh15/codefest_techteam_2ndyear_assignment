import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UseFetch from './UseFetch'

const Dashboard = () => {
    const [title, setTitle] = useState(null)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(true)
    const baseurl = 'https://workoutapi-fjcr.onrender.com/api/'
    
    useEffect( () => {
        setTimeout( () => {
            axios.get('https://workoutapi-fjcr.onrender.com/api/workouts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
            })
            .then((res) => {
                setData(res.data);
                console.log(data);
                setError(null)
                setPending(false)
            })
            .catch((err) => {
                setError(err.message);
                setPending(false);
            })
        }, 100)
    }, [])

    return (
        <div className='dashboard'>
            <h2>Your WorkOut Space:</h2>
            <div style={{alignContent: 'end'}}>
                <Link to="/addworkout">Add WorkOut</Link>
            </div>
            {pending && <h4 style={{paddingTop: '20px'}}>Loading workouts...</h4>}
            {error && <h3>Error incurred...please retry</h3>}
            {!pending && <UseFetch />}
            {/* {!pending && (
                data.map((workout) => (
                    <div className="preview" key={workout._id}>
                        <h4>Exercise - {workout.title}</h4>
                        <h4>Reps - {workout.reps}</h4>
                        <h4>Load(kg) - {workout.load}</h4>
                        <Link to="./"></Link>
                    </div>
                ))
            )} */}
        </div>
    )
}

export default Dashboard;