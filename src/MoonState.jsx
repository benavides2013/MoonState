// src/MoonState.jsx
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import GameList from "./components/GameList";
import ResenaForm from "./components/ResenaForm";
import ResenaList from "./components/ResenaList";
import { getJuegos, getResena, createResena } from "./services/api";
import "./moonstate.css";

export default function MoonState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Cargar juegos y reseñas al iniciar
  useEffect(() => {
    getJuegos().then(setJuegos).catch(console.error);

    // ❗ Cambiado: antes decía getReviews()
    getResena().then(setResenas).catch(console.error);
  }, []);

  // Manejar nueva reseña
  const handleNewResena = async (resena) => {
    const saved = await createResena(resena);
    if (saved) setResenas((prev) => [...prev, saved]);
  };

  const carouselItems = [
    { icon: "⚔️", title: "Valorant", description: "Es un shooter en primera persona ambientado en un futuro cercano. Los jugadores toman el control de personajes que representan diversas culturas y nacionalidades de todo el mundo."},
    { icon: "🏆", title: "Five night's at Freddy", description: "Competencia intensa" },
    { icon: "🍭", title: "Candy Crush", description: "Batalla estratégica" },
  ];

  return (
    <div className="moonstate-container">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section id="hero">
        <Carousel
          items={carouselItems}
          touchStartX={touchStartX}
          touchEndX={touchEndX}
        />
      </section>

      <section id="juegos">
        <h2>🎮 Lista de Juegos</h2>
        <GameList juegos={juegos} />
      </section>

      <section id="reseñas">
        <h2>📝 Reseñas</h2>

        {/* ❗ Aquí también había un error: onSubmit recibía handleNewResenas */}
        <ResenaForm onSubmit={handleNewResena} juegos={juegos} />

        <ResenaList resenas={resenas} />
      </section>

      <Footer />
    </div>
  );
}
