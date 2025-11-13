// src/components/Carousel.jsx
import { useState, useRef } from 'react';

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % items.length);

  const goToSlide = (i) => setIndex(i);

  const handleTouchStart = (e) => (touchStartX.current = e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchEndX.current < touchStartX.current - 50) handleNext();
    if (touchEndX.current > touchStartX.current + 50) handlePrev();
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={handlePrev}>◀</button>

      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, i) => (
            <div key={i} className="carousel-item">
              <h3>{item.icon} {item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn next" onClick={handleNext}>▶</button>

      <div className="carousel-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
