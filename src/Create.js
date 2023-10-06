import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState(0);
  const [load, setLoad] = useState(0);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleCreateWorkout = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if the title is provided
    if (!title) {
      setError('Please enter a title for the workout.');
      return;
    }

    // Parse reps and load as integers
    const parsedReps = parseInt(reps, 10);
    const parsedLoad = parseInt(load, 10);

    if (isNaN(parsedReps) || isNaN(parsedLoad)) {
      setError('Reps and Load must be valid numbers.');
      return;
    }

    const payload = {
      title,
      reps: parsedReps,
      load: parsedLoad,
    };

    // Send a POST request to create the new workout
    const response = await fetch('https://workoutapi-fjcr.onrender.com/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Workout created successfully, you can redirect the user to a success page or "My Workouts" page
      navigate('/');
    } else {
      const errorMessage = await response.text();
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Create a New Workout</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div>
          <label>Load:</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleCreateWorkout}>Create Workout</button>
      </form>
    </div>
  );
};
export default Create;
