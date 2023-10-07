import React from 'react'
import Navbar from './Navbar'

const Home = ({login}) => {
  return (
    <div className='home'>
        <Navbar login={login} />
    </div>
  )
}

export default Home