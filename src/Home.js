import useFetch from "./useFetch";
import {useState, useEffect } from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import img1 from "./img1.jpg";
import img2 from './img2.jpg';
import img3 from './img3.jpg';

const Home = () => {
    
    const images = [
       
        img2,
        img3,
        //img1
       
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 
        return () => clearInterval(interval);
      }, []);
    return (  
        <div className="home">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <header>
        <div className="nav-bar">
          <div className="top-left">
            <div className="dumbell">
            <i class="fa-solid fa-dumbbell">Workout Buddy</i>
            </div>
          </div>
          <div className="top-right">
            <div className="nav-links">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
              <Link to="/signin" className="nav-link">
                Signin
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
          
        ))}
      </div>

        </div>
    );
}
 
export default Home;