import { Link } from "react-router-dom";
import { useState } from "react";



const Identity = () => {

    return (
        <div className="identity-method">
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
        </div>
    );
}

export default Identity;