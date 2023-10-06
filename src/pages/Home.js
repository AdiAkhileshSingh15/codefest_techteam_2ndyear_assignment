import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import WorkoutList from '../components/WorkoutList';
import { Link } from 'react-router-dom';

const Home = () => {
  const { token } = useContext(AuthContext);


  return (
    <div>
      {token ? <WorkoutList /> :
        <div className='flex justify-center'>
          <div className='flex flex-col w-fit my-28 bg-white shadow-md'>
            <p className='text-black px-4 py-10 text-3xl font-bold '>Workout Buddy helps you organize and list your workouts.</p> 
            <p className='text-xl px-6 py-8'>Create an account .... <Link className= 'text-blue-400 px-2 hover:text-blue-800' to='/signup'>SignUp</Link></p>
            <p className='text-xl px-6 py-8'>Already have one? .... <Link className= 'text-blue-400 px-2 hover:text-blue-800' to = '/login'>Login</Link></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Home;