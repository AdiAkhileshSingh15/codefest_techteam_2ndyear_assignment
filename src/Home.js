import { useState, useEffect} from 'react';
import Workoutlist from './Workoutlist'
// import useFetch from

const Home = () => {

    const [workouts, setWorkouts] = useState([
        { title : 'Barbell Press', weight : 30, reps : 10, id : 1 },
        { title: 'Barbell Press', weight : 40, reps : 10, id : 2 },
        { title: 'Dumbell', weight : 15, reps : 12, id : 3 },
        { title : 'Squats', weight : 0, reps : 10, id : 4 }
    ])

    const handleDelete = (id) => {
        const newWorkouts = workouts.filter((workout) => workout.id !== id);
        setWorkouts(newWorkouts);
    }

    return (
        <div className="home">
            <Workoutlist workouts = {workouts} title = "All workouts!" handleDelete = {handleDelete}/>
            <br />
        </div>
      );
}
 
export default Home;