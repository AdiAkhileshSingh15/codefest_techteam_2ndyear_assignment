import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({login}) => {
  return (
    <div className='navbar'>
        <h2 style={{color: 'blue'}}>WorkOutBuddy-CodeFest-2k23</h2>
        <div>
            {login && <Link to="/"></Link>}
            {!login && (
                <div>
                    <span>
                        <Link to="/login">Log In</Link>
                    </span>
                    <span>
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </div>
            )
            }
        </div>
    </div>
  )
}

export default Navbar