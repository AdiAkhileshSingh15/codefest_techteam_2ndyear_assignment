import { Link } from "react-router-dom";
const Notfound = () => {
    return ( 
        <div className="not-found">
            <p>Sorry The requested page is not available</p>
            <Link to ="/">Go Back to home</Link>
        </div>
     );
}
 
export default Notfound;