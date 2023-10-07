import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)
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
        axios.post('https://workoutapi-fjcr.onrender.com/api/user/signup', profile, config)
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
        <div className="create">
            <h2>New User</h2>
            <section style={{ textAlign: 'end' }}>
                <Link to="/">Home</Link>
            </section>
            <form onSubmit={handleSubmit}>
                <label> User EmailAddress: </label>
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
                    ></input>
                </div>
                <div>
                    {!pending && <button type="submit">Sign Up</button>}
                    {pending && <button disabled>Creating User...</button>}
                    {error && (
                        <div>
                            {error}
                        </div>
                    )
                    }
                    {success && (
                        <div>
                            <h5>Successfully Registered! Redirecting...</h5>
                        </div>
                    )}
                </div>
                {!pending && (
                    <div style={{ alignContent: 'end', paddingTop: '20px' }}>
                        Already Registered?{' '}
                        <Link to="/login">Log In</Link>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Signup;