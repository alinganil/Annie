import React, { useState, useEffect } from 'react';

const PixelTransition = ({ 
  firstContent, 
  secondContent, 
  gridSize = 15, 
  pixelColor = "#FF69B4", 
  animationStepDuration = 0.5, 
  aspectRatio = "75%" 
}) => {
  const [showSecond, setShowSecond] = useState(false);
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    const newPixels = Array.from({ length: gridSize * gridSize }, (_, i) => ({
      id: i,
      x: (i % gridSize) * (100 / gridSize),
      y: Math.floor(i / gridSize) * (100 / gridSize),
      size: 100 / gridSize,
      delay: Math.random() * animationStepDuration
    }));
    setPixels(newPixels);
  }, [gridSize, animationStepDuration]);

  const handleClick = () => {
    setShowSecond(!showSecond);
  };

  return (
    <div 
      className="relative w-full"
      style={{ paddingTop: aspectRatio }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className={`absolute inset-0 transition-opacity duration-500 ${showSecond ? 'opacity-0' : 'opacity-100'}`}>
          {firstContent}
        </div>
        <div className={`absolute inset-0 transition-opacity duration-500 ${showSecond ? 'opacity-100' : 'opacity-0'}`}>
          {secondContent}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {pixels.map(pixel => (
          <div
            key={pixel.id}
            className="absolute transition-opacity duration-500"
            style={{
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              width: `${pixel.size}%`,
              height: `${pixel.size}%`,
              background: pixelColor,
              opacity: showSecond ? 0 : 1,
              transitionDelay: `${pixel.delay}s`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelTransition;
