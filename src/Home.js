import React from 'react';
import useFetch from './useFetch';
import WoList from './WoList';
import { useNavigate } from 'react-router-dom';
import Search from './search'; // Import the Search component

const Home = () => {
  const token = localStorage.getItem('token');
  const { data: wos, error, isLoading } = useFetch(
    'https://workoutapi-fjcr.onrender.com/api/workouts/',
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Include the authentication token if available
        'Content-Type': 'application/json',
      },
    }
  );
  // const navigate = useNavigate();

 

  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <div className="header">
        {/* <h1>all Workouts</h1> */}
        {/* Render the Search component and pass the handleSearch function */}
        <Search wos={wos} />
      </div>
      {wos && <WoList wos={wos} title="All Workouts" />}
    </div>
  );
};

export default Home;
