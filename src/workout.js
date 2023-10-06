import {Link} from 'react-router-dom';
import axios from 'axios';
import {useParams} from 'react-router';
import {useState,useEffect} from 'react';
import Navbar from './navbar'
import './styles/workouts.css'


const Workout = () => {

    const[result,setResult]=useState([]);
    const { token }  = useParams();
    useEffect(()=>{
    axios.get(' https://workoutapi-fjcr.onrender.com/api/workouts',{ headers: {
        'Authorization': `Bearer ${token}`
      }
    }).
    then(res=>setResult(res.data)).catch(err=> console.log(err))},[]);


    return (
       
       <div> <Navbar token={token}> </Navbar>
        {
            result.map((res,key)=>(

               <div className="workouts" key={key}>
                     <h3> {res.title}</h3>
                    <div className="details"> 
                    <p> Load: {res.load}</p>
                    <p>Reps: {res.reps}</p> 
                   <Link to={`/workout/details/${token}/${res._id}` }>
                       <p> more info</p>                
                    </Link>
                    </div>
               </div>
            ))
        }
      
        </div>
    );
}
 
export default Workout;