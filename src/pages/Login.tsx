import { FC,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import { LoginProps } from '../types/Interfaces';

const Login: FC<LoginProps> = () => {
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);

    

    return (
        <div>
            <Navbar />
            <div className='flex justify-center h-screen'>
            <LoginForm />
            </div>
        </div>
    );
};

export default Login;
