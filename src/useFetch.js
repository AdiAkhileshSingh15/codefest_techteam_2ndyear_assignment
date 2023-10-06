import {useState, useEffect } from 'react';
import axios from 'axios';
const useFetch =(url)=>{
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [Error, setError ] = useState(null);
    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url , { signal: abortCont.signal })
            .then(res => {

                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }

                return res.json();
            })

            .then( data => {
                console.log(data);
                setData(data);
                setIsPending(false);
            })

            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                setIsPending(false);
                setError(err.message);
                }
            })
            return ()=> abortCont.abort();
    }, []);
    return { data, isPending, Error}
}
export default useFetch;