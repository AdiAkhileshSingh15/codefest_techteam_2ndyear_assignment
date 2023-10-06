import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <>
            <div className='header'>
                <span className='banner'>
                    <h1 className='banner-text'>WORKOUT  BUDDIES</h1>
                </span>
                <div className='head-btn'>
                    <p className='para'>
                        <Link to="/login" className='links'>Log In</Link>
                    </p>
                    <p className='para'>
                        <Link to="/register" className='links'>Sign Up</Link>
                    </p>
                </div>
            </div>
            <div className='ctn'>
                <h1 className='head'>You may not be there yet,<br />
                    but you are closer than you were yesterday...</h1>
            </div>
        </>
    );
}

export default LandingPage;
