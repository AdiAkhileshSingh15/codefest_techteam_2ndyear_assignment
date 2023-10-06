const Workoutlist = ({workouts, title, handleDelete}) => {
    return ( 
        <div className="workout-list">
            <h1>{ title }</h1>
            {workouts.map((workout) => (
                <div className="workout-preview" key = { workout.id }>
                    <h2>{ workout.title }</h2>
                    <p>
                        weight : {workout.weight}
                        reps : {workout.reps}
                    </p>
                    <button onClick = {()=>{handleDelete(workout.id)}}>Delete workout</button>
                    <br />
                    <br />
                </div>
            ))}
        </div>
     );
}
 
export default Workoutlist;