import React, { useState } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function SignUp_page() {
  const baseUrl="https://workoutapi-fjcr.onrender.com/api";
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const navigate = Navigate();
  const handleEmail=(e)=>{
    setemail(e.target.value);
  }
  const handlePass=(e)=>{
    setpassword(e.target.value);
  }
  const options={
    path:"/",
    sameSite:'strict',
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true
  }
  const handleSignIn=(email,password)=>{
    axios.post(`${baseUrl}/user/signup`,{
      email:email,
      password:password
    })
    .then(res=>{
      const {email,token}=res.data;
      Cookies.set("token",token,options);
      console.log(Cookies.get("token"));
      console.log(token);
      // navigate("/workout");
    })
    .catch(error=>{
      window.alert(error.message);
    })
  }

  return (
    <>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:"60px 0"}}>
    <form style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRadius:'30px',width:'40vw',height:'40vw',backgroundImage: 'linear-gradient(45deg, red, yellow)'}}>
    <div className="mb-4">
      <label htmlFor="user_email" className="form-label">Email address</label>
      <input type="email" value={email} onChange={handleEmail} className="form-control" id="user_email" placeholder="name@example.com"/>
    </div>
    <div className="mb-4">
      <label htmlFor="user_password" className="form-label">Password</label>
      <input type="password" value={password} onChange={handlePass} className="form-control" id="user_password" placeholder="Password"/>
    </div>
    <button type="button" onClick={()=>handleSignIn(email,password)} className="btn btn-outline-success text-light" style={{backgroundColor:'blue',width:'10vw'}}>Sign in</button>
</form>
</div>
</>
  )
}
