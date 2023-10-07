import { useState } from 'react';
import {Link,useParams} from 'react-router-dom';
export default function Navbar(){
    let {id,username}=useParams();
    const [ele,setEle]=useState("login");
    console.log("/user/"+id+"/"+username);
    return (
        <div id="Navbar">
            <div id='logo'style={{gridRow:"1/3"}}>
                MyApp
            </div>
            <div id="sideNav" style={{gridColumn:"2/2",gridRow:"2/2"}}>
                <Link to='/' style={{textDecoration:"none",color:"rgb(79, 225, 241)"}}>Home</Link>
            </div>
            <div id="sideNav" style={{gridColumn:"3/3",gridRow:"2/2"}}>
                <Link to='/About'style={{textDecoration:"none",color:"rgb(79, 225, 241)"}}>About</Link>
            </div>
            <div id="sideNav" style={{gridColumn:"4/4",gridRow:"2/2"}}>
                    <Link to={'/user'}style={{textDecoration:"none",color:"rgb(79, 225, 241)"}}>{ele}</Link>
            </div>
            <div id="sideNav"style={{gridColumn:"5/5",gridRow:"2/2"}}>Contact us</div>
        </div>
    );
}