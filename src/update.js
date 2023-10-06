import {useParams} from 'react-router'
import {useState} from 'react';
import axios from 'axios'
import './styles/formdata.css'
import {useNavigate} from 'react-router-dom'


const Update = () => {
    
    const {token,_id}=useParams();
    const [load,setLoad]=useState(null);
    const [reps,setReps]=useState(null);
    const [err,setErr]=useState('');
    const navigate=useNavigate();

    const config={
        headers:{  'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
             },
             params:{id:_id}
     }
    const HandleSubmit=(e)=>{
        e.preventDefault();
        const parsedload=parseFloat(load);
        const parsedreps=parseFloat(reps);
        {console.log(parsedload,parsedreps)}
    axios.patch('https://workoutapi-fjcr.onrender.com/api/workouts/'+_id,{
        
         "load": parsedload,
         "reps": parsedreps
        
    },config).then(()=>navigate(`/workout/details/${token}/${_id}`)).catch(er=>setErr(er.response.data.error));
    }
    return ( 
        <div className='form_values'>
            <h2>Enter New Values</h2>
            <form onSubmit={HandleSubmit}>
                <label> Load: </label>
                <br/>
                <input type="number" required
                value={load}
                onChange={(e)=>setLoad(e.target.value)}
                />
                <br/>
                <label> Reps : </label>
                <br/>
                <input type="number" required
                value={reps}
                onChange={(e)=>setReps(e.target.value)}
                />
                <br/>
                <button>
                    Update
                </button>
                {err && <p>{err}</p>}

            </form>
        </div>
     );
}
 
export default Update;