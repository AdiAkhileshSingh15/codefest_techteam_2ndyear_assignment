import React,{useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function Add() {
  const [load, setLoad] = useState("")
  const [reps, setReps] = useState("")
  const [title, setTitle] = useState("")
  const baseUrl="https://workoutapi-fjcr.onrender.com/api";
  let token=Cookies.get("token");
  const navigate = useNavigate();

  const handleTitle=(e)=>{
    setTitle(e.target.value);
  }
  const handleLoad=(e)=>{
    setLoad(e.target.value);
  }
  const handleReps=(e)=>{
    setReps(e.target.value);
  }
  const click_cancel=()=>{
    navigate('/workout');
  }
  const click_add=()=>{
    axios.post(`${baseUrl}/workouts`,{
      title:title,
      load:parseInt(load),
      reps:parseInt(reps),
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
      console.log(res);
      navigate("/workout");
    })
    .catch(error=>{
      window.alert(error.message);
    })
  }

  return (
    <>
    <div style={{width:'100vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{backgroundColor:'#a6a6ab',position:'absolute',top:'7vw',border: '8px solid black',width:'40vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{width:'22vw',height:'10vw'}}>
            <input type="text" value={title} onChange={handleTitle} style={{margin:'10px 0',height:'2vw',width:'20vw'}} placeholder='Title'/>
            <input type="text" value={load} onChange={handleLoad} style={{margin:'10px 0',height:'2vw',width:'20vw'}} placeholder='Load'/>
            <input type="text" value={reps} onChange={handleReps} style={{margin:'10px 0',height:'2vw',width:'20vw'}} placeholder='Reps'/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <button className="btn btn-primary" onClick={click_add} style={{fontWeight:'bold',margin:'10px 10px ',height:'2vw',display:'block'}}>Add</button>
            <button className="btn btn-primary" onClick={click_cancel} style={{fontWeight:'bold',margin:'10px 10px',height:'2vw',display:'block'}}>Cancel</button>
            </div>
        </div>
        </div>
    </div>
  </>
  )
}
