import React from 'react';

function LogoutButton() {
    const handleLogout = () => {
        localStorage.removeItem('user-token');
        window.location.href = '/';
    };

    return (
        <button className="logout_btn" onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;