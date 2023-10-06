import React, { useState } from 'react';



const CreateWorkout = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [ error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
      
        

  async function handleSubmit(event)  {
    event.preventDefault();
    const userToken= localStorage.getItem("user-token");
    const newWorkout = {
      title,
      load: parseFloat(load),
      reps: parseInt(reps),
    };
    try {
      const response = await fetch("https://workoutapi-fjcr.onrender.com/api/user/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer ${`userToken`}",
          "Accept": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Workout created successfully");
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
    catch (error) {
          setError("An error occurred during registration");
          console.error("An error occurred:", error);
        } 
    setTitle('');
    setLoad('');
    setReps('');
  };



  return (
    <div className="workout-container">
  <h2>Create a New Workout</h2>
  <form onSubmit={handleSubmit}>
    <div className="input-row">
      <label className ='Text'>Title:</label>
      <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div className="input-row">
      <label className ='Text'>Load:</label>
      <input type="number" className="input-field" value={load} onChange={(e) => setLoad(e.target.value)} />
    </div>
    <div className="input-row">
      <label className ='Text'>Reps:</label>
      <input type="number" className="input-field" value={reps} onChange={(e) => setReps(e.target.value)} />
    </div>
    <button type="submit" className="create-button">Create Workout</button>
  </form>
  {error && <p className="error-message">Error: {error}</p>}
</div>

  );
  };

export default CreateWorkout;