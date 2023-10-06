import React from 'react'

export default function UpdateWorkout() {
  return (
    <div style={{width:'100vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{width:'10vw',height:'10vw'}}>
            <input type="text" style={{margin:'10px 0',height:'2vw',width:'20vw'}}/>
            <input type="text" style={{margin:'10px 0',height:'2vw',width:'20vw'}}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <button className="btn btn-primary" style={{margin:'10px 10px ',height:'2vw',display:'block'}}>Update</button>
            <button className="btn btn-primary" style={{margin:'10px 10px',height:'2vw',display:'block'}}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
