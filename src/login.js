import {Link} from 'react-router-dom'
import {useState} from 'react'
import './styles/formdata.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login=()=>{
    const [username,setUsername] =useState('')
    const[password,setPassword]=useState('')

  const [err,setErr]=useState('')
  const navigate=useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
      const config={headers:
      {
        'Content-Type':'application/json'
      }}
        axios.post('https://workoutapi-fjcr.onrender.com/api/user/login',{
          email:username,password
        },config).then((res)=>navigate('/workout/'+res.data.token)).catch(err=>{setErr(err.response.data.error)});

      };

      
   return ( 
   <div className="form_values">
      <h2>Login</h2>
        <form onSubmit={handleLogin} className='forms'>
            <label> Email: </label>
            <br/>
            <input type="email" required 
            value={username}
            onChange={(e)=>setUsername(e.target.value)} />
            <br/>
            <label> Password: </label>
            <br/>
            <input type="password" required 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <br/>
            <button  > Submit </button>
            {err && <p> {err} </p>}
            <br/>
            <Link to="/signup"> Don't Have Account: Signup </Link>
        </form>
      
    </div>
    )
}

export default Login



