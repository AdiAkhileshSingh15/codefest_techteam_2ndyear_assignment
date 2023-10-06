import {Link} from 'react-router-dom';
import './styles/navbar.css'
const Navbar = (props) => {
    const token=props.token;

    return ( 
        <nav className='navbar'>
            <h2>All Workouts</h2>
          <div className='links'>  
            <Link to={`/create/${token}`}>Create a new Workout</Link>
            </div>
        </nav>

     );
}
 
export default Navbar;