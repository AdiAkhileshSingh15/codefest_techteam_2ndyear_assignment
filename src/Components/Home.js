import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE5NjlkNjBlYmZiMjkxZWFmMTBkZGQiLCJpYXQiOjE2OTY2MDQ3NzksImV4cCI6MTY5Njg2Mzk3OX0.Zktc7u3xfYwtpqe1Hg5gi1VpF7DjVPzZ_0S_RLUOkvo"


const DataFetcher = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('https://workoutapi-fjcr.onrender.com/api/workouts',{
            headers: {
                Authorization: `Bearer ${token}`
            },
      });
        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
        } else {
          setError('Failed to fetch data');
          setIsLoading(false);
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  

  return (
    <div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
<div className="container mx-auto p-6">
  <h1 className="text-3xl font-semibold text-gray-800 mb-6">Workout Data</h1>
  <table className="min-w-full bg-white shadow-md border rounded">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-6 py-3 text-left font-bold text-gray-600">Workout Name</th>
        <th className="px-6 py-3 text-left font-bold text-gray-600">Reps</th>
        <th className="px-6 py-3 text-left font-bold text-gray-600">Load</th>
      </tr>
    </thead>
    <tbody>
 {data.map( item =>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item.reps}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item.load}</td>
        <td className="px-6 py-4 whitespace-nowrap"> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete</button></td>
        <td className="px-6 py-4 whitespace-nowrap"> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button></td>
      </tr>
     
)}
    </tbody>
  </table>
</div>
      )}    
    </div>
  );
};

export default DataFetcher;
