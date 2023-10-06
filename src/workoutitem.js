import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
const WorkoutItem = ({ workout,workouts,setWorkouts ,handleDelete, id }) => {
    const {token} =useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    const [updatedLoad, setUpdatedLoad] = useState(workout.load);
    const [updatedReps, setUpdatedReps] = useState(workout.reps);
   
    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        const apiUrl = `https://workoutapi-fjcr.onrender.com/api/workouts/${id}`;
        const updatedWorkout = {
            load: Number(updatedLoad),
            reps: Number(updatedReps),
        };
        const editworkout ={
            title:workout.title,
            load:Number(updatedLoad),
            reps:Number(updatedReps),
        }
        console.log(updatedWorkout);
        fetch(apiUrl, {
            method: 'PATCH',
            body: JSON.stringify(updatedWorkout), 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                return response.json(); // Parse the response JSON
            })
            .then((data) => {
                const updatedWorkouts = workouts.map((w) => {
                    if (w._id === id) {
                        return { ...w, ...editworkout };
                    }
                    return w;
                });
                
                
                setWorkouts(updatedWorkouts);
                
                setIsEditing(false); 
            })
            .catch((error) => {
                console.error('Error updating workout:', error);
            });
    };
    
    return (
        <div className="workout-item">
            {isEditing ? (
                <div>
                    <h1>Newload:</h1>
                    <input
                        type="number"
                        value={updatedLoad}
                        onChange={(e) => setUpdatedLoad(e.target.value)}
                    />
                    <h1>NewReps:</h1>
                    <input
                        type="number"
                        value={updatedReps}
                        onChange={(e) => setUpdatedReps(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleEditClick}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Title: {workout.title}</p>
                    <p>Load: {workout.load}</p>
                    <p>Reps: {workout.reps}</p>
                    <button onClick={() => handleDelete(id)}>DELETE</button>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default WorkoutItem;
