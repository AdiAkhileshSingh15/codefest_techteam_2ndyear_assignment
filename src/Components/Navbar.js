import React from 'react';

function Navbar() {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Home Link */}
        <a href="/" className="text-white text-2xl font-bold">
          Home
        </a>

        {/* Navigation Links */}
        <div className="space-x-4">
          <a href="/login" className="text-white">
            Login
          </a>
          <a href="/signup" className="text-white">
            SignUp
          </a>
          <a href="/logout" className="text-white">
            LogOut
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;