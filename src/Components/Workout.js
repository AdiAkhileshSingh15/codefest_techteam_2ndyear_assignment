import React from 'react';
import Cookies from 'js-cookie';
import Getall from './Getall';

const Workouts = () => {
    const authToken = Cookies.get('authToken');

    return ( 
        <div>
            {!authToken && (
                <React.Fragment>
                    <div className="default-body">
                        <div className="max-w-md w-full space-y-8 text-center">
                            <h1>Workouts</h1>
                            <p>
                                Not Allowed! <br />
                                Please Sign up or Log in to Continue.
                            </p> 
                            <div className="flex flex-row justify-center">
                                <a href="/signup" className='mx-4 my-4'><b className="text-blue-500">Sign up</b></a>
                                <a href="/login" className='mx-4 my-4'><b className="text-blue-500">Log in</b></a>
                            </div>
                        </div>
                    </div>
                    
                </React.Fragment>
            )}

            {authToken && (
                <React.Fragment>
                        <Getall /> 
                </React.Fragment>
            )}
        </div>
     );
}
 
export default Workouts;