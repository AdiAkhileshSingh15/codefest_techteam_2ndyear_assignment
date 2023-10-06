import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    token: null,
    setToken: () => { },
});

const AuthProvider = ( {children} ) => {
    const jwt = localStorage.getItem('token');
    const [token, setToken] = useState(jwt);

    useEffect(() => {
        if(token){
            localStorage.setItem('token', token);
        }
        else{
            localStorage.removeItem("token");
        }
    }, [token]);

    return(
        <AuthContext.Provider
            value={{ token, setToken }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };