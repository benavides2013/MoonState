import { useState, useEffect, useRef } from 'react';
import './moonstate.css';


export default function MoonState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [stars, setStars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    gameName: '',
    gameReview: ''
  });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const carouselItems = [
    { icon: '🎮', title: 'Juego 1', description: 'Aventura épica en un mundo de fantasía lleno de misterios y desafíos increíbles' },
    { icon: '🏆', title: 'Juego 2', description: 'Competencia intensa con gráficos impresionantes y jugabilidad adictiva' },
    { icon: '⚔️', title: 'Juego 3', description: 'Batalla estratégica donde cada decisión cuenta para la victoria final' },
    { icon: '🌟', title: 'Juego 4', description: 'Explora universos infinitos con mecánicas innovadoras y únicas' },
    { icon: '🎯', title: 'Juego 5', description: 'Precisión y habilidad en un desafío que pondrá a prueba tus reflejos' }
  ];

  // Generar estrellas
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  // Cerrar menú al hacer clic en links
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Carrusel
  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const goToSlide = (index) => {
    setCarouselIndex(index);
  };

  // Touch gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchEndX.current < touchStartX.current - 50) {
      handleNext();
    }
    if (touchEndX.current > touchStartX.current + 50) {
      handlePrev();
    }
  };

  // Formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (formData.gameName.trim() && formData.gameReview.trim() && selectedRating > 0) {
      const newReview = {
        id: Date.now(),
        gameName: formData.gameName,
        gameReview: formData.gameReview,
        rating: selectedRating,
        date: new Date().toLocaleDateString('es-ES')
      };
      setReviews([...reviews, newReview]);
      setFormData({ gameName: '', gameReview: '' });
      setSelectedRating(0);
      alert('¡Reseña enviada exitosamente!');
    } else {
      alert('Por favor, completa todos los campos y selecciona una puntuación');
    }
  };

  
  return (
    <div className="moonstate-container">
      {/* HEADER */}
      <header>
        <div className="header-container">
          <button 
            className="menu-icon" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className="logo">
            <div className="moon"></div>
            <span>MOONSTATE</span>
          </div>
          
          <nav>
            <a href="#inicio">Inicio</a>
            <a href="#juegos">Juegos</a>
            <a href="#reseñas">Reseñas</a>
            <a href="#estadisticas">Estadísticas</a>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <a href="#inicio" onClick={handleNavClick}>Inicio</a>
        <a href="#juegos" onClick={handleNavClick}>Juegos</a>
        <a href="#reseñas" onClick={handleNavClick}>Reseñas</a>
        <a href="#estadisticas" onClick={handleNavClick}>Estadísticas</a>
      </div>

      <div 
        className={`overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="stars" id="starsContainer">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                left: star.left + '%',
                top: star.top + '%',
                animationDelay: star.delay + 's'
              }}
            ></div>
          ))}
        </div>
      </section>


      {/* CAROUSEL SECTION */}
      <section className="carousel-section">
        <div className="carousel-container">
          <button 
            className="carousel-btn prev" 
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22 28L10 16L22 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="carousel-wrapper">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {carouselItems.map((item) => (
                <div key={item.title} className="carousel-item">
                  <h3>{item.icon} {item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn next" 
            onClick={handleNext}
            aria-label="Siguiente"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10 4L22 16L10 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {carouselItems.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === carouselIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* REVIEW SECTION */}
      <section className="review-section">
        <div className="review-container">
          <h2 className="review-title">Agregar Reseña</h2>
          
          <div className="review-form-wrapper">
            <div className="form-group">
              <input 
                type="text" 
                id="gameName" 
                className="form-input" 
                placeholder="Nombre del Juego"
                value={formData.gameName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <textarea 
                id="gameReview" 
                className="form-textarea" 
                placeholder="Escribe tu reseña aquí..."
                value={formData.gameReview}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="rating-section">
              <div className="emoji-ratings" id="emojiRatings">
                <button 
                  className={`emoji-btn ${selectedRating === 1 ? 'selected' : ''}`}
                  data-rating="1" 
                  title="Muy malo"
                  onClick={() => handleRatingClick(1)}
                >
                  🤮
                </button>
                <button 
                  className={`emoji-btn ${selectedRating === 2 ? 'selected' : ''}`}
                  data-rating="2" 
                  title="Malo"
                  onClick={() => handleRatingClick(2)}
                >
                  😞
                </button>
                <button 
                  className={`emoji-btn ${selectedRating === 3 ? 'selected' : ''}`}
                  data-rating="3" 
                  title="Regular"
                  onClick={() => handleRatingClick(3)}
                >
                  😦
                </button>
                <button 
                  className={`emoji-btn ${selectedRating === 4 ? 'selected' : ''}`}
                  data-rating="4" 
                  title="Bueno"
                  onClick={() => handleRatingClick(4)}
                >
                  😊
                </button>
                <button 
                  className={`emoji-btn ${selectedRating === 5 ? 'selected' : ''}`}
                  data-rating="5" 
                  title="Excelente"
                  onClick={() => handleRatingClick(5)}
                >
                  🤗
                </button>
              </div>
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              ENVIAR RESPUESTA
            </button>
          </div>

          {/* Reviews Display */}
          {reviews.length > 0 && (
            <div className="reviews-list">
              <h3 className="reviews-title">Reseñas Enviadas ({reviews.length})</h3>
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <h4>{review.gameName}</h4>
                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p className="review-text">{review.gameReview}</p>
                  <p className="review-date">{review.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <div className="moon"></div>
            <span>MOONSTATE</span>
          </div>

          <div className="footer-info">
            <p className="footer-author">Sara Valentina Benavides</p>
            <p className="footer-date">Noviembre 2025</p>
          </div>

          <div className="footer-links">
            <a href="#inicio">Inicio</a>
            <a href="#juegos">Juegos</a>
            <a href="#reseñas">Reseñas</a>
            <a href="#estadisticas">Estadísticas</a>
            <a href="#contacto">Contacto</a>
          </div>

          <div className="footer-social">
            <a href="#" className="social-icon" title="Twitter">𝕏</a>
            <a href="#" className="social-icon" title="Instagram">📷</a>
            <a href="#" className="social-icon" title="Discord">💬</a>
            <a href="#" className="social-icon" title="YouTube">▶</a>
          </div>

          <div className="footer-divider"></div>

          <p className="footer-copyright">
            © 2025 MoonState. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
