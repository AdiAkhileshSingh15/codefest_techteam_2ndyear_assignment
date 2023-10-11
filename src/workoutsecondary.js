import React from 'react'
import './workoutsecondary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare,faPlus } from '@fortawesome/free-solid-svg-icons';
import  { useEffect ,useState} from 'react'

import { toast} from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function Workoutsecondary() {
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


  return  (
    
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>Workout</h2>
            </div>
            <div className="col-sm-6 flexnav">
              <div className='items'>
              <Link to="/Create" className="btn btn-success" data-toggle="modal">
                 <FontAwesomeIcon className="padding"icon={faPlus} /><span>Create</span>
              </Link>
              </div>
                     <div className='items'>

                          <button
                      className="btn btn-primary mb-4 mx-{10}"
                      onClick={()=>handlelogout()}
                    
                    >
                      Logout
                    </button>
                    </div>
                          
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
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
                    <a href="#deleteEmployeeModal" className="delete padding" data-toggle="modal" onClick={() => navigate(`/Update/${a._id}`)}>
                    <FontAwesomeIcon icon={ faPenToSquare} />
                    </a>
                </td>
                <td>
                    <a href="#editEmployeeModal" className="edit padding" data-toggle="modal" onClick={()=>handleDelete(a)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </a>
                    
                 
                </td>
              </tr>
            ))}
            
            {/* Repeat this section for each employee */}
          </tbody>
        </table>
        
      </div>
    </div>)
}
