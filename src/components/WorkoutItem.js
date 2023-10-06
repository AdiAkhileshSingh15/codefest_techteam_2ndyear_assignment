import React, { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios';

export default function WorkoutItem(props) {
    const { id,title, load, reps ,setItem} = props;
    const baseUrl="https://workoutapi-fjcr.onrender.com/api";
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmZDZkYjkzMjQ4NzhhMjU5ZTk4N2MiLCJpYXQiOjE2OTY1ODU0MzUsImV4cCI6MTY5Njg0NDYzNX0.zXQ6lF0DZI8eBwxyL97mRagzIk9bwiYNBpRa4x553Ys";
    
    
    const fun=(id)=>{
        const val=document.getElementById(id);
        val.style.display='none';
    }

    const handleDelete=(id)=>{
        axios.delete(`${baseUrl}/workouts/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>{
            fun(id);
            console.log(`Item id ${id} is deleted Successfully`);
        })
        .catch((error)=>{
            console.error('Error deleting item:', error);
            window.alert(error.message);
        })
    }
    
    
    return (
        (<div style={{border:"5px solid black",borderRadius:'20px',width:'22vw',height:'15vw',fontSize:'1.5rem'}}>
        <div style={{alignItems:'center',margin:'10px'}}>
            <h2 className='my-2'>Title: {title}</h2>
        </div>
        <div>
            <ul>
                <li className='my-2'>Load: {load}</li>
                <li className='my-2'>Reps: {reps}</li>
            </ul>
        </div>
        <div>
            <button style={{backgroundColor:'red',margin:'50px 10px 50px 50px',width:'6vw',borderRadius:'10px'}}>Update</button>
            <button onClick={()=>{handleDelete(id)}} style={{backgroundColor:'red',margin:'50px 50px 50px 10px',width:'6vw',borderRadius:'10px'}}>Delete</button>
        </div>
    </div>
  ))
}