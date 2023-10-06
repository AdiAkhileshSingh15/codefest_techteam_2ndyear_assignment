import { useHistory } from "react-router-dom/cjs/react-router-dom"

const Workouts = ({ data, token, setChange,change}) => {
    const history =useHistory();
    
    const deleteData = (_id) => {
        console.log("https://workoutapi-fjcr.onrender.com/api/workouts/" + _id)
        fetch("https://workoutapi-fjcr.onrender.com/api/workouts/" + _id,
        {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
            
        })
        .then(res => {
            console.log(res);
            setChange(_id);
        })
    }
    
    const editData = (workout)=>{
        const location_Edit={pathname:"/Edit",state:{token:token,workout:workout}};
        history.push(location_Edit);

    }

    return (
        <div className="workouts">


            {data.map(workout => (
                <div className="workout-details" key={workout._id}>

                    <p>Title:{workout.title}</p>
                    <p>Reps:{workout.reps}</p>
                    <p>Load:{workout.load}</p>

                    <button onClick={()=>{editData(workout)}}>Edit</button>
                    <button onClick={() => { deleteData(workout._id) }}>Delete</button>
                </div>
            ))

            }
        </div>
    );
}

export default Workouts;