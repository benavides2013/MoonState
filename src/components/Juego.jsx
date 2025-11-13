// src/components/Juego.jsx
export default function Juego({ nombre, genero, icon }) {
  return (
    <div className="juego-item">
      <h3>{icon} {nombre}</h3>
    </div>
  );
}
