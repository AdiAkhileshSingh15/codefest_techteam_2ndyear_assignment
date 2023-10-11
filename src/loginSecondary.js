import {useState,useEffect} from 'react';
import {Link}  from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './loginSecondary.css';

export default function LoginSecondary() {
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [id,setId]=useState('');
    const navi=useNavigate();
    

    const handleSubmit=  (e)=>{
        e.preventDefault();
        const blog={email,password};
        
       
     
        
        
         fetch('https://workoutapi-fjcr.onrender.com/api/user/login',
         {
            method:'POST',
            headers:{"Content-Type" : "application/json",  "accept": "application/json"},
            body:JSON.stringify(blog)

         }).then(
            (res)=>{ return res.json()}
         )
         .then(res => {
            console.log(res.token)
            
            if (!("error" in res))
            {localStorage.setItem("key",res.token);
            navi("/work")
            }else{
              alert(res.error);
            }
            
         }).catch(err => {
            console.log(err)
         });
         

    }


    return (
        <div>
          <section>
             <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <div className="signin">
              <div className="content">
                <h2>Log In</h2>
                <form className="form"  onSubmit={handleSubmit}>
                  <div className="inputBox">
                    <input type="text" required
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)} />
                    <label>Username</label>
                  </div>
                  <div className="inputBox">
                    <input type="password" required 
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)} />
                    <label>Password</label>
                  </div>
                  <div className="links">
                    
                    <Link to="/signup" >SignUp</Link>
                  </div>
                  <div className="inputBox">
                    <input type="submit" value="Login" />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      );
}
