import axios from "axios";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect,useState,useContext } from "react";
import WorkoutDisplay from "../Components/WorkoutDisplay";
import CreateWorkout from "../Components/CreateWorkout";
import Navbar from "../Components/Navbar";


const Home = () => {
    const baseURL="https://workoutapi-fjcr.onrender.com/api";
    const { isLoggedIn,token,editId,setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [workouts,setWorkouts] = useState([]);
    const [workoutCount,setWorkoutCount] = useState(workouts.length);
    
    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/login");
        }
        axios(`${baseURL}/workouts`,{
            method:'get',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res =>{
            setWorkouts(res.data);
            setWorkoutCount(res.data.length);
        }).catch(err => {
            window.alert(err.response.data.error);
        })
    },[workoutCount,isLoggedIn,editId])

    return(
        <div className="Home">
                <Navbar/>
                <div>
                <h2>Create workout:</h2>
                <CreateWorkout setWorkoutCount={setWorkoutCount}/>
                <h2>Your Workouts:</h2>
                {
                workouts.length !== 0 ?
                    workouts.map((workout) => {
                        return <WorkoutDisplay key={workout._id} workout={workout} setWorkoutCount={setWorkoutCount} />
                      }):
                <></>
                }
            </div>
        </div>
    )
}

export default Home;