import axios from "axios"
import Cookies from "js-cookie"

const options = {
  expires: 3, //3 days
  secure: true,
  sameSite: "strict",
  path: "/",
}

// const baseURL ="https://workoutapi-fjcr.onrender.com/api"
axios.defaults.baseURL = "https://workoutapi-fjcr.onrender.com/api"

export const Register = async (email, password) => {
  try {
    const { data } = await axios.post(
      "/user/signup",
      {
        email: email,
        password: password,
      }
    )
    Cookies.set("token", data.token, options)

    return {
      success: true,
      data: data,
      message: "Registered Successfully!",
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message:
        "Register Failed!! Try a stronger Password or use Different Email",
    }
  }
}

export const Login = async (email, password) => {
  try {
    const { data } = await axios.post(
      "/user/login",
      {
        email: email,
        password: password,
      }
    )
    Cookies.set("token", data.token, options)
    return {
      success: true,
      data: data,
      message: "Logged in successfully!",
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Log in failed! Check your email and password",
    }
  }
}

export const Logout = async () => {
  try {
    Cookies.remove("token")
    return {
      success: true,
      message: "Logged Out successfully",
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Log out failed! Try again later",
    }
  }
}
