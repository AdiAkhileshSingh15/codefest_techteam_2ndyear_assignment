import React from 'react'

export default function Home() {
  return (
    <div style={{width:"100vw",height:'93.5vh',backgroundColor:'#7aa8ff',overflowY:'hidden'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h1 style={{fontSize:'5rem',margin:'2vw'}}>Welcome To Our Workout GYM Website!</h1>
      </div>
      <div id="carouselExampleIndicators" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner" style={{width:'80vw',margin:'auto'}}>
    <div className="carousel-item active" style={{width:'100vw'}}>
      <img src="https://source.unsplash.com/1600x600/?gym" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" style={{width:'100vw'}}>
      <img src="https://source.unsplash.com/1600x600/?workout" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" style={{width:'100vw'}}>
      <img src="https://source.unsplash.com/1600x600/?exercise" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
