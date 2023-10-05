import { FC, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';
import { SignupProps } from '../types/Interfaces';

const Signup: FC<SignupProps> = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex justify-center h-screen'>
            <SignupForm />
            </div>
        </div>
    );
};

export default Signup;
