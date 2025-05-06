import React, { useState } from 'react';

export const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  console.log(process.env.PUBLIC_URL)

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      
      <div className="carousel-slide">
        <img
          src={process.env.PUBLIC_URL +  "/" + items[currentIndex].imagePath}
          alt={items[currentIndex].name}
          className="carousel-image"
        />
      </div>
      
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

