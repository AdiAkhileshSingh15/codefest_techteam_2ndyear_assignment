import React from 'react'
import { Link } from 'react-router-dom'
import {Navigate, useNavigate} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const callLogin=()=>{
    navigate('/Login')
  }
  const callSignin=()=>{
    navigate('/Signup')
  }

  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid h-50">
    <Link className="navbar-brand mx-4" style={{fontSize:'1.5rem'}} to="/">My App</Link>
    <div style={{position:'absolute',left:"10vw"}}>
        <Link className="navbar-brand m-1" style={{fontSize:'1.4rem'}} to="/">Home</Link>
        <Link className="navbar-brand m-4" style={{fontSize:'1.4rem'}} to={`/workout`}>Workouts</Link>
    </div>
    <div style={{position:'absolute',right:'23vw'}}>
        <button onClick={callLogin} style={{fontWeight:'bold'}} className="btn btn-outline-primary m-3" type="submit">Login</button>
        <button onClick={callSignin} style={{fontWeight:'bold'}} className="btn btn-outline-danger" type="submit">Sign in</button>
        {/* <Link to="/Login" className='nav-link active text-light'>Login</Link>
        <Link to="/Signup" className='nav-link active text-light'>Signup</Link> */}
    </div>
    <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button style={{fontWeight:'bold'}} className="btn btn-outline-success" type="submit">Search</button>
      </form>
  </div>
</nav>
    </>
  )
}
