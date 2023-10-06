import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const [error, setError] = useState(null);
    const history = useHistory();
    const { id } = useParams(); 
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [title, setTitle] = useState(""); 
    const [workout, setWorkout] = useState({});
    const token = localStorage.getItem("user-token");

    useEffect(() => {
        if (!token) {
            setError('Access token is missing');
            return;
        }

        const fetchWorkout = async () => {
            try {
                const response = await axios.get(
                    `https://workoutapi-fjcr.onrender.com/api/workouts/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setWorkout(response.data);
                setTitle(response.data.title); 
                setReps(response.data.reps.toString());
                setLoad(response.data.load.toString());
            } catch (error) {
                console.error("Error fetching workout:", error);
                setError("An error occurred while fetching the workout.");
            }
        };

        fetchWorkout();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(reps) || isNaN(load) || reps <= 0 || load <= 0) {
            setError("Reps and Load must be positive numbers");
            return;
        }

        try {
            const workoutData = {
                reps: parseInt(reps),
                load: parseInt(load),
            };

            const response = await axios.patch(
                `https://workoutapi-fjcr.onrender.com/api/workouts/${id}`,
                workoutData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                window.alert("Updated Successfully...")
                setError(null); 
                history.push("/workouts");
            }
        } catch (error) {
            console.error("Error updating workout:", error);
            setError("An error occurred while updating the workout.");
        }
    };

    return (
        <div className="backgnd">
            <form onSubmit={handleSubmit} className="workout-form">
                <label>
                    <span className="initial-title">{workout.title}</span>
                </label>
                <br />
                <label>
                    <span className="input-label">Reps:</span>
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        className="input"
                    />
                </label>
                <br />
                <label>
                    <span className="input-label">Load:</span>
                    <input
                        type="number"
                        value={load}
                        onChange={(e) => setLoad(e.target.value)}
                        className="input"
                    />
                </label>
                <br />
                <button type="submit" className="submit-button">
                    Update Workout
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Update;
