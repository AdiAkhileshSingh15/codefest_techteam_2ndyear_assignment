import React, { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

import WorkoutItem from './WorkoutItem'
// import {showDisp} from './WorkoutItem'

export default function Workouts() {
    const baseUrl="https://workoutapi-fjcr.onrender.com/api";
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmZDZkYjkzMjQ4NzhhMjU5ZTk4N2MiLCJpYXQiOjE2OTY1ODU0MzUsImV4cCI6MTY5Njg0NDYzNX0.zXQ6lF0DZI8eBwxyL97mRagzIk9bwiYNBpRa4x553Ys";
    let token=Cookies.get("token");
    const [workouts, setWorkouts] = useState([]);

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
    

  return (
    <>
    <div style={{textAlign:'center',backgroundColor:"#f8ebff"}}>
        <h2 style={{margin:0,fontSize:'3rem'}}>Wel  come </h2>
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
    </>
  )
}
