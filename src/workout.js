import React, { useEffect ,useState} from 'react'

import { toast} from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function Workout() {
    const myInlineStyles = {
        cursor: 'pointer', // Set the cursor property to 'pointer'
      };
    const navigate=useNavigate();
    const [data, setdata] = useState([]);
    const fetchdata=async ()=>{
      let response= await fetch("https://workoutapi-fjcr.onrender.com/api/workouts/",
      {
        method:'GET',
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("key")}`
        }   
      })
      
      let result= await response.json();
      setdata(result);
    }
    const handlelogout=()=>{
      localStorage.removeItem("token");
      navigate("/Login");
    }
   
    const handleDelete = async (post) => {
        setdata(data.filter((p) => p._id !== post._id));
        const response = await fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${post._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("key")}`
          }
        });
        toast.success("Workout Deleted Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:2000});
      };
    
    useEffect(()=> {
        fetchdata();
      }, [])

  return (
    <>
    <div className="workout">
      <div className="container">
        <div className="buttons">
        <button
          className="btn btn-primary mb-4"
          onClick={() => navigate("/Create")}
        >
          Add Workout
        </button>
        <button
          className="btn btn-primary mb-4 mx-{10}"
          onClick={()=>handlelogout()}
         
        >
          Logout
        </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Reps</th>
              <th>Load</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {data.map((a) => (
              <tr key={a._id}>
                <td> {a.title} </td>
                <td> {a.reps} </td>
                <td> {a.load} </td>
                <td>
                  <button
                    onClick={() => navigate(`/Update/${a._id}`)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button style={myInlineStyles}
                    onClick={()=>handleDelete(a)}
                    className="btn btn-danger"
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
    
      
}
