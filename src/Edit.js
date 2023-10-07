import { useState , useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import axios from 'axios';
const EditItem = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    // Fetch the item data from the API when the component mounts
    axios.get('https://workoutapi-fjcr.onrender.com/api/workouts/'+id)
      .then(response => {
        setTitle(response.data.title);
        setLoad(response.data.load);
        setReps(response.data.reps);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
      });
  }, []);

  const item = {title:title,load:load,reps:reps};

  const handleEditClick = () => {
    // Enable editing mode
    setIsEditing(true);
  };

  const handleSave = (e) => {
    // Send a PUT or PATCH request to update the item on the server
    axios.patch('https://workoutapi-fjcr.onrender.com/api/workouts/'+ id, item)
      .then(response => {
        // Update the state with the edited item data
        setTitle(response.data.title);
        setLoad(response.data.load);
        setReps(response.data.reps);
        // Disable editing mode
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
    //   const { name, value } = e.target;
    // setItem({ ...item, {name}: value });
  };


  return (
    <>
    <div className="create">
      <h2>Edit Workout</h2>
      <form onSubmit={handleSave}>
        <label>Workout title:</label>
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>No of Repetitions:</label>
        <input
          type="number"
          name="reps"
          required
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      <label>Amount of load:</label>
          <input
            type="number"
            name="load"
            required
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
    </>
  );

  }

  export default EditItem;
