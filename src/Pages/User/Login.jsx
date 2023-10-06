import React, { useEffect, useState } from "react"
import "../../styles/userStyles.css"
import { Login } from "../../Actions/userActions"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
const LoginUser = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [Success, setSuccess] = useState()
  const LoginSubmit = async (e) => {
    e.preventDefault()
    const { success, message } = await Login(email, password)
    setSuccess(success)
    // toast.success(message)
    if (success) {
    toast.success(message)
      navigate("/")
    }else {
      toast.error(message)
    }
  }
  useEffect(() => {
    if (Cookies.get("token") || Success) {
      navigate("/")
    }
  }, [navigate, Success])
  return (
    <div className="main-page">
      <div className="login-form">
        <h3>Welcome back !!</h3>
        <form onSubmit={LoginSubmit}>
          <div className="txt-field">
            <input
              type="text"
              name="Email"
              id="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <span></span>
            <label htmlFor="Email">Email</label>
          </div>
          <div className="txt-field">
            <input
              type="password"
              name="Password"
              id="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <span></span>
            <label htmlFor="Password">Password</label>
          </div>
          <div className="btn-container flex items-center justify-center">
            <button type="submit">Login</button>
          </div>
          <div style={{ fontSize: ".8rem", paddingTop: "1rem" }}>
            <Link to="/register" style={{textDecoration:"none"}}>Don't have and account? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginUser
