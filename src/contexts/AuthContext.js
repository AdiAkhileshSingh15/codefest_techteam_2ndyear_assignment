import React,{useEffect, useState} from 'react';

const AuthContext = React.createContext({
    token: null,
    setToken: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    editId: "",
    setEditId: () => {},
    logOut: () => {}
});

const AuthProvider = ({children}) => {
    const jwt = localStorage.getItem("token");
    const [token,setToken] = useState(jwt);
    const [isLoggedIn,setIsLoggedIn] = useState(jwt? true:false);
    const [editId,setEditId] = useState("");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token",token);
            setIsLoggedIn(true);
        }
        else{
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }
    },[token]);

    const logout = () => {
        console.log("Hi")
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            token,setToken,isLoggedIn,setIsLoggedIn,editId,setEditId,logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext,AuthProvider}

