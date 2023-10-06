import { useState } from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./Navbar";

const Create = () => {
    const location = useLocation();
    const token = location.state.token;
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState(0);
    const [load, setLoad] = useState(0);
    const [successCreate, setSuccessCreate] = useState('')


    const handleSumit = (e) => {
        e.preventDefault();
        const workout = { title, reps, load };
        console.log(JSON.stringify(workout));

        fetch('https://workoutapi-fjcr.onrender.com/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(workout)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create workout');
                }
                return response.json();
            })
            .then((CreatedWorkoutObj) => {
                console.log('Created Workout:', CreatedWorkoutObj);
                setSuccessCreate("New Workout added successfully!!")
                setLoad(0);
                setReps(0);
                setTitle("");

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="create">
            <Navbar token={token} />
            <h2>Create here.</h2>
            <form onSubmit={handleSumit}>
                <div>

                    <label >Title:</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>

                    <label >Reps:</label>
                    <input
                        type="0"
                        required
                        value={reps}
                        onChange={(e) => setReps(Number(e.target.value))}
                    />
                </div>
                <div>

                    <label >Load:</label>
                    <input type="0"
                        required
                        value={load}
                        onChange={(e) => { setLoad(Number(e.target.value)) }}
                    />
                </div>

                <button>Add Workout</button>

            </form>
            <div>{successCreate}</div>
        </div>
    );
}

export default Create;