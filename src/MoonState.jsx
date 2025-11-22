import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import GameList from "./components/GameList";
import ResenaForm from "./components/ResenaForm";
import ResenaList from "./components/ResenaList";
import FormularioJuego from "./components/FormularioJuego";
import EstadisticasPersonales from "./components/EstadisticasPersonales";
import { getJuegos, getResena, createResena, deleteJuego, updateResena, deleteResena } from "./services/api";
import "./moonstate.css";

export default function MoonState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [showFormJuego, setShowFormJuego] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [loadingJuegos, setLoadingJuegos] = useState(true);
  const [loadingResenas, setLoadingResenas] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
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

  const handleNewResena = async (resena) => {
    try {
      const saved = await createResena(resena);
      if (saved) {
        setResenas((prev) => [...prev, saved]);
      }
    } catch (err) {
      console.error("❌ Error al crear reseña:", err);
    }
  };

  const handleSaveJuego = (juego) => {
    if (juegoEditando) {
      setJuegos(juegos.map(j => j._id === juego._id ? juego : j));
    } else {
      setJuegos([...juegos, juego]);
    }
    setShowFormJuego(false);
    setJuegoEditando(null);
  };

  const handleDeleteJuego = async (id) => {
    if (window.confirm('¿Eliminar juego?')) {
      if (await deleteJuego(id)) {
        setJuegos(juegos.filter(j => j._id !== id));
      }
    }
  };

  const handleUpdateResena = (resena) => {
    setResenas(resenas.map(r => r._id === resena._id ? resena : r));
  };

  const handleDeleteResena = (id) => {
    setResenas(resenas.filter(r => r._id !== id));
  };

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

      <section id="hero">
        <Carousel
          items={carouselItems}
          touchStartX={touchStartX}
          touchEndX={touchEndX}
        />
      </section>

      <section id="juegos">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <h2>🎮 Mi Biblioteca</h2>
          <button onClick={() => { setShowFormJuego(true); setJuegoEditando(null); }} 
            style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1em', fontWeight: 'bold' }}>
            ➕ Agregar Juego
          </button>
        </div>
        {loadingJuegos ? (
          <p className="loading">⏳ Cargando juegos...</p>
        ) : juegos.length > 0 ? (
          <GameList 
            juegos={juegos} 
            onDeleteJuego={handleDeleteJuego}
            onEditJuego={(j) => { setJuegoEditando(j); setShowFormJuego(true); }} 
          />
        ) : (
          <p className="no-data">No hay juegos disponibles.</p>
        )}
      </section>

      <EstadisticasPersonales juegos={juegos} resenas={resenas} />

      <section id="reseñas">
        <h2>📝 Reseñas</h2>
        {juegos.length > 0 ? (
          <ResenaForm onSubmit={handleNewResena} juegos={juegos} />
        ) : (
          <p className="info-message">⏳ Esperando juegos...</p>
        )}
        {loadingResenas ? (
          <p className="loading">⏳ Cargando reseñas...</p>
        ) : resenas.length > 0 ? (
          <ResenaList resenas={resenas} onUpdate={handleUpdateResena} onDelete={handleDeleteResena} />
        ) : (
          <p className="no-data">No hay reseñas todavía.</p>
        )}
      </section>

      {showFormJuego && (
        <FormularioJuego
          juegoId={juegoEditando?._id}
          onSave={handleSaveJuego}
          onCancel={() => { setShowFormJuego(false); setJuegoEditando(null); }}
        />
      )}

      <Footer />
    </div>
  );
}