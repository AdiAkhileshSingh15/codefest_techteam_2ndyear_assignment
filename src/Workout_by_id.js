import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function GetWorkoutByID() {
    const { id } = useParams(); 
    const [workout, setWorkout] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();
    useEffect(() => {
        async function fetchWorkout() {
            try {
                const token = localStorage.getItem('user-token');
                if (!token) {
                    setError('Access token is missing');
                    return;
                }

                const API_BASE_URL = 'https://workoutapi-fjcr.onrender.com/api';

                const response = await axios.get(`${API_BASE_URL}/workouts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                setWorkout(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('No such workout');
                } else {
                    console.error('API Error:', error.message);
                    setError('An error occurred');
                }
            }
        }

        fetchWorkout();
    }, [id]);

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!workout) {
        return <p>Loading...</p>;
    }

    const deleteWorkout = async () => {
        try {
            const token = localStorage.getItem('user-token'); 

            if (!token) {
                setError('Access token is missing');
                return;
            }

            const API_BASE_URL = 'https://workoutapi-fjcr.onrender.com/api';

            await fetch(`${API_BASE_URL}/workouts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(() => {
                    window.alert("Workout deleted successfully...")
                    history.push('/workouts');
                })
        } catch (error) {
            setError('An error occurred while deleting the workout.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='backgnd'>
            <div className='create_wkt'>
                <h1>Workout Details</h1>
                <p>Title: {workout.title}</p>
                <p>Reps: {workout.reps}</p>
                <p>Load: {workout.load} lbs</p>
                <p>Created At: {workout.createdAt}</p>
                <p>User ID: {workout.user_id}</p>
                <p>Updated At: {workout.updatedAt}</p>
                <p>__v: {workout.__v}</p>
                <button className='delete' onClick={deleteWorkout}>DELETE</button>
                <Link to={`/workouts/update/${workout._id}`}>
                    <button className='update' >UPDATE</button>
                </Link>
                <Link to={`/workouts`}>
                    <button className='back' >ALL WORKOUTS</button>
                </Link>
            </div>
        </div>
    );
}

export default GetWorkoutByID;


