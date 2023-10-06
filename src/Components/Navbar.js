import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogButton from "./LogButton";


const Navbar = () => {
    const {isLoggedIn,logout} = useContext(AuthContext);
    return (
        <nav>
            {
                isLoggedIn ?
                <LogButton onclick={logout} text="Logout"/>:
                <></>
            }
        </nav>
    )
}

export default Navbar