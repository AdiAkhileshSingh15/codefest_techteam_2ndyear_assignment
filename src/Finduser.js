import { useMemo, useState,useEffect } from "react";
import axios from "axios";
export default function FindUser({username,password}){
    const [usr,SetUsr]=useState(null);
    const url="http://localhost:8000/user";
    const [userId,setUserId]=useState(null);
    useEffect(()=>{
        axios.get(url)
        .then((res)=>SetUsr(res.data));
    },[username,password]);
    console.log(usr.filter((t)=>([t.username,t.password]==[username,password])));
    return ;
}