import Juego from "./Juego";

export default function GameList({ juegos, onDeleteJuego, onEditJuego }) {
  if (!juegos?.length) {
    return <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No hay juegos</p>;
  }

  return (
    <div className="game-list">
      {juegos.map((juego) => (
        <Juego
          key={juego._id}
          juego={juego}
          onDelete={() => onDeleteJuego(juego._id)}
          onEdit={() => onEditJuego(juego)}
        />
      ))}
    </div>
  );
}