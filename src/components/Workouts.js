import React, { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import {Navigate, useNavigate} from 'react-router-dom'

import WorkoutItem from './WorkoutItem'
// import {showDisp} from './WorkoutItem'

export default function Workouts(props) {
    const baseUrl="https://workoutapi-fjcr.onrender.com/api";
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmZDZkYjkzMjQ4NzhhMjU5ZTk4N2MiLCJpYXQiOjE2OTY1ODU0MzUsImV4cCI6MTY5Njg0NDYzNX0.zXQ6lF0DZI8eBwxyL97mRagzIk9bwiYNBpRa4x553Ys";
    let token=Cookies.get("token");
    const location=useLocation();
    const [workouts, setWorkouts] = useState([]);
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const toast = searchParams.get('toast');
    const navigate = useNavigate();


    useEffect(() => {
        console.log(token);
        axios.get(`${baseUrl}/workouts`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>{
            const data=res.data;
            console.log(data);
            setWorkouts(data);
        })
    }, [])

    const handleAdd=()=>{
        navigate('/Add');
    }
    

  return (
    <>
    <div style={{textAlign:'center',backgroundColor:"#f8ebff"}}>
        <h2 style={{margin:0,fontSize:'3rem'}}>Welcome {name}</h2>
        <h2 style={{margin:0,padding:'10px 0px'}}>Your Workouts are:- </h2>
    </div>
    <div className='row row-cols-3' style={{backgroundColor:'#f8ebff',width:'100vw'}}>
        {workouts.map((w)=>{
            return(
            <div id={w._id} key={w._id} className="col my-5" style={{display:true?'flex':'none',alignItems:'center',justifyContent:'center'}}>
                <WorkoutItem id={w._id} title={w.title} load={w.load} reps={w.reps}/>
            </div>
            )
        })}
    </div>
    <button onClick={handleAdd} style={{backgroundImage:'url(./add.png)',backgroundSize:'contain',borderRadius:'50%' ,position:'fixed',right:'2vw',bottom:'1vw',width:'5vw',height:'5vw'}}>
        {/* <img src="./add.png" alt="" srcset="" /> */}
    </button>
    </>
  )
}
