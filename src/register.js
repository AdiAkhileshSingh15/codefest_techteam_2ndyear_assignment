import './styles/formdata.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    const [email,setEmail] =useState('')
const [password,setPassword] =useState('')
const navigate=useNavigate();
const [err,setErr]=useState('');
const HandleRegister=(e)=>{
    e.preventDefault();

const config={headers: {
        'Content-Type': 'application/json',
      }};

    axios.post('https://workoutapi-fjcr.onrender.com/api/user/signup',{
        email,password
    },config).
    then(()=>
    navigate('/login')
    ).catch(error=>setErr(error.response.data.error));
   
}


    return ( 
        <div className='form_values'>
            <h2>Signup</h2>
        <form onSubmit={HandleRegister}>
           email:
           <br/>
            <input type="email"
            required 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <br/>
            Password:  
            <br/> 
            <input type="password" required 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            /> 
            <br/>
            <button> Register </button> 
           {err && <p> {err }</p>}
        </form>
        </div>
     );
}
 
export default Register;