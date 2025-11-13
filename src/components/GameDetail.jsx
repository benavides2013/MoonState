import { useState, useEffect } from 'react';
import { getResenasPorJuego, createResena } from '../services/api';
import ResenaList from './ResenaList';
import ResenaForm from './ResenaForm';

export default function GameDetail({ juego }) {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    if (juego) {
      getResenasPorJuego(juego._id).then(setResenas);
    }
  }, [juego]);

  const handleResenaSubmit = async (data) => {
    const nuevaResena = await createResena({
      juego: juego._id,
      texto: data.texto,
      puntuacion: data.puntuacion,
      autor: 'Usuario GameTracker'
    });
    setResenas([...resenas, nuevaResena]);
  };

  if (!juego) return <p>Selecciona un juego para ver detalles.</p>;

  return (
    <div className="game-detail">
      <h2>{juego.nombre}</h2>
      <p>Género: {juego.genero}</p>

      <ResenaForm onSubmit={handleResenaSubmit} />
      <ResenaList resenas={resenas} />
    </div>
  );
}
