import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Login = () => {
    const [error, setError] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [pending, setPending] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setPending(true);
        const profile = { "email": email, "password": password };
        axios.post('https://workoutapi-fjcr.onrender.com/api/user/login', profile, config)
        .then((res) => {
            setSuccess(true);
            setError(null);
            const { token } = res.data;
            localStorage.setItem('email', email);
            localStorage.setItem('token', token);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        })
        .catch((err) => {
            setPending(false);
            setError('Invalid email or password');
            setSuccess(false);
            setTimeout(() => {
                setError(null);
            }, 1500)
        })
    }

    return (
        <div className='login'>
            <h2>Log In</h2>
            <section style={{ textAlign: 'end' }}>
                <Link to="/">Home</Link>
            </section>
            <form onSubmit={handleSubmit}>
                <label>EmailAddress: </label>
                <div>
                    <input
                        type="email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <label> Password: </label>
                <div>
                    <input
                        type="password"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div>
                    {!pending && <button type="submit">Log In</button>}
                    {pending && <button disabled>Fetching Info...</button>}
                    {error && (
                        <div>
                            {error}
                        </div>
                    )
                    }
                    {success && (
                        <div>
                            <h5>Successfully Fetched Info! Redirecting...</h5>
                        </div>
                    )}
                </div>
                {!pending && (
                    <div style={{ alignContent: 'end', paddingTop: '20px' }}>
                        New to WorkOutBuddy?{' '}
                        <Link to="/signin">Sign Up</Link>
                    </div>
                )}
            </form>
        </div>
  )
}

export default Login;