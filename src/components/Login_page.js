import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Navigate, useNavigate} from 'react-router-dom'

export default function Login_page() {
    const baseUrl="https://workoutapi-fjcr.onrender.com/api";
    let token=Cookies.get("token");
    
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [toast, settoast] = useState(true);
    const navigate = useNavigate();
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
    const LoginUser=async (em,pas)=>{
        try{
            const response=await axios.post(`${baseUrl}/user/login`,{
                email:em,
                password:pas
            });
            const {email,token}=response.data;
            Cookies.set("token",token,options);
            document.cookie="token="+token;
            console.log(Cookies.get("token"));
            console.log(token);
            return true;
            // navigate("/workout")
        }
        catch(error){
            window.alert(error.message);
            return false;
        }
    }
    const handleLogin=async(event)=>{
        // const navigate=useNavigate();
        event.preventDefault();
        if(!email || !password){
            window.alert("please fill all the details");
        }
        let val=await LoginUser(email,password);
        console.log(email);
        console.log(password);
        if(val){
            let names=email;
            let name='';
            for(let i=0;i<names.length;i++){
                if(names[i]!=='@'){
                    name=name+names[i];
                }
                else{
                    break;
                }
            }
            alert("Loggedin Successfully!! :)");
            navigate(`/workout?name=${name}&toast=${toast}`);
        }
    }


  return (
    <>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:"60px 0"}}>
    <form style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRadius:'30px',width:'40vw',height:'40vw',backgroundImage: 'linear-gradient(45deg, red, yellow)'}}>
    <div className="mb-4">
      <label for="user_email" className="form-label">Email address</label>
      <input type="email" value={email} onChange={handleEmail} className="form-control" id="user_email" placeholder="name@example.com"/>
    </div>
    <div className="mb-4">
      <label for="user_password" className="form-label">Password</label>
      <input type="password" value={password} onChange={handlePass} className="form-control" id="user_password" placeholder="Password"/>
    </div>
    <button type="button" onClick={handleLogin} className="btn btn-outline-success text-light" style={{backgroundColor:'blue',width:'10vw',fontWeight:'bold'}}>Login</button>
</form>
</div>
</>
  )
}
