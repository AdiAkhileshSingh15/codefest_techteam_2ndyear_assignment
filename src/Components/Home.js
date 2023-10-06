import React from 'react';
import Cookies from 'js-cookie';

const Home = () => {
    const authToken = Cookies.get('authToken');
    const authEmail = Cookies.get('authEmail');

    return ( 
        <div className="default-body">
            {!authToken && (
                <React.Fragment>
                    <div className="max-w-md w-full space-y-8 text-center">
                        <h1>Welcome to Workout Buddy!</h1>
                        <p>
                            Hello, There! Welcome to Workout Buddy! <br />
                            Currently, You're <b className='text-red-500'>Not Logged In.</b> <br /><br />
                            Kindly Sign up or Log in to Use the Workouts Section.
                        </p> 
                        <div className="flex flex-row justify-center">
                            <a href="/signup" className='w-1/2 bottom-button'>Sign up</a>
                            <a href="/login" className='w-1/2 bottom-button '>Log in</a>
                        </div>
                    </div>
                    
                </React.Fragment>
            )}

            {authToken && (
                <React.Fragment>
                    <div className="max-w-md w-full space-y-8 text-center">
                        <h1>Welcome to Workout Buddy!</h1>
                        <p>
                            Hello, There! Welcome to Workout Buddy! <br />
                            Currently, You're <b className='text-red-500'>Logged In</b> as <b className="text-purple-800">{authEmail}.</b> <br /><br />
                            Click the below link to visit the Workouts Section.
                        </p> 
                        <div className="flex flex-row justify-center">
                            <a href="/workouts" className='w-full bottom-button'>Workouts</a>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
     );
}
 
export default Home;