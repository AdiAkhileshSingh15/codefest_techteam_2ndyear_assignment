import { useEffect, useState } from "react";
import { Link, useParams,useHistory } from "react-router-dom";
import axios from "axios";
export default function UserDetails(){
    const { id ,username}=useParams();
    const history=useHistory();
    const url2="http://localhost:8000/blogs";
    const [blogs,setBlogs]=useState([]);
    const [count,setCount]=useState();
    useEffect(()=>{
        axios.get(url2)
        .then((res)=>setBlogs(res.data.filter((t)=>t.username===username)));
        
    },[count]
    );
    console.log(id,username);
    function handleDelete(blogid){
        axios.delete(url2+"/"+blogid)
        .then((res)=>setCount(count+1));
    }

    return(
        <>
            <div id="upperuserdata">
                <div><h1 >Hello, {username}</h1></div>
                <div className="addblgbttn"><Link to={"/user/addblogs/"+id+"/"+username} className="addblgbttn1" style={{textDecoration:"none",color:"white",fontSize:18}}>Add blog</Link></div>
            </div>
            <div className="Userdata">
            
            {blogs && blogs.map((d)=>
                <div id="cards" key={d.id}>
                    <div>
                        <h1>{d.title}</h1>
                        <button name="like" disabled>{d.likes} likes</button>
                        <p>{d.body}</p>
                    </div>
                    <div><button onClick={()=>handleDelete(d.id)}>Delete blog</button></div>
                </div>
            )}
            
        </div>
        {Object.keys(blogs).length == 0 && <h2>No blogs added by you</h2>}
        </>
        
    );
}