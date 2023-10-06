import { Link } from "react-router-dom/cjs/react-router-dom";


const Navbar = ({ token }) => {
    const location_Home = { pathname: "/Home", state: { token: token } };
    const location_Create = { pathname: "/Create", state: { token: token } };

    return (
        <div className="navbar">
            
            { <ul>
                <li><Link to={location_Home}>Home</Link></li>
                <li><Link to={location_Create}>Create</Link></li>


            </ul>}
        </div>
    );
}

export default Navbar;