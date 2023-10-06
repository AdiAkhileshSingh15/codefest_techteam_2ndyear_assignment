import user_icon from'./person.png'
import email_icon from'./email.png'
import password_icon from'./password.png'
import './loginsignup.css'
import { useState } from 'react'

const Loginsignup = () => {
    const [action, setAction] = useState("Sign Up")
    return ( 
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> :  <div className="input">
                    <img src = {user_icon} />
                    <input type = "text" placeholder = "Name"/>
                </div>}
                <div className="input">
                    <img src = {email_icon} />
                    <input type = "email" placeholder = "Email ID"/>
                </div>
                <div className="input">
                    <img src ={password_icon} />
                    <input type = "password" placeholder = "password"/>
                </div>
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick = {() => {setAction("Sign Up")}}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick = {() =>{ setAction("Login")}}>Log In</div>
            </div>
        </div>
     );
}
 
export default Loginsignup;