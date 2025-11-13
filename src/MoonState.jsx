// src/MoonState.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import GameList from './components/GameList';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { getJuegos, getReviews, createReview } from './api';

export default function MoonState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [juegos, setJuegos] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Cargar datos del backend
  useEffect(() => {
    getJuegos().then(setJuegos).catch(console.error);
    getReviews().then(setReviews).catch(console.error);
  }, []);

  // Manejar nueva reseña
  const handleNewReview = async (review) => {
    const saved = await createReview(review);
    if (saved) setReviews(prev => [...prev, saved]);
  };

  // Items del carrusel
  const carouselItems = [
    { icon: '🎮', title: 'Juego 1', description: 'Aventura épica en un mundo de fantasía' },
    { icon: '🏆', title: 'Juego 2', description: 'Competencia intensa con gráficos impresionantes' },
    { icon: '⚔️', title: 'Juego 3', description: 'Batalla estratégica donde cada decisión cuenta' },
  ];

  return (
    <div className="moonstate-container">
      {/* HEADER */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* CARRUSEL */}
      <section id="hero">
        <Carousel items={carouselItems} />
      </section>

      {/* JUEGOS */}
      <section id="juegos">
        <h2>🎮 Lista de Juegos</h2>
        <GameList juegos={juegos} />
      </section>

      {/* RESEÑAS */}
      <section id="reseñas">
        <h2>📝 Reseñas</h2>
        <ReviewForm onSubmit={handleNewReview} />
        <ReviewList reviews={reviews} />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
