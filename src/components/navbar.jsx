import React from "react"
import { Link, useNavigate } from "react-router-dom"
import SearchBar from "./searchbar"
import "../styles/navbar.css"
import Logo from "../Logo.png"
import Cookies from "js-cookie"
import { Logout } from "../Actions/userActions"
import { toast } from "react-toastify"

const Navbar = () => {
  const navigate = useNavigate()
  const logoutUser = async() =>{
    const {success,message,error} = await Logout()
    if(success){
      toast.success(message)
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }else {
      toast.error(message)
    }
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Logo} alt="Logo" id="logo" />
      </Link>
      <div className="nav-components">
        <SearchBar />
        <div className="nav-toolbar">
          <Link to="/">
            <i className="fa-solid fa-house nav-icons"></i>
          </Link>
          {Cookies.get("token") ? (
                <i className="fa-solid fa-right-from-bracket nav-icons" onClick={logoutUser}/>
            ) : (
              <Link to="/login">
                 <i className="fa-solid fa-user nav-icons"/>
              </Link>
            )
  
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
