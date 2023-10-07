import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import useFetch from './Fetch';
import {Link} from 'react-router-dom';
// import DeleteWorkout from './Delete';
const WorkoutDetail = () => {
    const {id} = useParams();//use of hook
    const {data:workout,isLoading,error} = useFetch('https://workoutapi-fjcr.onrender.com/api/workouts/'+id);
    console.log(workout);
    const history = useHistory();
    const authtoken = localStorage.getItem("authtoken");

    const handleDelete = () =>{
        fetch('https://workoutapi-fjcr.onrender.com/api/workouts/'+ workout._id,{
            method:"DELETE",
            headers:{
                authorization: `Bearer ${authtoken}`
            }
        }).then(()=>{
            console.log("Successfully deleted");
            history.push('/');
        })
    }

    

    return (
        <div className="blog-details">
            {isLoading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {workout && (
                <article>
                    <h2>{workout.title}</h2>
                    <p>Number of Repetitions : {workout.reps}</p>
                    <div>Amount of Load : {workout.load}</div>
                    <button onClick={handleDelete}>Delete</button>
                    <Link to="/edit">Update</Link>
                </article>
            )}
            {/* after this create a route for this in App.js */}
        </div>
      );
}
 
export default WorkoutDetail;