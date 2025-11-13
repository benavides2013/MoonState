export default function Juego({ nombre, genero, icon, onClick }) {
  return (
    <div className="juego-card" onClick={onClick}>
      <h3>{icon} {nombre}</h3>
      <p>Género: {genero}</p>
    </div>
  );
}
