import { FC, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { NavbarProps } from '../types/Interfaces';
import { ToastContainer } from 'react-toastify';
import PrimaryButton from './PrimaryButton';


const Navbar: FC<NavbarProps> = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <nav className='w-full flex justify-center py-4'>
      <ToastContainer limit={2} autoClose={1000}/>
      {
        isLoggedIn ?
          <PrimaryButton onclick={logout} text='Logout' /> :
          <></>
      }
    </nav>
  )
}

export default Navbar