import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

const Edit = () => {
    const location = useLocation();
    const token = location.state.token;
    const workout = location.state.workout;
    const [title, setTitle] = useState(workout.title);
    const [reps, setReps] = useState(workout.reps);
    const [load, setLoad] = useState(workout.load);
    const [successEdit, setSuccessEdit] = useState("");

    const saveChanges = (e) => {
        e.preventDefault();
        const newWorkout = { reps, load }

        fetch('https://workoutapi-fjcr.onrender.com/api/workouts/' + workout._id,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newWorkout)
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create workout');
                }
                return response.json();
            })
            .then((UpdatedWorkoutObj) => {
                console.log('Edited Workout:', UpdatedWorkoutObj);
                setSuccessEdit("Workout edited successfully!!");

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <Navbar token={token} />
            <div className="edit">

                <h2>Edit Here!</h2>
                <p>Title:{title}</p>
                <form onSubmit={saveChanges}>
                    <label >Reps:</label>
                    <input
                        type="number"
                        required
                        value={reps}
                        onChange={(e) => setReps(Number(e.target.value))}
                    />
                    <label >Load:</label>
                    <input
                        type="number"
                        required
                        value={load}
                        onChange={(e) => setLoad(Number(e.target.value))}
                    />
                    <button>Save Changes</button>
                </form>
                <div className="success-edit">{successEdit}</div>
            </div>
        </div>
    );
}

export default Edit;