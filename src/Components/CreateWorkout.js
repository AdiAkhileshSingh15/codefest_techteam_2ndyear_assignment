import axios from "axios";
import { useContext,useState } from "react";
import { AuthContext } from "../contexts/AuthContext";


const CreateWorkout = ({setWorkoutCount}) => {
    const baseURL="https://workoutapi-fjcr.onrender.com/api";
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps,setReps] = useState("");
    const {token} = useContext(AuthContext)

    const handleCreateWorkout = (e) => {
        e.preventDefault();
        axios(`${baseURL}/workouts`,{
            method:"post",
            data:{
                "title": title,
                "load":Number(load),
                "reps":Number(reps)
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setWorkoutCount(prev => prev+1);
            setLoad("");
            setReps("");
            setTitle("");
        }).catch(err => {
            window.alert(err.response.data.error);
        })
    }

    return (
        <div className="createworkout">
            <form onSubmit={handleCreateWorkout}>
                <div>
                    <label htmlFor="ctitle">Title</label>
                    <input
                        type="text"
                        id="ctitle"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                </div>
                <div>
                    <label htmlFor="cload">Load</label>
                    <input
                        type="text"
                        id="cload"
                        value={load}
                        onChange={(e) => {setLoad(e.target.value)}}
                    />
                </div>
                <div>
                    <label htmlFor="creps">Reps</label>
                    <input
                        type="text"
                        id="creps"
                        value={reps}
                        onChange={(e) => {setReps(e.target.value)}}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateWorkout