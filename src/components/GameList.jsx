// src/components/GameList.jsx
import Juego from "./Juego";

export default function GameList({ juegos }) {
  if (!juegos.length) {
    return <p className="text-center text-gray-400">No hay juegos disponibles.</p>;
  }

  return (
    <div className="game-list">
      {juegos.map((juego) => (
        <Juego
          key={juego._id}
          nombre={juego.nombre}
          genero={juego.genero}
          icon="🎮"
        />
      ))}
    </div>
  );
}
