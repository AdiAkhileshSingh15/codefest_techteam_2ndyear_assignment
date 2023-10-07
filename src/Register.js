import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    async function signUp() {
        const requestBody = {
            email: Email,
            password: Password,
        };

        try {
            const response = await fetch("https://workoutapi-fjcr.onrender.com/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const result = await response.json();

                if (result.email && result.token) {
                    alert(`Registration successful\nEmail: ${result.email}\n`);

                    history.push("/login");
                } else {
                    setError("Registration response missing email or token");
                }
            } else {
                const errorResponse = await response.json();
                setError(`Registration failed: ${errorResponse.error}`);
            }
        } catch (error) {
            setError("An error occurred during registration");
            console.error("An error occurred:", error);
        }
    }

    return (
        <div className='backgnd'>
            <h1 className='h11'>Register</h1>
            <div className='User_reg'>
                <input
                    type='email'
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='user_email'
                ></input>
                <br />
                <input
                    type='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='user_pass'
                ></input>
                <br />
                <button className='btn-signUp' onClick={signUp} >Sign Up</button>
                {error && <p className='error-message'>{error}</p>}
            </div>
        </div>
    );
}

export default Register;