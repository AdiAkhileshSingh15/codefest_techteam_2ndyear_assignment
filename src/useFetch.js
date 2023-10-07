import { useEffect, useState } from "react";
import axios from 'axios';
export default function UseFetch(url){
    const [data,setData]=useState(null)
    useEffect(()=>{
        axios.get(url)
        .then((res)=>setData(res.data));
      },[url]);

      return {data};
}