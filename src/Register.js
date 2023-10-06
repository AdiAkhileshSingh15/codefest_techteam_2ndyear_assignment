import { useState } from "react";
import Identity from "./Identity";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);
    const [validpswd, setValidpswd] = useState(1);
    const [validEmail, setValidEmail] = useState(null);
    const [success, setSuccess] = useState(null);

    const handlePassword = (e) => {
        let newpass = e.target.value
        setPassword(newpass);
        var regex1 = /[a-z]/g
        var regex2 = /[A-Z]/g
        var regex3 = /[0-9]/g
        var regex4 = /[!@#\$%\^\&*\)\(+=._-]/g
        setValidpswd(0);
        if ((!newpass.match(regex1)) || (!newpass.match(regex2)) || (!newpass.match(regex3)) || (!newpass.match(regex4))) {
            setError1("\u2718 Password must contain atleast 1 Uppercase(A-Z),1 Lowercase(a-z),1 Number(0-9),1 Special character.");
            setValidpswd(1);
        }
        else {
            setError1('');
        }
        if (newpass.length < 8) {
            setError2("\u2718 Password must contain minimum 8 characters.");
            setValidpswd(1);

        }
        else {
            setError2('');
        }


    }

    const submitRegister = (e) => {

        e.preventDefault();
        const data = { email, password };


        fetch('https://workoutapi-fjcr.onrender.com/api/user/signup',
            {

                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then((res) => {
                if (res.ok) {
                    console.log("Successfully Registered!!");
                    setSuccess("Successfully Registered, Please Login to continue!!");
                    setValidEmail("");
                }
                else {
                    setSuccess("");
                    setValidEmail("Email ID is either invalid or already used.");
                    setEmail('');
                    setPassword('');
                }
            })

    }



    return (

        <div className="register">
            <h2>Please Register!</h2>
            <div>{validEmail}</div>
            <form onSubmit={submitRegister}>
                

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
                        onChange={handlePassword}
                    />
          
                <button disabled={validpswd} >Register</button>
            </form>
                <div className="passworderror">
                    <p>{error1}</p>
                    <p>{error2}</p>
                </div>
            <div className="register-success">{success}</div>
        </div>
    );
}

export default Register;