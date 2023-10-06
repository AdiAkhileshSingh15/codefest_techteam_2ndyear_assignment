import {useState } from 'react';
import { useHistory } from 'react-router-dom';
const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const history=useHistory();
    const handleSubmit= (e) => {
        e.preventDefault();
        const newuser = { email: formData.email, password: formData.password };
        fetch('https://workoutapi-fjcr.onrender.com/api/user/signup',{
            method :'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(newuser)
        })
       .then((res) => {
        if(res.ok)
        {
          history.push('/Login');
        }
        else
        {
          throw new Error('Signup invalid');
        }
       }) 
          .catch((error) => {
            console.error('Signup error:', error);
          });
    }
    return ( 
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label> UserEmail: </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>  setFormData({ ...formData, email: e.target.value })}
                />
                <label> Password :</label>
                <input 
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>  setFormData({ ...formData, password: e.target.value })}
                />
                <button >SignUp</button>
            </form>
        </div>
     );
}
 
export default Signup;