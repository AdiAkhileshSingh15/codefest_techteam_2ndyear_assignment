import { FC, useState, useContext, ChangeEvent } from 'react'
import { submitHandlerType } from '../types/Utils';
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext';
import { AddWorkoutProps } from '../types/Interfaces';

const AddWorkout: FC<AddWorkoutProps> = ({ setNumOfWorkouts }) => {
    const [title, setTitle] = useState<string>("");
    const [load, setLoad] = useState<string>("");
    const [reps, setReps] = useState<string>("");
    const baseUrl: string | undefined = "https://workoutapi-fjcr.onrender.com/api";
    const { token, successToast, errorToast } = useContext(AuthContext)
    const addWorkoutsHandler: submitHandlerType = e => {
        try {
            e.preventDefault();
            if (!title) {
                return errorToast("Title cannot be empty");
            }
            if (isNaN(Number(load))) return errorToast("Load must be a number");
            if(isNaN(Number(reps))) return errorToast("Reps must be a number");
            
            axios.post(`${baseUrl}/workouts`, {
                title, 
                load: Number(load), 
                reps: Number(reps)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(() => {
                    setNumOfWorkouts(prev => prev + 1);
                    setLoad("");
                    setReps("");
                    setTitle("");
                    successToast("Workout Added successfully")
                })
                .catch(err => {
                    console.log(err)
                    errorToast(err.response.data.error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form action="/" onSubmit={addWorkoutsHandler} className='bg-gray-200 flex h-28 mt-5 w-[36rem] justify-between px-6 items-center rounded-lg mb-8'>
                <div className='flex flex-col'>
                    <label htmlFor="addTitle" className='font-mono text-sm'>Title</label>
                    <input
                        type="text"
                        name="title"
                        id="addTitle"
                        placeholder='Title'
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        className='w-32 rounded-md px-2 focus:outline-none' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="addLoad" className='font-mono text-sm'>Load</label>
                    <input
                        type="text"
                        name="load"
                        id="addLoad"
                        placeholder='Load'
                        value={load}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLoad(e.target.value)}
                        className='w-16 rounded-md px-2 focus:outline-none' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="addReps" className='font-mono text-sm'>Reps</label>
                    <input
                        type="text"
                        name="reps"
                        id="addReps"
                        placeholder='Reps'
                        value={reps}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setReps(e.target.value)}
                        className='w-16 rounded-md px-2 focus:outline-none' />
                </div>
                <button type="submit" className='w-20 bg-green-700 text-white rounded-md h-10 mx-3 relative top-3'>Add</button>

            </form>
        </>
    )
}

export default AddWorkout