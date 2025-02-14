import { useRef, useEffect, useState } from 'react';
import './PixelTransition.css';

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  className = '',
  style = {},
  aspectRatio = '100%',
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const handleClick = () => {
    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    setIsActive(!isActive);
    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    
    pixels.forEach((pixel, i) => {
      setTimeout(() => {
        pixel.style.display = isActive ? 'none' : 'block';
      }, i * (animationStepDuration * 1000 / pixels.length));
    });

    setTimeout(() => {
      activeEl.style.display = !isActive ? 'block' : 'none';
    }, animationStepDuration * 1000);
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onClick={handleClick}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default">
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;
