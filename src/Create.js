import React from 'react'
import {useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Create() {
    const [title ,setTitle]=useState('');
    const [load,setLoad]=useState('');
    const [reps,setReps]=useState('');
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        
        e.preventDefault();
        let info={title:title,load:parseInt(load),reps:parseInt(reps)};
        
        fetch('https://workoutapi-fjcr.onrender.com/api/workouts/',
         {
            method:'POST',
            body:JSON.stringify(info),
            headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("key")}`,
            "accept": "application/json"
            }

         }).then(
            console.log(Response),
            (res)=>{ return res.json()}
            

         )
         .then(res => {
            console.log(res)
            if(res.status==200)
           { alert("Success")
            navigate('/work')}
           else{
            alert("error");
           }

            
            
         }).catch(err => {
            console.log(err.message)
            alert("error");

         });

    }

  return (
    
    <form action="" onSubmit={handleSubmit}>
        <label >Title</label>
        <input type="text" 
        placeholder="Title" required
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>
        <label >Load</label>
        <input type="text" 
        placeholder="load" required
        value={load}
        onChange={(e)=>setLoad(e.target.value)}/>
        <label >Reps</label>
        <input type="text" 
        placeholder="Reps" required
        value={reps}
        onChange={(e)=>setReps(e.target.value)}/>
        <button type='submit'>Add</button>

        
    </form>
  )
}
