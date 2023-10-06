import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, setToken} = useContext( AuthContext );

  return (
    <nav className=' py-10 px-7' >
    <div className='container mx-auto flex justify-between items-center text-black text-xl'>
      <h1 className='font-bold px-4 text-5xl'>WORKOUT-BUDDY</h1>
      {token && <button  className='w-50 px-4 bg-red-700 text-white rounded-md h-11 text-lg hover:bg-red-900 pop' onClick = {() => setToken(null)}> Logout </button>}
    </div>
  </nav>
  )
}

export default Navbar