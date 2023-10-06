import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Workmenu from "./Workmenu";

const Getall = () => {
    const authToken = Cookies.get("authToken");
    const baseUrl = "https://workoutapi-fjcr.onrender.com/api";
    const [data, setData] = useState([]);

    axios.get(`${baseUrl}/workouts`, {
        headers: {Authorization : `Bearer ${authToken}`}
    })
    .then(response => {
        setData(response.data);
    })
    .catch(error => {
        console.log(error);
    })

    return ( 
        <div className="default-body">
            <div className="max-w-4xl w-full space-y-2 text-center border">
                <Workmenu />
                <hr />
                <div className="container py-3">
                    <h2 className="work-h2">All Workouts:</h2>
                    <div className="my-4 space-y-4">
                        <div className="text-xl text-center font-medium poppins">Fetched Data: </div>
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
                                <tbody className="bg-white">
                                    {
                                        data.map((work, index) => {
                                            return <tr key = {index}>
                                                <td className="py-4 px-6 text-left text-sm border font-medium border-gray-200 overflow-hidden">{work._id}</td>
                                                <td className="py-4 px-6 text-left text-sm border border-gray-200 overflow-hidden">{work.title}</td>
                                                <td className="py-4 px-6 text-left text-sm border border-gray-200 overflow-hidden">{work.reps}</td>
                                                <td className="py-4 px-6 text-left text-sm border border-gray-200 overflow-hidden">{work.load}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default Getall;