import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();
    // const location=useLocation();
    // const token=location.state.token;
    // const setToken=location.state.setToken;
    const [token,setToken]=useState('');

    const submitLogin = (e) => {
        e.preventDefault();
        const data = { email, password };
        console.log(data);
        setError("");

        fetch('https://workoutapi-fjcr.onrender.com/api/user/login',
            {

                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then((res) => {
                if (res.ok) {
                    console.log(res);
                    console.log("Successfully Logged in");
                    return res.json();
                }
                else {
                    setEmail("");
                    setPassword("");
                    setError("Invalid Email or Password");

                }
            })
            .then((res) => {
                console.log(res);
                setToken(res.token);
                history.push({ pathname: "/Home", state: { token: res.token } });
            })
    }

    return (

        <div className="login">

            <h2>Please Login!</h2>

            <form onSubmit={submitLogin}>
                <label >Email:</label>
                <input type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="login-error">{error}</div>
                <button>Login</button>
            </form>
        </div>


    );
}

export default Login;