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
  const [loadingJuegos, setLoadingJuegos] = useState(true);
  const [loadingResenas, setLoadingResenas] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Cargar juegos y reseñas al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargar juegos
      setLoadingJuegos(true);
      const juegosCargados = await getJuegos();
      setJuegos(juegosCargados || []);
      console.log("✅ Juegos cargados:", juegosCargados?.length || 0);
    } catch (err) {
      console.error("❌ Error al cargar juegos:", err);
      setJuegos([]);
    } finally {
      setLoadingJuegos(false);
    }

    try {
      // Cargar reseñas
      setLoadingResenas(true);
      const resenasCargadas = await getResena();
      setResenas(resenasCargadas || []);
      console.log("✅ Reseñas cargadas:", resenasCargadas?.length || 0);
    } catch (err) {
      console.error("❌ Error al cargar reseñas:", err);
      setResenas([]);
    } finally {
      setLoadingResenas(false);
    }
  };

  // Manejar nueva reseña
  const handleNewResena = async (resena) => {
    try {
      console.log("📤 Enviando nueva reseña:", resena);
      
      const saved = await createResena(resena);
      
      if (saved) {
        console.log("✅ Reseña guardada:", saved);
        // Agregar la nueva reseña al estado
        setResenas((prev) => [...prev, saved]);
      } else {
        console.warn("⚠️ La reseña no fue guardada");
      }
    } catch (err) {
      console.error("❌ Error al crear reseña:", err);
    }
  };

  // Items del carrusel
  const carouselItems = [
    {
      icon: "⚔️",
      title: "Valorant",
      description: "Es un shooter en primera persona ambientado en un futuro cercano. Los jugadores toman el control de personajes que representan diversas culturas y nacionalidades de todo el mundo."
    },
    {
      icon: "🏆",
      title: "Five Night's at Freddy",
      description: "Un juego inolvidable en nuestra infancia. Sobrevive las noches y descubre los misterios de Freddy Fazbear's Pizza."
    },
    {
      icon: "🍭",
      title: "Candy Crush",
      description: "Resuelve puzzles de tres en raya en este adictivo juego de estrategia. ¡Derrota niveles cada vez más difíciles!"
    },
  ];

  return (
    <div className="moonstate-container">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* SECCIÓN HERO - CARRUSEL */}
      <section id="hero">
        <Carousel
          items={carouselItems}
          touchStartX={touchStartX}
          touchEndX={touchEndX}
        />
      </section>

      {/* SECCIÓN JUEGOS */}
      <section id="juegos">
        <h2>🎮 Lista de Juegos</h2>
        {loadingJuegos ? (
          <p className="loading">⏳ Cargando juegos...</p>
        ) : juegos.length > 0 ? (
          <GameList juegos={juegos} />
        ) : (
          <p className="no-data">No hay juegos disponibles en este momento.</p>
        )}
      </section>

      {/* SECCIÓN RESEÑAS */}
      <section id="reseñas">
        <h2>📝 Reseñas de Juegos</h2>

        {/* Formulario para crear reseña */}
        {juegos.length > 0 ? (
          <ResenaForm onSubmit={handleNewResena} juegos={juegos} />
        ) : (
          <p className="info-message">⏳ Esperando juegos para crear reseñas...</p>
        )}

        {/* Lista de reseñas */}
        {loadingResenas ? (
          <p className="loading">⏳ Cargando reseñas...</p>
        ) : resenas.length > 0 ? (
          <ResenaList resenas={resenas} />
        ) : (
          <p className="no-data">No hay reseñas todavía. ¡Sé el primero en dejar una!</p>
        )}
      </section>

      <Footer />
    </div>
  );
}