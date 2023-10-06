import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Workmenu from "./Workmenu";

const Deleteone = () => {
    const authToken = Cookies.get("authToken");
    const baseUrl = "https://workoutapi-fjcr.onrender.com/api";
    const [status, setStatus] = useState(null);
    const [id, setId] = useState(null);
    const [responseData, setResponseData] = useState([]);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.delete(`${baseUrl}/workouts/${id}`, {
            headers: {Authorization : `Bearer ${authToken}`}
        })
        .then(response => {
            console.log(response.data)
            setResponseData(response.data);

            if(response.status === 200)
            {
                setStatus('success');
                setMessage("Successfully Deleted Element:");
            } else {
                setStatus('failure');
            }
        })
        .catch(err => {
            console.error(err);
            setStatus('failure');
            setMessage("Failed Deleting Element. Error Message: " + err.response.data.error);
            console.log(err.response.data.error);
        });
    }

    return ( 
        <div className="default-body">
            <div className="max-w-4xl w-full space-y-2 text-center border">
                <Workmenu />
                <hr />
                <div className="py-3">
                    <h2 className="work-h2">Delete One</h2>

                    {!(status === 'success') && (
                        <React.Fragment>
                            <div className="flex flex-col justify-center items-center">
                                <form className="mt-8 space-y-2" action="#" onSubmit={handleSubmit}>
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                        <label htmlFor="id" className="sr-only">
                                            ID
                                        </label>
                                        <input
                                            id="id"
                                            name="id"
                                            type="text"
                                            autoComplete="id"
                                            required
                                            className="appearance-none rounded-md relative block w-full md:w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter ID"
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                        Delete Workout
                                        </button>
                                    </div>
                                </form>
                                <br />
                                <p className="text-orange-600 text-lg">{message}</p>
                            </div>
                        </React.Fragment>
                    )}
                    
                    {(status === 'success') && (
                        <React.Fragment>
                            <div className="my-4 space-y-4">
                                <div className="text-xl text-center font-medium poppins">{message}</div>
                                <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                                    <table className="w-full table-fixed">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="w-3/8 py-4 px-6 text-left text-gray-600 border font-bold uppercase">ID</th>
                                                <th className="w-3/8 py-4 px-6 text-left text-gray-600 border font-bold uppercase">Title</th>
                                                <th className="py-4 px-6 text-left text-gray-600 border font-bold uppercase">Reps</th>
                                                <th className="py-4 px-6 text-left text-gray-600 border font-bold uppercase">Loads</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-4 px-6 text-left text-sm border font-medium border-gray-200 overflow-hidden">{responseData._id}</td>
                                                <td className="py-4 px-6 text-left text-sm border border-gray-200 overflow-hidden">{responseData.title}</td>
                                                <td className="py-4 px-6 text-left text-sm border border-gray-200 overflow-hidden">{responseData.reps}</td>
                                                <td className="py-4 px-6 text-left text-sm border border-gray-200 overflow-hidden">{responseData.load}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Deleteone;