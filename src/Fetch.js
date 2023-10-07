import { useEffect } from "react";
import { useState } from "react";
const useFetch = (url) => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  const authtoken = localStorage.getItem("authtoken");

  useEffect(()=>{

    const fetchdata = async () => {
        try{
            const response = await fetch(url,{
                headers:{
                    Authorization: `Bearer ${authtoken}`
                }
            });

            if(response.ok){
                const resdata = await response.json();
                setData(resdata);
                console.log(resdata);
                // response.json({resdata});
            }
            else{
                //Handle error
                console.log("error1");
            }
        } catch(error){
            //Handle network or other errors
            console.log("error2");
        }
    };

    if(authtoken){
        fetchdata();
    }
  },[authtoken]);
return {data,loading,error};
}
 
export default useFetch;