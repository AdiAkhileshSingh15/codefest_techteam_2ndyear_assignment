import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Getall = ({data,title,handledelete}) => {
    return ( 
        <div className="container">
            <div className="mt-3">
                 <h3>{title}</h3>
                 <table className="table">
                     <thead>
                         <tr>
                             <th>Title</th>
                             <th>Load</th>
                             <th>Reps</th>
                         </tr>
                     </thead>
                     <tbody>
                         {data.map((workout)=>{
                            return (

                            <tr key={workout._id}>
                            <Link to={`/workouts/${workout.id}`}>
                            <th>{workout.title}</th>
                            <th>{workout.load}</th>
                            <th>{workout.reps}</th>
                            </Link>
                        </tr>
                            )})}
                        
                        </tbody>
                </table>
                <Link to='/workouts'><button src="">Add New workout</button></Link>
            </div>
        </div>
     );
}
 
export default Getall;