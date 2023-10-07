import React, { useState } from 'react';
import axios from 'axios';
export default function Home() {
    
    const [data,setData]= React.useState(null);
    const url ="http://localhost:8000/blogs";
    const [count,setCount]=useState(0);
    React.useEffect(()=>{
      axios.get(url)
      .then((res)=>setData(res.data));
    },[count]);
    function handleLikes(blog){
      axios.patch(url+"/"+blog.id,{
        likes:blog.likes+1
      }).then((res)=>console.log(res));
      setCount(count+1);
    }
    
    return (
  
      <div className="Home">
        {data && data.map((d)=>
          <div id="cards" key={d.id}>
            <h1>{d.title}</h1>
            <author>{d.username}   </author>
            <button name='like' onClick={()=>handleLikes(d)}>{d.likes} Likes</button>
            <p>{d.body}</p>
          </div>
        )}
      </div>
    );
  }

  