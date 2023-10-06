import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WoList = ({ wos, title, onEditClick }) => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState(wos); // Use a state for workouts


const handleDeleteClick = async (woId) => {
  try {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm('Are you sure you want to delete this workout?');
    if (confirmDelete) {
      const response = await fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${woId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted workout from the list
        setWorkouts((prevWorkouts) => prevWorkouts.filter((wo) => wo._id !== woId));
        alert('Workout deleted successfully.');
      } else {
        alert('Failed to delete workout.');
      }
    } else {
      navigate('/');
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
};

  const handleEditClick = (woId) => {
    // Toggle the "editMode" property for the clicked workout
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((wo) =>
        wo._id === woId ? { ...wo, editMode: !wo.editMode } : wo
      )
    );
  };

  const handleEditSubmit = async (woId, newReps, newLoad) => {
    try {
      // Perform the PATCH request to update the workout with newReps and newLoad
      const token = localStorage.getItem('token');
      const response = await fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${woId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ reps: newReps, load: newLoad }),
      });

      if (response.ok) {
        // If the update is successful, remove the editMode and update reps and load
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((wo) =>
            wo._id === woId ? { ...wo, editMode: false, reps: newReps, load: newLoad } : wo
          )
        );
        alert('Workout updated successfully.');
      } else {
        alert('Failed to update workout.');
      }
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <div className="wo-list">
      <h1>{title}</h1>
      {workouts.map((wo) => (
        <div className="wo-preview" key={wo._id}>
          <h2>{wo.title}</h2>
          {!wo.editMode ? (
            <div>
              <p>reps : {wo.reps}</p>
              <p>load: {wo.load}</p>
            </div>
          ) : (
            <div className="edit-form">
              <input
                type="number"
                placeholder="New Reps"
                value={wo.newReps || ''}
                onChange={(e) =>
                  setWorkouts((prevWorkouts) =>
                    prevWorkouts.map((workout) =>
                      workout._id === wo._id
                        ? { ...workout, newReps: parseInt(e.target.value) }
                        : workout
                    )
                  )
                }
              />
              <input
                type="number"
                placeholder="New Load"
                value={wo.newLoad || ''}
                onChange={(e) =>
                  setWorkouts((prevWorkouts) =>
                    prevWorkouts.map((workout) =>
                      workout._id === wo._id
                        ? { ...workout, newLoad: parseInt(e.target.value) }
                        : workout
                    )
                  )
                }
              />
              <button
                className="submit-button"
                onClick={() => handleEditSubmit(wo._id, wo.newReps, wo.newLoad)}
              >
                Submit
              </button>
            </div>
          )}
          <p>_id: {wo._id}</p>
          <button className="delete-button" onClick={() => handleDeleteClick(wo._id)}>
            Delete
          </button>
          <button className="edit-button" onClick={() => handleEditClick(wo._id)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default WoList;

