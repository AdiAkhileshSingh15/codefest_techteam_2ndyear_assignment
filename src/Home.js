
import Getall from './Getall';
import useFetch from './Fetch';
const Home = () => {
       

// res.json passes the json into a javascript object for us.AS IT TAKES SOME TIME TO DO HENCE ASYNCHRONOUS SO PROMISE
const {data: workouts,isLoading,error} = useFetch('https://workoutapi-fjcr.onrender.com/api/workouts/')


    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div>Loading ...</div>}
             {workouts && <Getall workouts={workouts} title="All Workouts"/>}
      </div>        
     );
}

 
export default Home;
        