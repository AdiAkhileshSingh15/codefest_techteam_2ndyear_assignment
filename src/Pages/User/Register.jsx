import React, { useEffect, useState } from "react"
import "../../styles/userStyles.css"
import { Register } from "../../Actions/userActions"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
const RegisterUser = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [Success, setSuccess] = useState()
  const navigate = useNavigate()
  const RegisterSubmit = async (e) => {
    e.preventDefault()
    const { success, message } = await Register(email, password)
    setSuccess(success)
    if (success) {
      toast.success(message)
      navigate("/")
    } else {
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
        <h3>Welcome !!</h3>
        <form onSubmit={RegisterSubmit}>
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
            <button type="submit">Register</button>
          </div>
          <div style={{ fontSize: ".8rem", paddingTop: "1rem" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already have and account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterUser
