import Workoutlist from "./WokoutList";
import { useEffect,useState } from "react";
import {AuthContext} from './AuthContext';
import { useContext } from 'react';


const Myworkouts = () => {
    const [workouts,setWorkouts] =useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {token} = useContext(AuthContext);
    
    useEffect(() => {
        const apiUrl = 'https://workoutapi-fjcr.onrender.com/api/workouts';

    fetch(apiUrl,{
        method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer " +token 
            } 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWorkouts(data); 
        setIsLoading(false);
        setError(null); 
      })
      .catch((error) => {
        setError(error); 
        setIsLoading(false); 
      });
  }, [token]); 
  const handleDelete =(id) => {
  alert("Are You sure? you want to delete the workout");
  

    const apiUrl = `https://workoutapi-fjcr.onrender.com/api/workouts/${id}`;
    
    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const newWorkouts = workouts.filter(workout => workout._id !== id);
        setWorkouts(newWorkouts);
    })
    .catch((error) => {
        console.error('Error deleting workout:', error);
       
    });
  };  
  
  
    return ( 
        <div className="Myworkouts">
            
             { isLoading ? <h1>Loading...</h1> :<Workoutlist workouts={workouts} setWorkouts={setWorkouts} handleDelete={handleDelete}  title ={'Your Workouts'} />} 
        </div>
     );
}
 
export default Myworkouts;