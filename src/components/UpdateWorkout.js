import React,{useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function UpdateWorkout() {
  const [load, setLoad] = useState("")
  const [reps, setReps] = useState("")
  const navigate = useNavigate();
  const baseUrl="https://workoutapi-fjcr.onrender.com/api";
  const {id}=useParams();
  let token=Cookies.get("token");
  console.log(id);
  
  const handleLoad=(e)=>{
    setLoad(e.target.value);
  }
  const handleReps=(e)=>{
    setReps(e.target.value);
  }

  const click_update=()=>{
    axios.patch(`${baseUrl}/workouts/${id}`,{
      load:parseInt(load),
      reps:parseInt(reps)
    },{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    .then(res=>{
      console.log("Updated");
      navigate('/workout');
    })
    .catch((error)=>{
      window.alert(error.message);
    })
  }
  const click_cancel=()=>{
    navigate('/workout');
  }

  return (
    <div style={{width:'100vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{backgroundColor:'#a6a6ab',position:'absolute',top:'7vw',border: '8px solid black',width:'40vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{width:'22vw',height:'10vw'}}>
            <input type="text" value={load} onChange={handleLoad} style={{margin:'10px 0',height:'2vw',width:'20vw'}} placeholder='Load'/>
            <input type="text" value={reps} onChange={handleReps} style={{margin:'10px 0',height:'2vw',width:'20vw'}} placeholder='Reps'/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <button className="btn btn-primary" onClick={click_update} style={{margin:'10px 10px ',height:'2vw',display:'block',fontWeight:'bold'}}>Update</button>
            <button className="btn btn-primary" onClick={click_cancel} style={{margin:'10px 10px',height:'2vw',display:'block',fontWeight:'bold'}}>Cancel</button>
            </div>
        </div>
        </div>
    </div>
  )
}
