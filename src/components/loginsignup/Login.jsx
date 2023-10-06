import React, {useState} from 'react'
import './login.css'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
// import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
const Login = () => {

  const navigate=useNavigate();
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");

   const handlelogin= async (e)=>{
      e.preventDefault();
      let item={email,password};
      let response=await fetch("https://workoutapi-fjcr.onrender.com/api/user/login",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        "Content-Type": "application/json",
        "accept": "application/json"
      }
      })
      let result=await response.json();
      if(result.error){
         alert(result.error);
         setpassword("");
         setemail("");
      }
      else{
        console.log(result);
         alert("Logged in Succesfully");
         localStorage.setItem("token", result.token); 
         navigate("/Workout");
      }
   }
  return (
    <div className='container'>
     <div className='header'>
      <div className='text'>Login</div>
      <div className='underline'></div>
     </div>
     <div className='inputs'> 
         <div className='input'>
             <img src={email_icon} alt="" />
             <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder='Email Id' required/>   
         </div>
         <div className='input'>
             <img src= {password_icon} alt="" />
             <input type="password"  value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Password' required/>   
         </div>
     </div> 
    <div className='forget-password'>Not a member?  <Link  to="/Signup">Signup now</Link></div>
     <div className='submit-container'>
     <div >
     <input className="submit" onClick={handlelogin} type="submit" value="Login"/>
     </div>
     </div>
    </div>
  )
}

export default Login
