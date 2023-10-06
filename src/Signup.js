import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const history = useHistory();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const user = {email, password};
        
        fetch('https://workoutapi-fjcr.onrender.com/api/user/signup', {
            method : 'POST',
            body: JSON.stringify(user),
            headers: {"Content-Type": "application/json",
                        "Accept": 'application/json'},
        })
        .then(
            history.push('/Signin')
        )
        console.log(user);
    }
    return (
        <>
        
        <div className='logout' >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="nav-bar">
          <div className="top-left">
            <div className="dumbell">
            <i class="fa-solid fa-dumbbell">Workout Buddy</i>
            </div>
          </div>
        </div>
      </div>

        <div className="signup-container">
            <div className="signup-form">
            <h1>SignUp</h1>
            <label htmlFor="email">email: </label>
            <input type="text" 
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            /> 
            <br />
            <label htmlFor="password">
            password: </label>
            <input type="password" 
            id="password"
            required
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/> 
            <br/>
            <button onClick={handleSignUp}>Signup</button>
            </div>
        </div>
        </>
    );
}
 
export default SignUp;