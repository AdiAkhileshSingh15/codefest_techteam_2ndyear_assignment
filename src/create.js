import {useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router'
import {useNavigate} from 'react-router-dom'


const Create = () => {
    const {token}=useParams();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}` ,
            'Content-Type':'application/json',
        }
    }
    const [title,setTitle]=useState('')
    const [load,setLoad] =useState(null)
    const [reps,setReps]=useState(null)
    const navigate=useNavigate()
 
    const HandleClick=(e)=>{
        e.preventDefault();
        const parsedload=parseFloat(load);
        const parsedreps=parseFloat(reps);

        axios.post(' https://workoutapi-fjcr.onrender.com/api/workouts', 
        {
            "title":title,
            "load":parsedload,
            "reps":parsedreps
        },config).
        then(
            navigate('/workout/'+token)
          ).catch(err=>console.log(err));
    }


    return ( 
        <div className='form_values'>
            <h2>Create a new Workout</h2>
        <form onSubmit={HandleClick}>
          
            <label>Title:</label>
            <br/>
             <input type="text"
                    required 
                    value={title}
                    onChange={(e)=>(setTitle(e.target.value))}
            />
            <br/>
            <label>Load:</label>
            <br/>
             <input type="number"
                    required
                    value={load}
                    onChange={(e)=>setLoad(e.target.value)}
            />
            <br/>
            <label>Reps:</label>
            <br/>
            <input type="number"
            required
            value={reps}
            onChange={(e)=>setReps(e.target.value)}
            />
            
            <button > Submit</button>
           

        </form>
        </div>
     );
}
 
export default Create;