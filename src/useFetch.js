// useFetch.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetch = (url, options) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          navigate('/login');
          throw Error('Could not fetch the data for that resource');
        }

        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
