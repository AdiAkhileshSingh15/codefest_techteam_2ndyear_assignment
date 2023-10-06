import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
    const {authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn} = useAuth()

        const logIn = (e) => {
          e.preventDefault()
          setIsLoggedIn(true)
          setAuthUser({
            Name: 'Jone Doe'
          })
        }
        const logOut = (e) => {
          e.preventDefault()
          setIsLoggedIn(false)
          setAuthUser(null)
        }
  return (
    <div>
      <span>User is currently: {isLoggedIn ? 'Logged-In' : 'Logged-Out'}</span>
      {isLoggedIn ? (<span>User name: {authUser.Name}</span>) : null}
      <br/>
      {isLoggedIn ? (<button onClick={(e) => {logOut(e)}}>Log Out</button>) :
        (<button onClick={(e)=>{logIn(e)}}>Log In</button>) }
    </div>
  )
}

export default Dashboard