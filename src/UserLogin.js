import {useState,createRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
export default function Userlogin(){
    
    const history =useHistory();
    const [userId,setUserId]=useState(null);
    const [username,setUsername]=useState(null);
    const [user,SetUser]=useState(null);
    const url="http://localhost:8000/user";
    useEffect(()=>{
        axios.get(url)
        .then((res)=>SetUser(res.data));
    });
    const usernmeref=createRef();
    const passref=createRef();
    const [invld,setInvld]=useState(false);
    function handleLogIn(e){
        e.preventDefault();
        
        console.log("done");
        setUsername(usernmeref.current.value);
        user.map((t)=>
            (t.username==usernmeref.current.value&&t.password===passref.current.value)?setUserId(t.id):""
        );
        
        usernmeref.current.value='';
        passref.current.value=''; 
        
    }
    useEffect(()=>{
        if(userId){
            history.push("/user/"+userId+"/"+username );
        }
        else{
            setInvld(false);
        }
    },[userId,username]);
    return(
        
        <div className="Userlogin">
            <h1>USER LOGIN</h1>
            {invld && <h2 style={{border:"solid red",colour:"white",fontSize:"20px"}}>invalid login.please try again</h2>}
            <form id="input" onSubmit={handleLogIn}>
          
            
            <label form="username">username  </label>
            <input name='username' type='text' ref={usernmeref} /><br/>
            <label form="password" >password  </label>
            <input name='password' type='password' ref={passref}/><br/>
            <button name='submit'type='submit'>submit</button>
          
          
         
        </form>
        <br/>
        </div>
    );
}