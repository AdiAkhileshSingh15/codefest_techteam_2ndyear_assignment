import { FC, useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { WorkoutCardProps } from '../types/Interfaces';
import { submitHandlerType } from '../types/Utils';

const WorkoutCard: FC<WorkoutCardProps> = ({ workout, setNumOfWorkouts }) => {
    const { editingId, setEditingId, token, successToast, errorToast } = useContext(AuthContext);
    const [load, setLoad] = useState<string>(workout.load);
    const [reps, setReps] = useState<string>(workout.reps);
    const prevLoad: string = workout.load;
    const prevReps: string = workout.reps;
    const baseUrl: string | undefined = "https://workoutapi-fjcr.onrender.com/api";

    const editHandler = () => {
        setEditingId(workout._id);
    }

    const cancelHandler = () => {
        setEditingId("");
    }

    const deleteHandler = () => {
        axios.delete(`${baseUrl}/workouts/${workout._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            successToast("Workout deleted successfully");
            setNumOfWorkouts(prev => prev - 1);
        }).catch(err => {
            errorToast(err.response.data.error);
        });
    }

    const saveHandler:submitHandlerType = (e) => {
        e.preventDefault()
        if (prevLoad === load && prevReps === reps) return setEditingId("")
        if (isNaN(Number(load))) return errorToast("Load must be a number");
        if(isNaN(Number(reps))) return errorToast("Reps must be a number");

        axios.patch(`${baseUrl}/workouts/${editingId}`, {
            load: Number(load), 
            reps: Number(reps)
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            successToast("Workout edited successfully");
            setEditingId("")
        }).catch(err => errorToast(err.response.data.error))
    }


    return (
        <>
            {
                workout._id === editingId ?
                    <form onSubmit={saveHandler} className='bg-blue-100 flex h-28 mt-5 w-[35rem] justify-between px-6 items-center rounded-lg'>
                        <div className='flex flex-col'>
                        <span className='font-mono text-sm'>Title </span> <span className='border border-gray-500 p-2 rounded-md'>{workout.title} </span>
                        </div>
                        <div className='flex flex-col'>
                        <label htmlFor="load" className='font-mono text-sm'>Load</label>
                        <input type="text" id='title' value={load} onChange={(e: ChangeEvent<HTMLInputElement>) => setLoad(e.target.value)}  className='border border-gray-500 p-2 rounded-md w-11'/>
                        </div>
                        <div className='flex flex-col'>
                        <label htmlFor="reps" className='font-mono text-sm'>Reps</label>
                        <input type="text" id='reps' value={reps} onChange={(e: ChangeEvent<HTMLInputElement>) => setReps(e.target.value)}  className='border border-gray-500 p-2 rounded-md w-11'/>
                        </div>
                        <button type='submit' className='w-20 bg-amber-600 text-white rounded-md h-10 relative top-2'>Save</button>
                        <button onClick={cancelHandler} className='w-20 bg-red-500 text-white rounded-md h-10 relative top-2'>Cancel</button>

                    </form> :
                    <div className='bg-blue-100 flex h-28 mt-5 w-[35rem] justify-between px-6 items-center rounded-lg'>
                        <div className='flex flex-col'>
                            <span className='font-mono text-sm'>Title </span> <span className='border border-gray-500 p-2 rounded-md'>{workout.title} </span>
                        </div>
                        <div className='flex flex-col'>
                        <span className='font-mono text-sm'>Load </span> <span className='border border-gray-500 p-2 rounded-md w-11'>{workout.load} </span>
                        </div>
                        <div className='flex flex-col'>
                        <span className='font-mono text-sm'>Reps </span> <span className='border border-gray-500 p-2 rounded-md w-11'>{workout.reps} </span>
                        </div>
                        <button onClick={editHandler} className='w-20 bg-amber-500 text-white rounded-md h-10 relative top-2'>Edit</button>
                        <button onClick={deleteHandler} className='w-20 bg-red-600 text-white rounded-md h-10 relative top-2'>Delete</button>
                    </div>
            }
        </>
    )
}

export { WorkoutCard }