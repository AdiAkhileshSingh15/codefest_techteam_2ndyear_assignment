import React, { useState } from "react";
import HomeImg1 from "../images/home_page_image1.jpeg";
import HomeImg2 from "../images/home_page_image2.jpeg";
import HomeImg3 from "../images/home_page_image3.jpeg";
import HomeImg4 from "../images/home_page_image4.jpeg";

export default function Home_page(props) {
  return (
    <>
      <div className="container">
        <h1>Welcome to WorkOut-Buddy</h1>
        <p>Welcome to our app. Here you can monitor your workout.</p>
        <div className="container d-flex justify-content-between main_div">
          <div className="leftDiv">
            <h2>Feel Great Body and Mind.</h2>
            <p>
              Monitor and maintain all your workouts with no complications
              sothat you can focus more on your workout not on your diary.
            </p>
          </div>
          
            <div className="d-flex justify-content-around rightDiv">
              <div className="col-lg-4 col-md-12 mb-4 mb-lg mainImg">
                <img
                  src={HomeImg1}
                  className="w-100 shadow-1-strong rounded mb-4 mainImg"
                  alt="Boat on Calm Water"
                />

                <img
                  src={HomeImg2}
                  className="w-100 shadow-1-strong rounded mb-4 mainImg"
                  alt="Wintry Mountain Landscape"
                />
              </div>

              <div className="col-lg-4 mb-4 mb-lg-0 mainImg">
                <img
                  src={HomeImg3}
                  className="w-100 shadow-1-strong rounded mb-4 mainImg"
                  alt="Mountains in the Clouds"
                />

                <img
                  src={HomeImg4}
                  className="w-100 shadow-1-strong rounded mb-4 mainImg"
                  alt="Boat on Calm Water"
                />
              </div>
            </div>
            
        </div>
      </div>
    </>
  );
}
