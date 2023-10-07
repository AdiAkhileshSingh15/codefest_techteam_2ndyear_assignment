import axios from "axios";
import { createRef } from "react";
import { useParams,useHistory } from "react-router-dom";
export default function AddBlogs(){
    const {id , username}=useParams();
    const history=useHistory();
    const title=createRef();
    const body=createRef();
    const url="http://localhost:8000/blogs";
    function handlepost(e){
        e.preventDefault();
        const data={
            username:username,
            title:title.current.value,
            body:body.current.value,
            likes:0
        }
        axios.post(url,data)
        .then((res)=>console.log(res));
        title.current.value='';
        body.current.value='';
        history.push("/user/"+id+"/"+username);
    }
    return (
        <div className="addblogs">
            <h1 style={{fontSize:30,textAlign:"left"}}>username: {username}</h1>
            <form onSubmit={handlepost}>
                <div style={{display:"grid",gridTemplateColumns:"50px 300px"}}>
                    <label form="title">Title</label>
                    <input name="title" type="text" ref={title} /><br/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"50px 800px"}}>
                    <label form ="Body">Body </label>
                    <textarea name="body" ref={body} style={{height:240}}/><br/>
                </div>
                <button type="submit" name="submit">submit</button>
            </form>
        </div>
    )
}