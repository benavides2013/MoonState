import { useState, useEffect } from "react";
import { getResenasPorJuego, createResena } from "../services/api";
import ResenaList from "./ResenaList";
import ResenaForm from "./ResenaForm";

export default function GameDetail({ juego }) {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    const fetchResenas = async () => {
      if (juego?._id) {
        const data = await getResenasPorJuego(juego._id);
        setResenas(data);
      }
    };
    fetchResenas();
  }, [juego]);

  const handleResenaSubmit = async (nueva) => {
    if (!juego?._id) return;

    const nuevaResena = await createResena({
      juego: juego._id,
      texto: nueva.texto,
      puntuacion: nueva.puntuacion,
      autor: "Usuario GameTracker",
    });

    if (nuevaResena) {
      setResenas((prev) => [...prev, nuevaResena]);
    }
  };

  if (!juego) {
    return <p>Selecciona un juego para ver sus detalles y reseñas.</p>;
  }

  return (
    <div>
      <h2>{juego.nombre}</h2>
      <p>Género: {juego.genero}</p>

      <h3>Reseñas</h3>
      <ResenaForm onSubmit={handleResenaSubmit} />
      <ResenaList resenas={resenas} />
    </div>
  );
}
