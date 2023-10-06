import { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import Workouts from "./Workouts";
import Navbar from "./Navbar";

const Home = () => {
    const location=useLocation();
    const token=location.state.token;
    const [change,setChange]=useState(null);


    const {data,error} =useFetch({
        url:'https://workoutapi-fjcr.onrender.com/api/workouts',
        token:token,
        change:change,
    });
    console.log(data);
    return ( 
        <div className="Home">
            <Navbar token={token} />
            {data&&<Workouts data={data} token={token} setChange={setChange} change={change}/>}
        </div>
     );
}
 
export default Home;