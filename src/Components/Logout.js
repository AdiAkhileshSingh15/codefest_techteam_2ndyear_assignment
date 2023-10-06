import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        Cookies.remove('authToken');
        Cookies.remove('authEmail');

        setTimeout(() => {
            history.push('/');
            window.location.reload();
        }, 1500);
    }, [history]);

    return ( 
        <div className='default-body'>
            <div className="max-w-md w-full space-y-8 text-center text-xl font-bold">
                Logging Out...
            </div>
        </div>
     );
}
 
export default Logout;