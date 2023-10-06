import {Link} from 'react-router-dom'
import './styles/home.css'

const Users = () => {
    return ( 
       <div className='welcome'>
        <h1>Welcome to Workout Buddy</h1>
        <Link to='/signup' > Sign up</Link>
        <br/>
        <br/>
        <br/>
       <Link to='/login' > Login </Link> 
       <br/>
       <h3>"Your body can do it,it's time to convince your mind"</h3>
       </div>
     );
}
 
export default Users;