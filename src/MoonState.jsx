// src/MoonState.jsx
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import GameList from "./components/GameList";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import { getJuegos, getReviews, createReview } from "./api";
import "./moonstate.css";

export default function MoonState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [juegos, setJuegos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 🔹 Cargar juegos y reseñas al iniciar
  useEffect(() => {
    getJuegos().then(setJuegos).catch(console.error);
    getReviews().then(setReviews).catch(console.error);
  }, []);

  // 🔹 Manejar nueva reseña
  const handleNewReview = async (review) => {
    const saved = await createReview(review);
    if (saved) setReviews((prev) => [...prev, saved]);
  };

  // 🔹 Items del carrusel
  const carouselItems = [
    { icon: "🎮", title: "Juego 1", description: "Aventura épica" },
    { icon: "🏆", title: "Juego 2", description: "Competencia intensa" },
    { icon: "⚔️", title: "Juego 3", description: "Batalla estratégica" },
  ];

  return (
    <div className="moonstate-container">
      {/* HEADER */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* CARRUSEL */}
      <section id="hero">
        <Carousel
          items={carouselItems}
          touchStartX={touchStartX}
          touchEndX={touchEndX}
        />
      </section>

      {/* LISTA DE JUEGOS */}
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
