import React, { createContext, useEffect, useState} from "react";
import { AuthContextType, AuthProviderProps } from "../types/Interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    token: null,
    setToken: () => { },
    logout: () => { },
    editingId: "",
    setEditingId: () => {},
    successToast: () => {},
    errorToast: () => {}
});

const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
    const jwt = localStorage.getItem("token");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!jwt);
    const [token, setToken] = useState<string | null>(jwt);
    const [editingId, setEditingId] = useState<string>("");

    const successToast = (message: string|null) => {
		toast.success(message ,{
			position: toast.POSITION.TOP_CENTER
		});
	}

	const errorToast = (message:string|null) => {
		toast.error(message ,{
			position: toast.POSITION.TOP_CENTER
		});
	}

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }
    }, [token]);

    const logout = () => {
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, token, setToken, logout, editingId,  setEditingId, successToast, errorToast}}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
