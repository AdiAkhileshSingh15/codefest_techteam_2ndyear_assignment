import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";


const WorkoutDisplay = ({workout,setWorkoutCount}) => {
    const baseURL = "https://workoutapi-fjcr.onrender.com/api";
    const {editId,setEditId,token} = useContext(AuthContext);
    const [load, setLoad] = useState(workout.load);
    const [reps,setReps] = useState(workout.reps);
    const oldLoad= workout.load;
    const oldReps= workout.reps;

    const handleEdit = () => {
        setEditId(workout._id);
    }

    const handleCancel = () => {
        setEditId("");
    }

    const handleDelete = () => {
        axios(`${baseURL}/workouts/${workout._id}`,
            {
                method: 'delete',
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(() => {
            setWorkoutCount(prev => prev - 1);
        }).catch(err => {
            window.alert(err.response.data.error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(oldLoad === load && oldReps === reps) return setEditId("");

        axios(`${baseURL}/workouts/${editId}`,{
            method:'patch',
            data:{
                "load":{load},
                "reps":{reps}
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setEditId("");
        }).catch(err => {
            window.alert(err.response.data.error);
        })
    }

    if(workout._id===editId)
    {
    return (
        <div className="workoutdisplay">
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Title</span><span>{workout.title}</span>
                </div>
                <div>
                    <label htmlFor="load">Load</label>
                    <input
                        type="text"
                        id="load"
                        value={load}
                        onChange={(e) => {setLoad(e.target.value)}}
                    />
                </div>
                <div>
                    <label htmlFor="reps">Reps</label>
                    <input 
                        type="text"
                        id="reps"
                        value={reps}
                        onChange={(e) => {setReps(e.target.value)}}
                    />
                </div>
                <button type="Submit">Save</button>
                <button
                    onClick={handleCancel}
                >Cancel</button>
            </form>
        </div>
    );
    }
    else
    {
    return(
        <div className="workoutdisplay">
            <div>
                <span>Title </span>
                <span>{workout.title}</span>
            </div>
            <div>
                <span>Load </span>
                <span>{workout.load}</span>
            </div>
            <div>
                <span>Reps </span>
                <span>{workout.reps}</span>
            </div>
            <button
                onClick={handleEdit}
            >Modify</button>
            <button
                onClick={handleDelete}
            >Delete</button>
        </div>
    );
    }
}

export default WorkoutDisplay