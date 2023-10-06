import React, { useState } from 'react'
import { Register } from '../Swagger Api/Actions';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const[name,SetName] = useState("");
    const[password,Setpassword] = useState("");
    const navigate = useNavigate();
  const inputName = (e) => {
    SetName(e.target.value);
  }

  const inputPassword = (e) => {
    Setpassword(e.target.value);
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    let val = await Register(name,password);
    console.log(name);
    console.log(password);
    if(val){
      navigate("/User_interface");
    }
  }
  return (
    
    <>
       <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong mycard   dark-border">
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign Up</h3>

            <div className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg  dark-border" onChange= {inputName}/>
              <label className="form-label" htmlFor="typeEmailX-2">Email</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg dark-border" onChange={inputPassword} />
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
            </div>

            
            <div className="form-check d-flex justify-content-start mb-4">
              <input className="form-check-input dark-border" type="checkbox" value="" id="form1Example3" />
              <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
            </div>

            <button className="btn btn-info btn-lg btn-block" type="submit" onClick={handleSignup}>SignUp</button>

            <hr className="my-4" />

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
