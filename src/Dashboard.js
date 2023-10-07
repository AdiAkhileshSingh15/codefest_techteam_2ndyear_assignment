import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import UseFetch from './UseFetch'

const Dashboard = () => {
    const [title, setTitle] = useState(null)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(true)
    const baseurl = 'https://workoutapi-fjcr.onrender.com/api/'
    const navigate = useNavigate();
    
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
                if(err.response.status == 401){
                    setError('Request is not authorized');
                }
                setPending(false);
            })
        }, 100)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert('bye');
        navigate('/');
    }
    return (
        <div className='dashboard'>
            <h2>Your WorkOut Space:</h2>
            <div style={{alignContent: 'end'}}>
                {!error && <Link to="/addworkout">Add WorkOut</Link>}
            </div>
            {pending && <h4 style={{paddingTop: '20px'}}>Loading workouts...</h4>}
            {error && (<div style={{paddingTop: '10px'}}>
                <h4>{error}</h4>
                <Link to='/' style={{position: 'relative', bottom: '-10px', color: 'darkblue'}}>Home</Link>
                </div>)}
            {!pending && <UseFetch />}
            {!error && <button onClick={handleLogout}>Log Out</button>}
        </div>
    )
}

export default Dashboard;