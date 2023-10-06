import logo from "../Assets/Images/a.png";
import React from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
  const authToken = Cookies.get('authToken');
  const authEmail = Cookies.get('authEmail');

  return ( 
    <nav className="bg-white text-white py-2 border-b-2 border-black-500">
      <div className="container mx-auto py-2">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="ml-3 text-black"><img src={logo} alt="logo" style={{ height: '3rem' }} /></a>
            <a href="/" className="text-2xl lg:text-2xl lg:mb-0 mb-2 ml-3 text-black" style={{ fontFamily: 'IntegralCF'}}>
              Workout Buddy
            </a>
          </div>

          <ul className="flex flex-col lg:flex-row lg:space-x-4 mr-3 items-center justify-center lg:justify-start">

            {!authToken && (
              <React.Fragment>
                <li className="nav-item mt-5 lg:mt-0">
                  <a href="/signup" className="custom-navbar-button flex-1" style={{ fontFamily: 'Onest' }}>Sign up</a>
                </li>
                <li className="nav-item mt-5 lg:mt-0">
                  <a href="/login" className="custom-navbar-button flex-1" style={{ fontFamily: 'Onest' }}>Log in</a>
                </li>
              </React.Fragment>
            )}

            {authToken && (
              <React.Fragment>
                <li className="nav-item mt-5 lg:mt-0">
                  <a href="/workouts" className="custom-navbar-button flex-1" style={{ fontFamily: 'Onest' }}>Workouts</a>
                </li>
                <li className="nav-item text-black border-l-2 border-blue-500 px-4 py-1 mt-5 lg:mt-0 poppins" ><b className  ="text-red-500">Logged In:</b> <b className="text-purple-900">{authEmail}</b></li>
                <li className="nav-item mt-5 lg:mt-0">
                  <a href="/logout" className="custom-navbar-button" style={{ fontFamily: 'Onest' }}>Logout</a>
                </li>
              </React.Fragment>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
    );
}
 
export default Navbar;