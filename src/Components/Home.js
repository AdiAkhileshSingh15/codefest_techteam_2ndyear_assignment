import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIwNGIzZjkzMjQ4NzhhMjVhNjU0MDUiLCJpYXQiOjE2OTY2MTUyMzEsImV4cCI6MTY5Njg3NDQzMX0.uLejwm7CMiXTQE4LmmI2nPZh2imLBrjUDRoxGq_i99o"


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
  

  return (<>
    <div>
      <h2>Data Fetching Page</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
<div className="bg-gray-100 font-sans">
  <h1 className="text-3xl font-semibold text-gray-800 mb-6">Workout Data</h1>
  <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">User Workout Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
            <div class="bg-white rounded-lg shadow-md p-4">
                {data.map( (item) =>
                <div>
                        <h2 className="text-xl font-semibold mb-2">Workout:{item.title}</h2>
                        <p className="text-gray-700">Reps: {item.reps}</p>
                        <p className="text-gray-700">Loads: {item.load} </p>
                    </div>
                )}
             </div>
           
        </div>
    </div>
</div>
      )}    
    </div>
    </>
  );
};

export default DataFetcher;