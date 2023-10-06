import { Link } from "react-router-dom";
const LoginError = () => {
    return ( 
        <div className="login-error">
            <p>Authentication failed</p>
            <Link to ="/">Go Back to Home</Link>
        </div>
     );
}
 
export default LoginError;