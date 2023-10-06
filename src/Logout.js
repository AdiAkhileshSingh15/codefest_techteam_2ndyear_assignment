import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page immediately
    navigate('/login');
  }, [navigate]);

  // No need to render anything in this component
  return null;
};

export default Logout;
