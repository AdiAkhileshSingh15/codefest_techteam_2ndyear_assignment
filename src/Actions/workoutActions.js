import axios from "axios"
import Cookies from "js-cookie"

axios.defaults.baseURL = "https://workoutapi-fjcr.onrender.com/api"
const token = Cookies.get("token")
const config = {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
}
//done
export const GetAllWorkouts = async () => {
  try {
    const { data } = await axios.get("/workouts", config)
    return data
  } catch (error) {
    return error.message
  }
}

//done
export const CreateWorkout = async (title, reps, load) => {
  try {
    const json = {
      title: title,
      load: Number(load),
      reps: Number(reps),
    }
    const { data } = await axios.post("/workouts", json, config)
    return {
      success: true,
      message: "Product added Successfully",
      data: data,
    }
  } catch (error) {
    return {
      success:false,
      message: "Failed to create Product"
    }
  }
}

//done
export const DeleteWorkout = async (id) => {
  try {
    const { data } = await axios.delete(`/workouts/${id}`, config)
    console.log(data)
    return {
      success: true,
      message: "Workout deleted Successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete workout",
    }
  }
}

//done
export const UpdateWorkout = async (id, newWorkout) => {
  try {
    const { data } = await axios.patch(`/workouts/${id}`, newWorkout, config)
    return {
      success: true,
      data: data,
      message: "Update Successfully",
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Failed to Update Workout",
    }
  }
}

export const GetSingleWorkout = async (id) => {
  try {
    const { data } = await axios.get(`/workouts/${id}`, config)
    return { success: true, data: data }
  } catch (error) {
    return {success:false, error: error.message}
  }
}
