import {useState,useEffect} from 'react';
import {Link}  from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    
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
            }
            
         }).catch(err => {
            console.log(err)
         });
         

    }



    return ( 
        <div className="Login">
            <form className="box" onSubmit={handleSubmit}>
                <h2>LogIn</h2>
                <label >Username</label>
                
                <input type="text" placeholder="Username" required 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <label >Password</label>
                
                <input type="text" placeholder="Password" required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Login</button>

                <Link to="/signup">SignUp</Link>
            </form>
            

        </div>
     );
}
 
export default Login;