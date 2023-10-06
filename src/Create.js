import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CreateWorkout() {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [workout, setWorkout] = useState([]);
    const history = useHistory();
    const handleCreateWorkout = async (e) => {
        e.preventDefault();

        try {
            const workout_data = {
                title,
                reps: parseInt(reps),
                load: parseInt(load),
            };

            const token = localStorage.getItem('user-token');
            console.log(token);
            const API_BASE_URL = 'https://workoutapi-fjcr.onrender.com/api';

            const loadValue = parseFloat(workout_data.load);
            const repValue = parseFloat(workout_data.reps);
            if (isNaN(loadValue) || loadValue <= 0) {
                setError('Load must be a valid positive number');
                return;
            }
            if (isNaN(repValue) || repValue <= 0) {
                setError('Repitions must be a valid positive number');
                return;
            }

            await axios.post('https://workoutapi-fjcr.onrender.com/api/workouts', workout_data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setWorkout(response.data);
                    window.alert("Workout created successfully...");
                    history.push('/workouts');
                })
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while creating the workout.');
        }
    };

    return (
        <div className='backgnd'>
            <div className='create_wkt'>
                <h2 className='create_wkt_head'>Create Workout</h2>
                {error && <p className='error-message'>Error: {error}</p>}

                <form className='form'>
                    <label className='labels'>Title:</label>
                    <input
                        className='inputs'
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className='labels'>Load:</label>
                    <input
                        className='inputs'
                        type="float"
                        name="load"
                        value={load}
                        onChange={(e) => setLoad(e.target.value)}
                    />

                    <label className='labels'>Reps:</label>
                    <input
                        className='inputs'
                        type="float"
                        name="reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />

                    <button className='create-btn' onClick={handleCreateWorkout}>Create Workout</button>
                </form>
            </div>
        </div>
    );
}

export default CreateWorkout;
