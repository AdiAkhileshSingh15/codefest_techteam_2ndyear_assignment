import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const options = {
  path:'/',
  sameSite:'strict',
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true
}

const baseURL = 'https://workoutapi-fjcr.onrender.com/api';


//function to register a new user
export const Register= async (em,pass)=>{
 try {
    const response = await axios.post(`${baseURL}/user/signup`, {
      email: em,
      password: pass,
    });

    const { email, token } = response.data;
    await Cookies.set("token",token,options);
    document.cookie = "token=" + token;
    console.log(Cookies.get("token"));
    console.log(token);
    return true;
} catch (error) {
    window.alert(error.message);
    return false;
  }
  
}



//function to login a user
export const LoginUser = async (em, pass) => {
    console.log("login to call ho gya");
    try {
        const response = await axios.post(`${baseURL}/user/login`, {
          email: em,
          password: pass,
        });
    
        const { email, token } = response.data;
        await Cookies.set("token",token,options);
        document.cookie = "token=" + token;
        console.log(Cookies.get("token"));
        console.log(token);
        return true;
    } catch (error) {
        // console.error('Login failed:', error.message);
        window.alert(error.message);
        return false;
      }
} 




//function to fetch all the workouts
export const fetchWorkouts = async () => {
    let c = Cookies.get("token");
    const authToken = `Bearer ${c}`;
    try {
        console.log(authToken);
        const response = await axios.get(`${baseURL}/workouts`, {
          headers: {
            Authorization: authToken,
          },
        });
     
        return response;
      } catch (error) {
        window.alert("Unable to fetch data");
      }
}



//function to get a workout by id
export const SearchById = async (id) => {
  let c = Cookies.get('token');
  const authToken = `Bearer ${c}`;
    try{
        const response = await axios.get(`${baseURL}/workouts/${id}`, {
            headers: {
              Authorization: authToken,
            },
        });
        console.log(response);
        return response;
    }
    catch (error){

        window.alert(error.message);
       
    }
}

//function to delete an item
export const DeleteItem = async (id) =>{
    let c = Cookies.get('token');
    const authToken = `Bearer ${c}`;
    console.log("bhai call to hua main");
    console.log(id);
    try{
        axios.delete(`${baseURL}/workouts/${id}`,{
          headers:{
            Authorization: authToken,
          },
        });
        return true;
    }catch(error){
        window.alert(`Unable to delete the item! ${error.message}`);
        return false;
    }
}


//function to update a workout
export const UpdateItem = async (l,r,id) => {
  console.log(l);
  console.log(r);
  let c = Cookies.get('token');
  const authToken = `Bearer ${c}`;
  const patchData = {
    load: Number(l),
    reps: Number(r),
  };

  const axiosConfig = {
    // baseURL,
    headers: {
      Authorization: `Bearer ${c}`,
    },
  };

  
  try{
    console.log("I'm called");
    const response = await axios.patch(`${baseURL}/workouts/${id}`,patchData, axiosConfig);
    console.log(response);
    return true;
  }catch(error){
    return false;
  }
}


export const AddItem = async (t,l,r) => {
  let c = Cookies.get('token');
  const authToken = `Bearer ${c}`;
  const newData = {
    title: t,
    load: Number(l),
    reps: Number(r),
  };
  const axiosConfig = {
    // baseURL,
    headers: {
      Authorization: `Bearer ${c}`,
    },
  };

  try{
    console.log("I'm called");
    const response = await axios.post(`${baseURL}/workouts`,newData, axiosConfig);
    console.log(response);
    return true;
  }catch(error){
    return false;
  }
}