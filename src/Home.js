import {Link} from 'react-router-dom';
const Home = () => {
    return ( 
        <div className="home">
            <h1>Welcome To Codefest24</h1>
            <p>You can upload and checkout all your workouts here!!</p>
            <Link to ="/Signup">SIGNUP</Link>
            <Link to ="/Login">LOGIN</Link>
        </div>
     );
}
 
export default Home;