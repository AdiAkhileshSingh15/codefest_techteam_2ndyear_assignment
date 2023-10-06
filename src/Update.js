
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Update() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [workout, setWorkout] = useState([]);
  const token = localStorage.getItem("user-token");
  

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if(!token) {
        setError('Access token is missing.');
        return;
    }
    axios
      .get(`https://workoutapi-fjcr.onrender.com/api/workouts/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((response) => {
        setWorkout(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError('No such workout');
        } else {
          setError('An error occurred');
        }
      });
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const workoutData = {
        title,
        reps: parseInt(reps),
        load: parseInt(load),
      };
      console.log(token);
      const response = await axios.patch(
        `https://workoutapi-fjcr.onrender.com/api/workouts/${id}`,
        workoutData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      history.push("/getWorkouts");
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  return (
    <>
    <div className='logout' >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="nav-bar">
          <div className="top-left">
            <div className="dumbell">
            <i class="fa-solid fa-dumbbell">Workout Buddy</i>
            </div>
          </div>
        </div>
      </div>
    <div className="signup-container">
      <div className="create-workout">
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="workout-title" >
          Title:  {workout.title}
        </label>

        <br />
        <label>
          Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
        <br />
        <label>
          Load:
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Update Workout
        </button>
       
      </form>
      <br /><br />
      <div className='all_wk-button'>
      <Link to={'/getWorkouts'}> <button>All workouts</button></Link>
      </div>
      </div>
    </div>
    </>
  );
}

export default Update;
