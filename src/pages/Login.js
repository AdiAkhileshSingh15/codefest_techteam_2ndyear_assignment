import React, { useEffect } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formerr, setFormerr] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      return navigate('/');
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();

    setFormerr('');

    if (!(email && password)) {
      setFormerr("Fill all the fields!!!");
      return console.log(formerr);
    }

    setShowLoading(true)

    setTimeout(() => {
      axios.post('/user/login', {
        email, password
      })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          setEmail('');
          setPassword('');
          setFormerr('');
          setShowLoading(false);
          navigate('/');
        })
        .catch(err => {
          console.error(err);
          setFormerr(err.response.data.error);
          setPassword('');
          setShowLoading(false);
        })
    }, 1500)
  }


  if(showLoading){
    return (
      <div className='flex items-start justify-center min-h-screen'>
        <p className='py-4 px-8 text-gray-400 text-3xl rounded-md'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <div className='bg-white shadow-lg p-4 rounded-xl w-96'>
        <h2 className="text-[40px] font-semibol mb-4">Login</h2>
        {formerr && <p className='w-full bg-red-300 text-red-800 text-center py-2'>{formerr}</p>}
        <form className='my-10' onSubmit={handleSubmit}>
          <input
            type="text"
            name='email'
            placeholder='EmailId'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-gray-300 px-2 py-4 mb-8 rounded-md pop'
          />
          <input
            type="password"
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-gray-300 px-2 py-4 mb-8 rounded-md pop'
          />
          <button type='submit' className='w-50 h-10 px-4 bg-sky-800 text-white rounded-md hover:bg-sky-950 pop'>Login</button>
        </form>
        <span className= 'text-base'>
          Doesn't have an account? <br /> Create an account here :
          <Link className='text-2xl text-cyan-600 hover:text-cyan-950'  to='/signup'>Signup</Link>
        </span>
      </div>
    </div>
  )
}

export default Login;