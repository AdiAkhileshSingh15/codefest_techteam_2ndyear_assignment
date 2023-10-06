import WorkoutItem from "./workoutitem";
import { useState ,useEffect} from "react";
const Workoutlist = ({workouts,setWorkouts,handleDelete,title}) => {
    const [workout,setWorkout] =useState([])
    useEffect(() => {
        setWorkout(workout);
        console.log(workout);
    },[workout]);
    return ( 
        <div className="-list">
            <h2>{title}</h2>
            {workouts.map((workout)=>(
                <div className="workout-preview" key={workout._id}>
                    <WorkoutItem workout={workout} workouts={workouts} setWorkouts={setWorkouts} handleDelete={handleDelete} id={workout._id} />
                </div>
            ))}
        </div>
     );
}
 
export default Workoutlist;