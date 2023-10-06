import {useParams,useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './styles/details.css'
import {Link} from 'react-router-dom';

const Workoutdetails = () => {
    const {token,_id}=useParams();
    const [err,setErr]=useState(null);


    const [details,setDetails]=useState({
        title:'', user_id:'',load:null,reps:null,createdAt:'',updatedAt:''
    });

  
    
const navigate=useNavigate();  
const config={
   headers:{  'Authorization': `Bearer ${token}`,
   'Content-Type':'application/json'
        },
        params:{id:_id}
}


const HandleDelete=()=>{
    axios.delete(`https://workoutapi-fjcr.onrender.com/api/workouts/`+_id,config).then
    (()=>navigate('/workout/'+token)).catch(er=>{
        console.log(err.response.data.error)
    });
}


{/* <h2>Title:  {details.title}</h2>
<p> User_id: {details.user_id}</p>
<p> Load: {details.load}</p>
<p> Reps :{details.reps}</p>
<p> Created At :{details.createdAt}</p>
<p> Updated At: {details.updatedAt}</p> */}



useEffect(()=>{
axios.get(`https://workoutapi-fjcr.onrender.com/api/workouts/`+_id,config).then
(res=>setDetails(res.data)).catch(err=>setErr(err.response.data.error))},[]
);

    return ( 
        <div className="workoutdetails">
            {err && <h2>{err}</h2>}

            { !err && <div className='wdetails'> 
            <div>
                <h1>Workout Details</h1>
                <h2>{details.title}</h2>
            </div>
            <div className="key-value">
            <div className="key">User_id:</div>
            <div className="value">{details.user_id}</div>
            </div>
            <div className="key-value">
            <div className="key">Load:</div>
            <div className="value">{details.load}</div>
            </div>
            <div className="key-value">
            <div className="key">Reps:</div>
            <div className="value">{details.reps}</div>
            </div>
            <div className="key-value">
            <div className="key">Created At:</div>
            <div className="value">{details.createdAt}</div>
            </div>
            <div className="key-value">
            <div className="key">Updated At:</div>
            <div className="value">{details.updatedAt}</div>
            </div>

            <button onClick={HandleDelete}> Delete </button>
            <div className='updating'>
            <button>
            <Link to={`/workout/update/${token}/${_id}`} style={{color:"white"}}> Update </Link>    
            </button>
            </div>

        </div>
            
            }
            
        </div>
     );
}
 
export default Workoutdetails;