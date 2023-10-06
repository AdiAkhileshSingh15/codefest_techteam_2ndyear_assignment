import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
const SecureRoute = ({children}) => {
  const token = Cookies.get("token");
  if(!token){
    return <Navigate to="/login" replace={true}/>
  }
  return children
}

export default SecureRoute
