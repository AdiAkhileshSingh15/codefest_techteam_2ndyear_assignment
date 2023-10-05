import { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Workout } from '../types/Workouts';
import { WorkoutCard } from '../components/WorkoutCard';
import Navbar from '../components/Navbar';
import { HomeProps } from '../types/Interfaces';
import AddWorkout from '../components/AddWorkout';


const Home: FC<HomeProps> = () => {
  const { isLoggedIn, token, editingId } = useContext(AuthContext)
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [numOfWorkouts, setNumOfWorkouts] = useState<number>(workouts.length)
  const baseUrl: string | undefined = "https://workoutapi-fjcr.onrender.com/api";



  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    axios.get(`${baseUrl}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setWorkouts(res.data);
        setNumOfWorkouts(res.data.length);
      })
  }, [numOfWorkouts, isLoggedIn, editingId])

  return (
    <div>
      <img src="/gym.jpg" alt="" className={`-z-10 absolute w-screen opacity-70 top-0`}/>
      <Navbar />
      <div className={`${numOfWorkouts <= 4 ? 'h-screen' : 'h-full'} pt-3 flex flex-col items-center pb-5`}>
      <h1 className='font-bold font-serif bg-white w-40 text-center rounded-md'>Add workout:</h1>
      <AddWorkout setNumOfWorkouts={setNumOfWorkouts} />

      <h1 className='font-bold font-serif bg-white w-40 text-center rounded-md'>Your Workouts:</h1>
      {
        workouts.length > 0 ?
          workouts.map((workout) => {
            return <WorkoutCard key={workout._id} workout={workout} setNumOfWorkouts={setNumOfWorkouts} />
          }) :
          <></>
      }
      </div>
    </div>
  )
}

export default Home